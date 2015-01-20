'use strict';

import _ from 'underscore';
import Backbone from 'backbone';
import Hammer from 'hammer';

import MapModel from '../models/MapModel';
import FrameModel from '../models/FrameModel';

import CityView from './CityView';
import MenuView from './MenuView';
import FrameView from './FrameView';

export default Backbone.ContentView.extend({
  name: 'cities',
  
  className: 'cities',

  content: '.cities__overlay',

  template: `
    <div class="cities__outerOverlay">
      <div class="cities__overlay"></div>
    </div>
    <div class="cities__frame"></div>
    <div class="cities__menu"></div>
    <div class="cities__content"></div>
  `,

  onInitialize (options) {
    _.extend(this, _.pick(options, 'activeCity'));
    
    this.map = new MapModel({ collection: this.collection });

    this.menu = new MenuView();
    this.frame = new FrameView({ model: new FrameModel() });
    this.cities = this.collection.map(city => {
      return new CityView({ model: city, position: this.map.getPosition(city.get('slug')) });
    });

    this.listenTo(this.frame, 'frame:over', this.onFrameOver);
    this.listenTo(this.frame, 'frame:out', this.onFrameOut);
    jQuery(document).on('keydown', this.onKeydown.bind(this));

    this.isSliding = false;
    this.isOpen = false;

    // touch screen
    this.hammer = new Hammer.Manager(this.$el[0], {
      dragLockToAxis: true,
      preventDefault: true
    });
    this.hammer.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL }));

    this.hammer.on('panleft panright', this.onPanHorizontal.bind(this));
    this.hammer.on('panup pandown', this.onPanVertical.bind(this));
    this.hammer.on('panend', this.onPanend.bind(this));
    jQuery(window).on('resisze', this.onResize.bind(this));

    this.translateX;
    this.translateY;
    this.width;
    this.height;
    this.panX;
    this.panY;
  },

  onPanHorizontal (e) {
    if (this.isSliding) return false;
    if (this.panY) return false;
    if (!this.width || !this.height) this.onResize();

    this.panX = true;

    var dragDistance = (100 / this.width) * e.deltaX;

    if (e.direction === 2) {
      if (!this.frame.model.get('east')) dragDistance *= 0.2;
    } else if (e.direction === 4) {
      if (!this.frame.model.get('west')) dragDistance *= 0.2;
    }

    var dragged = this.translateX + dragDistance;
    this.$('.cities__content').velocity({ translateX: dragged + '%' }, 0);
  },

  onPanVertical (e) {
    if (this.isSliding) return false;
    if (this.panX) return false;
    if (!this.width || !this.height) this.onResize();

    this.panY = true;

    var dragDistance = (100 / this.height) * e.deltaY;

    if (e.direction === 8) {
      if (!this.frame.model.get('south')) dragDistance *= 0.2;
    } else if (e.direction === 16) {
      if (!this.frame.model.get('north')) dragDistance *= 0.2;
    }

    var dragged = this.translateY + dragDistance;
    this.$('.cities__content').velocity({ translateY: dragged + '%' }, 0);
  },

  onPanend (e) {
    this.panX = false;
    this.panY = false;

    switch (e.direction) {
      case 2:
        var dragDistance = (100 / this.width) * e.deltaX;
        if (Math.abs(dragDistance) > 40 && this.frame.model.get('east')) this.frame.click('right');
        else this.setPosition();
        break;

      case 4:
        var dragDistance = (100 / this.width) * e.deltaX;
        if (Math.abs(dragDistance) > 40 && this.frame.model.get('west')) this.frame.click('left');
        else this.setPosition();
        break;

      case 8:
        var dragDistance = (100 / this.height) * e.deltaY;
        if (Math.abs(dragDistance) > 40 && this.frame.model.get('south')) this.frame.click('bottom');
        else this.setPosition();
        break;

      case 16:
        var dragDistance = (100 / this.height) * e.deltaY;
        if (Math.abs(dragDistance) > 40 && this.frame.model.get('north')) this.frame.click('top');
        else this.setPosition();
        break;
    }
  },

  onSwipe (e) {
    console.log('swipe');
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
        this.frame.click('top');
        break;
      case 39:
        this.frame.click('right');
        break;
      case 40:
        this.frame.click('bottom');
        break;
      case 37:
        this.frame.click('left');
        break;
    }
  },

  onResize (e) {
    this.width = this.$el.width();
    this.height = this.$el.height();
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

    this.translateX = -1 * (position.left * 100);
    this.translateY = -1 * (position.top * 100);

    var props = {
      translateX: this.translateX + '%',
      translateY: this.translateY + '%'
    };

    this.isSliding = true;

    return new Promise((resolve, reject) => {
       this.$('.cities__content').velocity('stop')
        .velocity(props, {
          duration: transition ? 800 : 0,
          complete: () => { this.isSliding = false; resolve(); }
        });
    });
  },

  setDirections () {
    var directions = this.map.getDirections(this.activeCity);
    this.frame.model.set(directions);
  },

  render () {
    this.$el.html(this.template());
    this.append(this.cities, '.cities__content');
    this.assign(this.menu, '.cities__menu');
    this.assign(this.frame, '.cities__frame');
    this.setCity();
    return this;
  }
});