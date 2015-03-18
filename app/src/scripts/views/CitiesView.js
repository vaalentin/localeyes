'use strict';

import jQuery from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

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

  // lifecycles methods
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
  },

  willRemove () {
    this.cities.forEach(city => city.remove());
    jQuery(document).off('keydown', this.onKeydown);
    jQuery(window).off('resize', this.onResize);
  },

  didRender () {
    this.append(this.cities, '.cities__content');
    this.assign(this.menu, '.cities__menu');
    this.assign(this.frame, '.cities__frame');

    this.setCity();
    this.menu.in();
    this.frame.in();
  },

  onMenuClick (name) {
    let view;

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
    this.menu.setActive(name);
    this.listenTo(view, 'close', () => {
      this.enable();
      this.removeContent();
      this.menu.removeActive();
    });
  },

  onFrameOver (direction) {
    if (this.isSliding) return false;

    const position = this.map.getPosition(this.activeCity);
    const directions = this.map.getDirections(this.activeCity);

    let props;

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

    const position = this.map.getPosition(this.activeCity);

    const props = {
      translateX: `${-1 * (position.left * 100)}%`,
      translateY: `${-1 * (position.top * 100)}%`
    };

    this.els.$content.velocity('stop').velocity(props, { duration: 400 });
  },

  onKeydown (e) {
    if (this.isSliding) return;

    const directions = this.map.getDirections(this.activeCity);

    const charcode = e.charcode ? e.charcode : e.keyCode;

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
    // this.els.$content.velocity({ opacity: 0.5 }, 1000);
    // this.frame.disable();
  },

  enable () {
    // this.els.$content.velocity({ opacity: 1 }, 1000);
    // this.frame.enable();
  },

  setCity () {
    const model = this.collection.findWhere({ slug: this.activeCity });
    const view = _.findWhere(this.cities, { model: model });
    if (view) view.in();

    this.setPosition({ transition: false });
    this.setDirections();
  },

  changeCity (slug, easing='ease-in-out') {
    if (!slug || slug === this.activeCity) return false;

    const model = this.collection.findWhere({ slug: slug });
    const view = _.findWhere(this.cities, { model: model });
    if (view) view.in();

    let previousView;

    if (this.activeCity) {
      let previousModel = this.collection.findWhere({ slug: this.activeCity });
      previousView = _.findWhere(this.cities, { model: previousModel });
    }

    this.activeCity = slug;
    this.setPosition({
      transition: true,
      complete: () => {
        if (previousView) previousView.reset();
      },
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

    const params = _.extend({
      transition: true,
      duration: 800,
      easing: 'ease-in-out'
    }, options);

    const position = this.map.getPosition(this.activeCity);
    const target = {
      left: -1 * (position.left * 100),
      top: -1 * (position.top * 100)
    }

    this.translateX = target.left;
    this.translateY = target.top;

    const props = {
      translateX: `${target.left}%`,
      translateY: `${target.top}%`
    };

    this.isSliding = true;

    this.els.$content.velocity('stop')
      .velocity(props, {
        duration: params.transition ? params.duration : 0,
        easing: params.easing,
        complete: () => {
          this.isSliding = false;
          if (params.complete) params.complete();

          const url = this.language
            ? `/city/${this.activeCity}/${this.language}`
            : `/city/${this.activeCity}`;

          this.trigger('router:navigate', url);
        }
      });
  },

  setDirections () {
    const directions = this.map.getDirections(this.activeCity);
    
    // load images

    // active city
    const model = this.collection.findWhere({ slug: this.activeCity });
    const city = _.findWhere(this.cities, { model: model });
    if (city) {
      city.load();
    }

    // sourounding cities
    for (let direction in directions) {
      if (directions.hasOwnProperty(direction)) {
        const model = this.collection.findWhere({ slug: directions[direction] });
        const city = _.findWhere(this.cities, { model: model });
        if (city) {
          city.load();
        }
      }
    }

    this.frame.model.set(directions);
  },

  // animations
  out (done) {
    const previousModel = this.collection.findWhere({ slug: this.activeCity });
    const previousView = _.findWhere(this.cities, { model: previousModel });

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
