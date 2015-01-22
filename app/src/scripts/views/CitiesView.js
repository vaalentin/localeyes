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

  els: {
    '$content': '.cities__content'
  },

  didInitialize (options) {
    _.extend(this, _.pick(options, 'activeCity'));
    
    this.map = new MapModel({ collection: this.collection });

    this.menu = new MenuView();
    this.frame = new FrameView({ model: new FrameModel() });
    this.cities = this.collection.map(city => {
      return new CityView({ model: city, position: this.map.getPosition(city.get('slug')) });
    });

    this.listenTo(this.frame, 'mouseover', this.onFrameOver);
    this.listenTo(this.frame, 'mouseout', this.onFrameOut);
    jQuery(document).on('keydown', this.onKeydown.bind(this));

    this.isSliding = false;
    this.isOpen = false;

    // touch screen
    this.hammer = new Hammer.Manager(this.$el[0], { dragLockToAxis: true });
    this.hammer.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL }));

    this.hammer.on('panleft panright', this.onPanHorizontal.bind(this));
    this.hammer.on('panup pandown', this.onPanVertical.bind(this));
    this.hammer.on('panend', this.onPanend.bind(this));
    jQuery(window).on('resisze', this.onResize.bind(this));

    this.dragFactorA;
    this.dragFactorB;
    this.translateX;
    this.translateY;
    this.width;
    this.height;
    this.panY = false;
    this.panX = false;
  },

  willRemove () {
    this.cities.forEach(city => city.remove());
    jQuery(document).off('keydown', this.onKeydown);
    jQuery(window).off('resize', this.onResize);
    this.hammer.destroy();
  },
  onPanHorizontal (e) {
    if (this.panY) return false;
    this.panX = true;

    if (!this.dragFactorA || !this.dragFactorB) {
      var directions = this.map.getDirections(this.activeCity);
      this.dragFactorA = directions.west ? 1 : 0.2;
      this.dragFactorB = directions.east ? 1 : 0.2;
    }

    if (!this.width || !this.height) this.onResize();

    var factor = e.direction === 2 ? this.dragFactorB : this.dragFactorA;
    var dragDistance = ((100 / this.width) * e.deltaX) * factor;
    var dragged = this.translateX + dragDistance;

    this.els.$content.velocity({ translateX: dragged + '%' }, 0);
  },

  onPanVertical (e) {
    if (this.panX) return false;
    this.panY = true;

    if (!this.dragFactorA || !this.dragFactorB) {
      var directions = this.map.getDirections(this.activeCity);
      this.dragFactorA = directions.north ? 1 : 0.2;
      this.dragFactorB = directions.south ? 1 : 0.2;
    }

    if (!this.width || !this.height) this.onResize();

    var factor = e.direction === 8 ? this.dragFactorB : this.dragFactorA;
    var dragDistance = ((100 / this.height) * e.deltaY) * factor;
    var dragged = this.translateY + dragDistance;

    this.els.$content.velocity({ translateY: dragged + '%' }, 0);
  },

  onPanend (e) {
    var dragDistance = this.panX
      ? (100 / this.width) * e.deltaX
      : (100 / this.height) * e.deltaY;

    if (Math.abs(dragDistance) < 40) {
      return this.setPosition();
    }

    var directions = this.map.getDirections(this.activeCity);

    if (this.panX) {
      if (dragDistance < 0) {
        this.changeCity(directions.east);
      } else {
        this.changeCity(directions.west);
      }
    } else {
      if (dragDistance < 0) {
        this.changeCity(directions.south);
      } else {
        this.changeCity(directions.north);
      }
    }

    this.setPosition();

    this.panX = false;
    this.panY = false;
    this.dragFactorA = this.dragFactorB = null;
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
      this.els.$content.velocity('stop').velocity(props, { duration: 400 });
    }
  },

  onFrameOut () {
    if (this.isSliding || !this.isOpen) return false;

    var position = this.map.getPosition(this.activeCity);

    var props = {
      translateX: `${-1 * (position.left * 100)}%`,
      translateY: `${-1 * (position.top * 100)}%`
    };

    this.els.$content.velocity('stop').velocity(props, { duration: 400 });
  },

  onKeydown (e) {
    if (this.isSliding) return;

    var directions = this.map.getDirections(this.activeCity);

    var charcode = e.charcode ? e.charcode : e.keyCode;

    switch (charcode) {
      case 38:
        this.changeCity(directions.north);
        break;
      case 39:
        this.changeCity(directions.east);
        break;
      case 40:
        this.changeCity(directions.south);
        break;
      case 37:
        this.changeCity(directions.west);
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
    if (!slug || slug === this.activeCity) return false;

    var model = this.collection.findWhere({ slug: slug });
    var view = _.findWhere(this.cities, { model: model });
    if (view) view.in();

    var previousView;

    if (this.activeCity) {
      var previousModel = this.collection.findWhere({ slug: this.activeCity });
      previousView = _.findWhere(this.cities, { model: previousModel });
    }

    this.activeCity = slug;
    this.setPosition(true, () => { if (previousView) previousView.out() });
    this.setDirections();
  },

  setPosition (transition=true, callback) {
    if (this.isSliding) return false;

    var position = this.map.getPosition(this.activeCity);

    if (!position) return false;

    var previousTranslateX = this.translateX;
    var previousTranslateY = this.translateY;

    this.translateX = -1 * (position.left * 100);
    this.translateY = -1 * (position.top * 100);

    var props = {
      translateX: this.translateX + '%',
      translateY: this.translateY + '%'
    };

    this.isSliding = true;

    this.els.$content.velocity('stop')
      .velocity(props, {
        duration: transition ? 800 : 0,
        easing: 'ease-out',
        complete: () => {
          this.isSliding = false;
          if (callback) callback();
          Backbone.trigger('router:navigate', `/city/${this.activeCity}`);
        }
      });
  },

  setDirections () {
    var directions = this.map.getDirections(this.activeCity);
    this.frame.model.set(directions);
  },

  didRender () {
    this.append(this.cities, '.cities__content');
    this.assign(this.menu, '.cities__menu');
    this.assign(this.frame, '.cities__frame');

    this.setCity();
    this.menu.in();
    this.frame.in();
  }
});