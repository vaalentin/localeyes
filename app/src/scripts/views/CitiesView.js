'use strict';

import jQuery from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Store from '../modules/StoreModule';
import Dragger from '../modules/Dragger';

import MapModel from '../models/MapModel';
import FrameModel from '../models/FrameModel';

import CityView from './CityView';
import MenuView from './MenuView';
import FrameView from './FrameView';
import MapView from './MapView';
import InfosView from './InfosView';
import MapView from './MapView';
import LocalsView from './LocalsView';

export default Backbone.ContentView.extend({
  name: 'cities',
  className: 'cities',
  content: '.cities__overlay',

  template: `
    <div class='cities__overlay'></div>
    <div class='cities__frame'></div>
    <div class='cities__menu'></div>
    <div class='cities__content'></div>
  `,

  // subviews
  frame: null,
  map: null,
  cities: null,
  menu: null,

  // state
  previousCity: null,
  currentCity: null,
  isSliding: false,
  isOpen: false,

  // animation
  easing: 'easeInOut',
  duration: 800,

  // drag
  dragger: null,

  els: {
    '$content': '.cities__content'
  },

  // lifecycle
  didInitialize (opts) {
    _.extend(this, _.pick(opts, 'currentCity', 'language'));

    this.frame = new FrameView({ model: new FrameModel(), language: this.language });
    this.map = new MapModel({ collection: this.collection });
    this.menu = new MenuView();
    this.cities = this.collection.map(city => {
      return new CityView({
        model: city,
        position: this.map.getPosition(city.get('slug')),
        language: this.language
      });
    });

    this.listenTo(this.menu, 'click', this.onMenuClick);
  },

  didRender () {
    this.append(this.cities, '.cities__content');
    this.assign(this.menu, '.cities__menu');
    this.assign(this.frame, '.cities__frame');

    this.initDrag();
    this.initKeys();
    this.initFrameOver();
    this.initMenuClick();

    this.duration = 0;
    this.setPosition(true);
    this.setDirections();

    this.width = this.els.$content.width();
    this.height = this.els.$content.height();

    jQuery(window).on('resize.cities', () => {
      this.width = this.els.$content.width();
      this.height = this.els.$content.height();      
    });

    this.menu.in();
    this.in();
  },

  willRemove () {
    jQuery(window).off('.cities');
    this.cities.forEach(city => city.remove());
  },

  // setup
  initDrag () {
    this.dragger = new Dragger(this.els.$content, {
      lockToAxis: true,
      lockToAxisThreshold: 2
    });

    let triggerFlag; // true when more than 50% in a direction
    let startOffset;

    this.dragger.on('start', position => {
      this.els.$content.addClass('is-dragging');
      triggerFlag = false;

      var x = (parseInt(jQuery.Velocity.hook(this.els.$content, 'translateX')) * this.width) / 100;
      var y = (parseInt(jQuery.Velocity.hook(this.els.$content, 'translateY')) * this.height) / 100;

      startOffset = { x, y };
    });

    this.dragger.on('move', delta => {
      if (triggerFlag) {
        return false;
      }

      jQuery.Velocity.hook(this.els.$content, "translateX", `${startOffset.x + delta.x}px`);
      jQuery.Velocity.hook(this.els.$content, "translateY", `${startOffset.y + delta.y}px`);

      const percent = this.dragger.way === 'horizontal'
        ? (delta.x * 100) / this.width
        : (delta.y * 100) / this.height;

      let direction;

      if (percent < -50) {
        this.dragger.onEnd();
        if (this.dragger.way === 'horizontal') {
          direction = 'east';
        } else {
          direction = 'south';
        }
      }
      else if (percent > 50) {
        this.dragger.onEnd();
        if (this.dragger.way === 'horizontal') {
          direction = 'west';
        } else {
          direction = 'north';
        }
      }

      if (direction) {
        triggerFlag = true;
        this.easing = 'easeOut';
        this.goTo(direction);
      }

      return false;
    });

    this.dragger.on('end', position => {
      if (triggerFlag) {
        return false;
      }

      this.els.$content.removeClass('is-dragging');

      const toPosition = this.map.getPosition(this.currentCity);

      this.els.$content.velocity('stop').velocity({
        translateX: `${-(toPosition.left * 100)}%`,
        translateY: `${-(toPosition.top * 100)}%`
      }, {
        duration: 300,
        easing: 'easeOut',
        complete: () => this.dragger.done()
      })
    });
  },

  initKeys () {
    jQuery(document).on('keydown.cities', (e) => {
      if (this.isSliding) {
        return false;
      }

      const charcode = e.charcode ? e.charcode : e.keyCode;

      switch (charcode) {
        case 38:
          this.goTo('north');
          break;
        
        case 39:
          this.goTo('east');
          break;
        
        case 40:
          this.goTo('south');
          break;
        
        case 37:
          this.goTo('west');
          break;
      }
    });
  },

  initFrameOver () {
    let isOver;
    let currentDirection;

    var handleOver = direction => {
      const position = this.map.getPosition(this.currentCity);
      const directions = this.map.getDirections(this.currentCity);

      let props;

      if (direction === 'north' && directions.north) {
        props = { translateY: `${- (position.top * 100) + 10}%` };
      }
      else if (direction === 'east' && directions.east) {
        props = { translateX: `${- (position.left * 100) - 10}%` };
      }
      else if (direction === 'south' && directions.south) {
        props = { translateY: `${- (position.top * 100) - 10}%` };
      }
      else if (direction === 'west' && directions.west) {
        props = { translateX: `${- (position.left * 100) + 10}%` };
      }

      if (props) {
        this.els.$content.velocity('stop').velocity(props, {
          duration: 300,
          easing: 'easeInOut'
        });
      }
    };

    /**
     * Listen to 'positionSet' to know if we are still over a frame,
     * if so then don't wait for 'mouseover' to animate
     */
    this.listenTo(this, 'positionSet', () => {
      if (isOver) {
        handleOver(currentDirection);
      }
    });

    this.listenTo(this.frame, 'mouseover', (direction) => {
      isOver = true;
      currentDirection = direction;

      if (this.isSliding) {
        return false;
      }

      handleOver(direction);
    });

    this.listenTo(this.frame, 'mouseout', () => {
      isOver = false;
      currentDirection = null;

      if (this.isSliding) {
        return false;
      }

      const position = this.map.getPosition(this.currentCity);

      const props = {
        translateX: `${- (position.left * 100)}%`,
        translateY: `${- (position.top * 100)}%`
      }

      this.els.$content.velocity('stop').velocity(props, {
        duration: 300,
        ease: 'easeInOut'
      });
    });

  },

  initMenuClick () {
    this.listenTo(this.menu, 'click', name => {
      let view;

      if (name === 'infos') {
        view = new InfosView({ language: this.language });
      }
      else if (name === 'map') {
        view = new MapView({ collection: Store.getCities(), activeCity: this.currentCity });
        this.listenTo(view, 'marker:click', this.setCity);
      }
      else if (name === 'locals') {
        view = new LocalsView({ collection: Store.getCities() });
      }

      if (!view) {
        return false;
      }

      this.changeContent(view);
      this.menu.setActive(name);

      this.listenTo(view, 'close', () => {
        this.removeContent();
        this.menu.removeActive();
      });
    });
  },

  // position
  goTo (direction) {
    const directions = this.map.getDirections(this.currentCity);
    const slug = directions[direction];

    const href = this.frame.getHref(direction);

    if (href) {
      Backbone.history.navigate(href);
    }

    if (slug) {
      this.setCity(slug);
    } else {
      this.resetToDefaults();
    }
  },

  setCity (slug) {
    if (!slug || slug === this.currentCity) {
      return false;
    }

    this.previousCity = this.currentCity;
    this.currentCity = slug;

    this.setPosition();
    this.setDirections();
  },

  setPosition (noDelay=false) {
    this.isSliding = true;

    const way = this.getWay();
    const { previousView, currentView } = this.getViews();

    const delay = noDelay ? 0 : this.easing === 'ease-in-out' ? 300 : -400;

    if (previousView) {
      // previousView.out(way, delay);
    }

    if (currentView) {
      currentView.in(way, delay);
    }

    const toPosition = this.map.getPosition(this.currentCity);

    const props = {
      translateX: `${-(toPosition.left * 100)}%`,
      translateY: `${-(toPosition.top * 100)}%`
    }

    const opts = {
      duration: this.duration,
      easing: easings.Expo[this.easing],
      complete: () => {
        this.isSliding = false;
        this.trigger('positionSet');
        if (previousView) {
          previousView.reset();
        }
      }
    }

    this.els.$content.velocity('stop')
      .velocity(props, opts);

    this.resetToDefaults();
  },

  setDirections () {
    const directions = this.map.getDirections(this.currentCity);
    this.frame.model.set(directions);
  },

  resetToDefaults () {
    this.duration = 800;
    this.easing = 'easeInOut';
  },

  // animations
  // in () {

  // },

  // utils
  getWay () {
    const fromPosition = this.map.getPosition(this.previousCity) || { left: 0, top: 0 };
    const toPosition = this.map.getPosition(this.currentCity);

    let way;

    if (fromPosition.left === toPosition.left) {
      if (fromPosition.top < toPosition.top) {
        way = 'down';
      } else {
        way = 'up';
      }
    } else {
      if (fromPosition.left < toPosition.left) {
        way = 'right';
      } else {
        way = 'left';
      }
    }

    return way;
  },

  getViews () {
    const previousModel = this.collection.findWhere({ slug: this.previousCity });
    const previousView = _.findWhere(this.cities, { model: previousModel });

    const currentModel = this.collection.findWhere({ slug: this.currentCity });
    const currentView = _.findWhere(this.cities, { model: currentModel });

    return { previousView, currentView };
  },

  out (done) {
    const { previousView, currentView } = this.getViews();

    return new Promise((resolve, reject) => {
      if (currentView) {
        currentView.out();
      }
      
      this.frame.out();

      setTimeout(done, 600);
      
      this.$el
        .velocity('stop')
        .velocity({ opacity: 0 }, { duration: 1500, complete: resolve });
    });
  }
});