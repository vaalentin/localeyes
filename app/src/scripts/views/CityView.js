'use strict';

import jQuery from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Features from '../modules/Features';
import Loader from '../modules/Loader';

export default Backbone.BetterView.extend({
  className: 'city',

  template: `
    <div class="city__content">
      <div class="city__content__section">
        <div class="city__title">
          <div class="city__icon">
            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
              <% _.each(icon, function(el) { %>
              <path fill="#ffffff"
                stroke="#ffffff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="<%= el.path %>"
                <% if (el.length) { %>
                data-length="<%= el.length %>"
                <% } %>/>
              <% }); %>
            </svg>
          </div>
          <h1 class="city__name"> <% print(name.toUpperCase()); %> </h1>
          <h2 class="city__country"> <% print(country.toUpperCase()); %> </h2>
          <div class="city__square city__square--topLeft"></div>
          <div class="city__square city__square--topRight"></div>
          <div class="city__square city__square--bottomLeft"></div>
          <div class="city__square city__square--bottomRight"></div>
        </div>
      </div>
      <% if (localSlug) { %>
      <div class="city__content__section city__content__section--button">
        <div class="city__button">
          <% if (language === 'en') { %>
            <a href="#local/<%= localSlug %>/en" class="city__link">
              DISCOVER <span class="city__local"> <% print(local.toUpperCase()); %> </span>
            </a>
          <% } else { %>
            <a href="#local/<%= localSlug %>" class="city__link">
              DÉCOUVRIR <span class="city__local"> <% print(local.toUpperCase()); %> </span>
            </a>
          <% } %>
          <div class="city__border city__border--top"></div>
          <div class="city__border city__border--left"></div>
          <div class="city__border city__border--bottom"></div>
          <div class="city__border city__border--right"></div>
        </div>
      </div>
      <% } %>
    </div>
    <% if (background) { %>
      <div class="city__background"
        style="background-image:url(<%= background %>)"></div>
    <% } %>
  `,

  els: {
    '$squareTopLeft': '.city__square--topLeft',
    '$squareTopRight': '.city__square--topRight',
    '$squareBottomLeft': '.city__square--bottomLeft',
    '$squareBottomRight': '.city__square--bottomRight',
    '$name': '.city__name',
    '$country': '.city__country',
    '$icon': '.city__icon',
    '$button': '.city__button',
    '$bordersTopBottom': '.city__border--top, .city__border--bottom',
    '$bordersLeftRight': '.city__border--left, .city__border--right',
    '$background': '.city__background',
    '$svgs': 'svg'
  },

  didInitialize (options) {
    _.extend(this, _.pick(options, 'position', 'language'));
  },

  onLoad () {
    this.loaded = true;
  },

  setPosition () {
    this.$el.css({
      left: (this.position.left * 100) + '%',
      top: (this.position.top * 100) + '%'
    });
  },

  in () {
    if (Features.mobile) return false;

    this.els.$squareTopLeft
      .velocity('stop')
      .velocity({ left: 0, opacity: 1 }, { duration: 400, delay: 500 })
      .velocity({ top: 0 }, { duration: 400, delay: 200 });

    this.els.$squareTopRight
      .velocity('stop')
      .velocity({ right: 0, opacity: 1 }, { duration: 400, delay: 500 })
      .velocity({ top: 0 }, { duration: 400, delay: 200 });

    this.els.$squareBottomLeft
      .velocity('stop')
      .velocity({ left: 0, opacity: 1 }, { duration: 400, delay: 500 })
      .velocity({ bottom: 0 }, { duration: 400, delay: 300 });

    this.els.$squareBottomRight
      .velocity('stop')
      .velocity({ right: 0, opacity: 1 }, { duration: 400, delay: 500 })
      .velocity({ bottom: 0 }, { duration: 400, delay: 300 });

    this.els.$name
      .velocity('stop')
      .velocity({ opacity: 1, top: 0 }, { duration: 500, delay: 1100 });

    this.els.$country
      .velocity('stop')
      .velocity({ opacity: 1, top: 0 }, { duration: 500, delay: 1200 });

    this.els.$icon
      .velocity('stop')
      .velocity({ top: -90, opacity: 1 }, { duration: 1500, delay: 500 });

    this.els.$button
      .velocity('stop')
      .velocity({ opacity: 1, top: 0 }, { duration: 500, delay: 1400 });

    this.els.$bordersTopBottom
      .velocity('stop')
      .velocity({ width: '100%' }, { duration: 1000, delay: 1400, display: 'block' });

    this.els.$bordersLeftRight
      .velocity('stop')
      .velocity({ height: '100%' }, { duration: 1000, delay: 1400, display: 'block' });

    this.els.$background
      .velocity('stop')
      .velocity({ scale: 1.2 }, 0)
      .velocity({ scale: 1 }, 2500);

    this.els.$svgs.each(function () {
      jQuery('path', this).each(function () {
        var $path = jQuery(this);
        var data = $path.attr('data-length');
        
        var length;
        if (data) {
          length = parseFloat(data);
        } else {
          length = $path[0].getTotalLength();
          $path.attr('data-length', length);
        }

        $path.velocity('stop').velocity({
            'stroke-dashoffset': length,
            'stroke-dasharray': `${length},${length}`,
            fillOpacity: 0,
            strokeOpacity: 1
          }, 0)
          .velocity({ 'stroke-dashoffset': 0 }, { duration: 2000, delay: 500 })
          .velocity({ fillOpacity: 1 }, { duration: 500, delay: 2000, queue: false });
      });
    });
  },

  out () {
    if (Features.mobile) return false;

    this.els.$background
      .velocity('stop')
      .velocity({ scale: 1.2 }, 600);

    this.$el
      .velocity('stop')
      .velocity({ opacity: 0 }, { duration: 600 });
  },

  /**
   * Instantly reset the view (ready to animate in)
   *
   * @methd reset
   */
  reset () {
    if (Features.mobile) return false;
    
    this.els.$squareTopLeft
      .velocity('stop')
      .css({ top: '50%', left: '50%', opacity: 0 });
    
    this.els.$squareTopRight
      .velocity('stop')
      .css({ top: '50%', right: '50%', opacity: 0 });
    
    this.els.$squareBottomLeft
      .velocity('stop')
      .css({ bottom: '50%', left: '50%', opacity: 0 });
    
    this.els.$squareBottomRight
      .velocity('stop')
      .css({ bottom: '50%', right: '50%', opacity: 0 });
    
    this.els.$name
      .velocity('stop')
      .css({ opacity: 0, top: -90 });
    
    this.els.$country
      .velocity('stop')
      .css({ opacity: 0, top: 50 });
    
    this.els.$icon
      .velocity('stop')
      .css({ top: -150, opacity: 0 });
    
    this.els.$button
      .velocity('stop')
      .css({ opacity: 0, top: 50 });
    
    this.els.$bordersTopBottom
      .velocity('stop')
      .css('width', 0);
    
    this.els.$bordersLeftRight
      .velocity('stop')
      .css('height', 0);
    
    this.els.$background
      .velocity('stop')
      .velocity({ scale: 1.2 }, 0);
      
    this.els.$svgs.each(function () {
      jQuery('path', this).each(function () {
        var $path = jQuery(this);
        var data = $path.attr('data-length');
        
        var length;
        if (data) {
          length = parseFloat(data);
        } else {
          length = $path[0].getTotalLength();
          $path.attr('data-length', length);
        }

        $path.velocity('stop')
          .velocity({
          'stroke-dashoffset': length,
          'stroke-dasharray': `${length},${length}`,
          fillOpacity: 0,
          strokeOpacity: 1
        }, 0);
      });
    });
  },

  render () {
    var data = _.extend(this.model.toJSON(), { language: this.language });
    Backbone.BetterView.prototype.render.call(this, data);
    return this;
  },

  didRender () {
    this.setPosition();

    this.loaded = false;
    this.loader = new Loader([ this.model.get('background')]);
    this.loader.load().then(this.onLoad.bind(this));
  }
});