/* jshint curly: false */
/* jshint laxbreak: true */

'use strict';

import jQuery from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Hammer from 'hammer';

import Features from '../modules/Features';
import Store from '../modules/StoreModule';

import MapModel from '../models/MapModel';
import FrameModel from '../models/FrameModel';

import CityView from './CityView';
import MenuView from './MenuView';
import FrameView from './FrameView';
import InfosView from './InfosView';
import MapView from './MapView';
import LocalsView from './LocalsView';

export default Backbone.ContentView.extend({
  name: 'cities',
  className: 'cities',
  content: '.cities__overlay',

  template: `
    <div class="cities__overlay"></div>
    <div class="cities__frame"></div>
    <div class="cities__menu"></div>
    <div class="cities__content"></div>
  `,

  els: {
    '$content': '.cities__content'
  },

  didInitialize (options) {
    _.extend(this, _.pick(options, 'activeCity', 'language'));
    
    this.map = new MapModel({ collection: this.collection });

    this.menu = new MenuView();
    this.frame = new FrameView({
      model: new FrameModel(),
      language: this.language
    });
    this.cities = this.collection.map(city => {
      return new CityView({
        model: city,
        position: this.map.getPosition(city.get('slug')),
        language: this.language
      });
    });

    this.listenTo(this.menu, 'click', this.onMenuClick);
    this.listenTo(this.frame, 'mouseover', this.onFrameOver);
    this.listenTo(this.frame, 'mouseout', this.onFrameOut);
    jQuery(document).on('keydown', this.onKeydown.bind(this));
    jQuery(window).on('resisze', this.onResize.bind(this));

    this.isSliding = false;
    this.isOpen = false;

    // touch screen
    if (Features.mobile) {
      this.hammer = new Hammer.Manager(this.$el[0], { dragLockToAxis: true });
      this.hammer.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL }));

      this.dragFactorA = null;
      this.dragFactorB = null;
      this.translateX = null;
      this.translateY = null;
      this.width = null;
      this.height = null;
      this.panY = false;
      this.panX = false;

      this.enableTouch();
    }
  },

  willRemove () {
    this.cities.forEach(city => city.remove());
    jQuery(document).off('keydown', this.onKeydown);
    jQuery(window).off('resize', this.onResize);
    if (this.hammer) this.hammer.destroy();
  },

  /**
   * Enable all touch related events
   *
   * @method enableTouch
   */
  enableTouch () {
    this.hammer.on('panleft panright', this.onPanHorizontal.bind(this));
    this.hammer.on('panup pandown', this.onPanVertical.bind(this));
    this.hammer.on('panend', this.onPanend.bind(this));
  },

  /**
   * Disable all touch related events
   *
   * @method disableTouch
   */
  disableTouch () {
    this.hammer.off('panleft panright', this.onPanHorizontal);
    this.hammer.off('panup pandown', this.onPanVertical);
    this.hammer.off('panend', this.onPanend);
  },

  onMenuClick (name) {
    var view;

    if (name === 'infos') {
      view = new InfosView();
    }
    else if (name === 'map') {
      view = new MapView({ collection: Store.getCities(), activeCity: this.activeCity });
      this.listenTo(view, 'marker:click', this.changeCity);
    }
    else if (name === 'locals') {
      view = new LocalsView({ collection: Store.getCities() });
    }

    if (!view) return false;

    this.disable();
    this.changeContent(view);
    this.listenTo(view, 'close', () => {
      this.enable();
      this.removeContent();
    });
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
      this.dragFactorA = this.dragFactorB = null;
      this.panX = this.panY = false;
      return this.setPosition({ easing: 'ease-out' });
    }

    var directions = this.map.getDirections(this.activeCity);

    if (this.panX) {
      if (dragDistance < 0) {
        this.changeCity(directions.east, 'ease-out');
      } else {
        this.changeCity(directions.west, 'ease-out');
      }
    } else {
      if (dragDistance < 0) {
        this.changeCity(directions.south, 'ease-out');
      } else {
        this.changeCity(directions.north, 'ease-out');
      }
    }

    this.setPosition({ easing: 'ease-out' });

    this.dragFactorA = this.dragFactorB = null;
    this.panX = this.panY = false;
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

  disable () {
    this.els.$content.velocity({ opacity: 0.5 }, 1000);
    if (this.hammer) this.disableTouch();
    // this.frame.disable();
  },

  enable () {
    this.els.$content.velocity({ opacity: 1 }, 1000);
    if (this.hammer) this.enableTouch();
    // this.frame.enable();
  },

  setCity () {
    var model = this.collection.findWhere({ slug: this.activeCity });
    var view = _.findWhere(this.cities, { model: model });
    if (view) view.in();

    this.setPosition({ transition: false });
    this.setDirections();
  },

  changeCity (slug, easing='ease-in-out') {
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
    this.setPosition({
      transition: true,
      complete: () => { if (previousView) previousView.reset(); },
      easing: easing
    });
    this.setDirections();
  },

  /**
   * @param {Object} [otpions]
   * @param {Boolean} [options.transition=true]
   * @param {Number} [options.duration=800]
   * @param {Function} [options.easing='ease-in-out']
   * @param {Function} [options.complete]
   */
  setPosition (options) {
    if (this.isSliding) return false;

    var params = _.extend({
      transition: true,
      duration: 800,
      easing: 'ease-in-out'
    }, options);

    var position = this.map.getPosition(this.activeCity);

    if (!position) return false;

    this.translateX = -1 * (position.left * 100);
    this.translateY = -1 * (position.top * 100);

    var props = {
      translateX: this.translateX + '%',
      translateY: this.translateY + '%'
    };

    this.isSliding = true;

    this.els.$content.velocity('stop')
      .velocity(props, {
        duration: params.transition ? params.duration : 0,
        easing: params.easing,
        complete: () => {
          this.isSliding = false;
          if (params.complete) params.complete();

          var url = this.language
            ? `/city/${this.activeCity}/${this.language}`
            : `/city/${this.activeCity}`;

          this.trigger('router:navigate', url);
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
  },

  out (done) {
    var previousModel = this.collection.findWhere({ slug: this.activeCity });
    var previousView = _.findWhere(this.cities, { model: previousModel });

    return new Promise((resolve, reject) => {
      if (previousView) previousView.out();
      this.frame.out();

      setTimeout(done, 600);
      
      this.$el
        .velocity('stop')
        .velocity({ opacity: 0 }, { duration: 1500, complete: resolve });
    });
  }
});