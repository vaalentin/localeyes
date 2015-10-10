
'use strict';

import jQuery from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Features from '../modules/Features';
import Loader from '../modules/Loader';

import { buttonPartial, buttonAnimation } from '../partials/button';

export default Backbone.BetterView.extend({
  className: 'city',

  template: `
    <div class="city__content">
      <div class="city__content__section">
        <div class="city__title">
          <div class="city__icon city__icon--<%= slug %>">
            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
              <% _.each(icon, function(el) { %>
                <% if (el.path) { %>
                  <path fill="#ffffff"
                    stroke="#ffffff"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="<%= el.path %>"
                    <% if (el.length) { %>
                      data-length="<%= el.length %>"
                    <% } %>/>
                  <% } else if (el.line) { %>
                    <line fill="none"
                      stroke="#ffffff"
                      stroke-miterlimit="10"
                      <%= el.line %>
                      <% if (el.length) { %>
                        data-length="<%= el.length %>"
                      <% } %>/>
                  <% } else if (el.rect) { %>
                    <rect fill="#ffffff"
                      <%= el.rect %>
                      <% if (el.length) { %>
                        data-length="<%= el.length %>"
                      <% } %>/>
                  <% } %>
              <% }); %>
            </svg>
          </div>
          <h1 class="city__name">
            <% _.each(name.toUpperCase().split(' '), function (word) { %>
              <span> <%= word %> </span>
            <% }); %>
          </h1>
          <h3 class="city__country"> <% print(country.toUpperCase()); %> </h3>
          <div class="city__square--topLeft"></div>
          <div class="city__square--topRight"></div>
          <div class="city__square--bottomLeft"></div>
          <div class="city__square--bottomRight"></div>
        </div>
      </div>
      <% if (localSlug) { %>
      <div class="city__content__section--button">
        <% if (language === 'en') { %>
          ${buttonPartial({
            link: '#local/<%= localSlug %>/en',
            text: 'DISCOVER',
            className: 'city__button'
          })}
        <% } else { %>
          ${buttonPartial({
            link: '#local/<%= localSlug %>',
            text: 'DÉCOUVRIR',
            className: 'city__button'
          })}
        <% } %>
      </div>
      <% } %>
    </div>
    <% if (background) { %>
      <div class="city__background__container">
        <div class="city__background" style="background-image: url(<%= background %>)"></div>
      </div>
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
    '$button': '.button',
    '$bordersTopBottom': '.button__border--top, .button__border--bottom',
    '$bordersLeftRight': '.button__border--left, .button__border--right',
    '$background': '.city__background',
    '$svgs': 'svg'
  },

  didInitialize (options) {
    _.extend(this, _.pick(options, 'position', 'language'));
  },

  setPosition () {
    this.$el.css({
      left: (this.position.left * 100) + '%',
      top: (this.position.top * 100) + '%'
    });
  },

  in () {
    if (Features.mobile) return false;

    // square top left
    this.els.$squareTopLeft
      .velocity({ left: 0, opacity: 1 }, { duration: 400, delay: 500, easing: window.easings.Expo.easeOut })
      .velocity({ top: 0 }, { duration: 400, delay: 200, easing: window.easings.Expo.easeInOut });

    this.els.$squareTopLeft
      .velocity({ width: 75 }, { duration: 200, delay: 100, queue: false, easing: window.easings.Expo.easeOut })
      .velocity({ width: 7 }, { duration: 400, delay: 600, queue: false, easing: window.easings.Expo.easeOut })
      .velocity({ height: 25 }, { duration: 200, delay: 1200, queue: false, easing: window.easings.Expo.easeOut })
      .velocity({ height: 7 }, { duration: 400, delay: 1400, queue: false, easing: window.easings.Expo.easeOut });

    // square top right
    this.els.$squareTopRight
      .velocity({ right: 0, opacity: 1 }, { duration: 400, delay: 500, easing: window.easings.Expo.easeOut })
      .velocity({ top: 0 }, { duration: 400, delay: 200, easing: window.easings.Expo.easeInOut });

    this.els.$squareTopRight
      .velocity({ width: 75 }, { duration: 200, delay: 100, queue: false, easing: window.easings.Expo.easeOut })
      .velocity({ width: 7 }, { duration: 400, delay: 600, queue: false, easing: window.easings.Expo.easeOut })
      .velocity({ height: 25 }, { duration: 200, delay: 1200, queue: false, easing: window.easings.Expo.easeOut })
      .velocity({ height: 7 }, { duration: 400, delay: 1400, queue: false, easing: window.easings.Expo.easeOut });

    // square bottom left
    this.els.$squareBottomLeft
      .velocity({ left: 0, opacity: 1 }, { duration: 400, delay: 500, easing: window.easings.Expo.easeOut })
      .velocity({ bottom: 0 }, { duration: 400, delay: 200, easing: window.easings.Expo.easeInOut });

    this.els.$squareBottomLeft
      .velocity({ width: 75 }, { duration: 200, delay: 100, queue: false, easing: window.easings.Expo.easeOut })
      .velocity({ width: 7 }, { duration: 400, delay: 600, queue: false, easing: window.easings.Expo.easeOut })
      .velocity({ height: 25 }, { duration: 200, delay: 1200, queue: false, easing: window.easings.Expo.easeOut })
      .velocity({ height: 7 }, { duration: 400, delay: 1400, queue: false, easing: window.easings.Expo.easeOut });

    // square bottom right
    this.els.$squareBottomRight
      .velocity({ right: 0, opacity: 1 }, { duration: 400, delay: 500, easing: window.easings.Expo.easeOut })
      .velocity({ bottom: 0 }, { duration: 400, delay: 200, easing: window.easings.Expo.easeInOut });

    this.els.$squareBottomRight
      .velocity({ width: 75 }, { duration: 200, delay: 100, queue: false, easing: window.easings.Expo.easeOut })
      .velocity({ width: 7 }, { duration: 400, delay: 600, queue: false, easing: window.easings.Expo.easeOut })
      .velocity({ height: 25 }, { duration: 200, delay: 1200, queue: false, easing: window.easings.Expo.easeOut })
      .velocity({ height: 7 }, { duration: 400, delay: 1400, queue: false, easing: window.easings.Expo.easeOut });

    // name
    this.els.$name
      .velocity({ opacity: 1, top: 0 }, { duration: 800, delay: 1000, easing: window.easings.Expo.easeInOut });

    // country
    this.els.$country
      .velocity({ opacity: 1, top: 0 }, { duration: 800, delay: 1100, easing: window.easings.Expo.easeInOut });

    // icon
    this.els.$icon
      .velocity({ top: -90, opacity: 1 }, { duration: 800, delay: 1150, easing: window.easings.Expo.easeInOut });

    this.els.$svgs.each(function () {
      jQuery('path', this).each(function () {
        const $path = jQuery(this);
        const data = $path.attr('data-length');
        
        let length;
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

    // button
    this.els.$button
      .velocity({ top: 0, opacity: 1 }, { duration: 500, delay: 1200, easing: window.easings.Expo.easeInOut });

    this.els.$button
      .velocity({ paddingTop: 15 }, { duration: 200, delay: 1300, queue: false, easing: window.easings.Expo.easeOut })
      .velocity({ paddingTop: 0 }, { duration: 500, delay: 1500, queue: false, easing: window.easings.Expo.easeOut });

    this.els.$button
      .velocity({ paddingBottom: 15 }, { duration: 200, delay: 1350, queue: false, easing: window.easings.Expo.easeOut })
      .velocity({ paddingBottom: 0 }, { duration: 600, delay: 1550, queue: false, easing: window.easings.Expo.easeOut });

    // buttonAnimation(this.els.$button, { withBorders: true, duration: 800, delay: 1300, easing: window.easings.Expo.easeInOut });

    this.els.$background
      .velocity('stop')
      .velocity({ scale: 1.2 }, 0)
      .velocity({ scale: 1 }, 2500);
  },

  out () {
    if (Features.mobile) return false;

    this.els.$background
      .velocity('stop')
      .velocity({ scale: 1.2 }, { duration: 1000, easing: easings.Expo.easeInOut });
  },

  /**
   * Instantly reset the view (ready to animate in)
   *
   * @method reset
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
    
    // this.els.$bordersTopBottom
    //   .velocity('stop')
    //   .css('width', 0);
    
    // this.els.$bordersLeftRight
    //   .velocity('stop')
    //   .css('height', 0);
    
    this.els.$background
      .velocity('stop')
      .velocity({ scale: 1.2 }, 0);
      
    // this.els.$svgs.each(function () {
    //   jQuery('path', this).each(function () {
    //     const $path = jQuery(this);
    //     const data = $path.attr('data-length');
        
    //     let length;
    //     if (data) {
    //       length = parseFloat(data);
    //     } else {
    //       length = $path[0].getTotalLength();
    //       $path.attr('data-length', length);
    //     }

    //     $path.velocity('stop')
    //       .velocity({
    //       'stroke-dashoffset': length,
    //       'stroke-dasharray': `${length},${length}`,
    //       fillOpacity: 0,
    //       strokeOpacity: 1
    //     }, 0);
    //   });
    // });
  },

  render () {
    const data = _.extend(this.model.toJSON(), { language: this.language });
    Backbone.BetterView.prototype.render.call(this, data);
    return this;
  },

  didRender () {
    this.setPosition();
  }
});