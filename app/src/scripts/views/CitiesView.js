'use strict';

import _ from 'underscore';
import Backbone from 'backbone';
import Hammer from 'hammer';

import MapModel from '../models/MapModel';
import CityView from './CityView';

import EventBus from '../modules/EventBusModule';

export default Backbone.PageView.extend({
  name: 'cities',
  
  className: 'cities',

  template: `
    <div class="cities__content"></div>
  `,

  onInitialize (options) {
    _.extend(this, _.pick(options, 'activeCity'));
    this.map = new MapModel({ collection: this.collection });
    this.cities = this.collection.map(city => {
      return new CityView({
        model: city,
        position: this.map.getPosition(city.get('slug'))
      });
    });

    this.listenTo(EventBus, 'frame:over', this.onFrameOver);
    this.listenTo(EventBus, 'frame:out', this.onFrameOut);
    jQuery(document).on('keydown', this.onKeydown.bind(this));

    this.isSliding = false;
    this.isOpen = false;

    this.hammer = new Hammer.Manager(this.$el[0], {
      prevent_default: true
    });
    this.hammer.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_ALL }));
    this.hammer.on('swipe', this.onSwipe);
  },

  onRemove () {
    this.cities.forEach(city => city.remove());
    jQuery(document).off('keydown', this.onKeydown);
    this.hammer.destroy();
  },

  onFrameOver (direction) {
    if (this.isSliding) return false;

    var position = this.map.getPosition(this.activeCity);
    var directions = this.map.getDirections(this.activeCity);

    var props;

    if (direction === 'north' && directions.north) {
      props = { translateY: (-1 * (position.top * 100)) + 10 + '%' };
    } else if (direction === 'east' && directions.east) {
      props = { translateX: (-1 * (position.left * 100)) - 10 + '%' };
    } else if (direction === 'south' && directions.south) {
      props = { translateY: (-1 * (position.top * 100)) - 10 + '%' };
    } else if (direction === 'west' && directions.west) {
      props = { translateX: (-1 * (position.left * 100)) + 10 + '%' };
    }

    if (props) {
      this.isOpen = true;
      this.$('.cities__content').velocity('stop').velocity(props, { duration: 400 });
    }
  },

  onFrameOut () {
    if (this.isSliding || !this.isOpen) return false;

    var position = this.map.getPosition(this.activeCity);

    var props = {
      translateX: `${-1 * (position.left * 100)}%`,
      translateY: `${-1 * (position.top * 100)}%`
    };

    this.$('.cities__content').velocity('stop').velocity(props, { duration: 400 });
  },

  onKeydown (e) {
    if (this.isSliding) return;

    var charcode = e.charcode ? e.charcode : e.keyCode;

    switch (charcode) {
      case 38:
        EventBus.trigger('frame:click', 'top');
        break;
      case 39:
        EventBus.trigger('frame:click', 'right');
        break;
      case 40:
        EventBus.trigger('frame:click', 'bottom');
        break;
      case 37:
        EventBus.trigger('frame:click', 'left');
        break;
    }
  },

  onSwipe (e) {
    if (this.isSliding) return;
    
    switch (e.direction) {
      case 8:
        EventBus.trigger('frame:click', 'bottom');
        break;
      case 4:
        EventBus.trigger('frame:click', 'left');
        break;
      case 16:
        EventBus.trigger('frame:click', 'top');
        break;
      case 2:
        EventBus.trigger('frame:click', 'right');
        break;
    }
  },

  setCity () {
    var model = this.collection.findWhere({ slug: this.activeCity });
    var view = _.findWhere(this.cities, { model: model });
    if (view) view.in();

    this.setPosition(false);
    this.setDirections();
  },

  changeCity (slug) {
    if (slug === this.activeCity) return false;

    var model = this.collection.findWhere({ slug: slug });
    var view = _.findWhere(this.cities, { model: model });
    if (view) view.in();

    var previousView;

    if (this.activeCity) {
      var previousModel = this.collection.findWhere({ slug: this.activeCity });
      previousView = _.findWhere(this.cities, { model: previousModel });
    }

    this.activeCity = slug;
    this.setPosition().then(() => {
      if (previousView) previousView.out();
    });
    this.setDirections();
  },

  setPosition (transition=true) {
    var position = this.map.getPosition(this.activeCity);

    if (!position) return false;

    var props = {
      translateY: -1 * (position.top * 100) + '%',
      translateX: -1 * (position.left * 100) + '%'
    };

    var $content = this.$('.cities__content');

    this.isSliding = true;

    return new Promise((resolve, reject) => {
      $content.velocity('stop')
        .velocity(props, {
          duration: transition ? 800 : 0,
          complete: () => {
            this.isSliding = false;
            resolve();
          }
        });
    });
  },

  setDirections () {
    var directions = this.map.getDirections(this.activeCity);
    EventBus.trigger('frame:update', directions);
  },

  render () {
    this.$el.html(this.template());
    this.append(this.cities, '.cities__content');
    this.setCity();
    return this;
  }
});