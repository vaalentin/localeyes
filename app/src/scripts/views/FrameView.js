'use strict';

import jQuery from 'jquery';
import Backbone from 'backbone';

export default Backbone.BetterView.extend({
  template: `
    <div class="frame">
      <a class="frame__bar frame__bar--top" data-direction="north">
        <div class="frame__text frame__text--horizontal">
          <span class="frame__letter"> N </span>
        </div>
        <div class="frame__arrow frame__arrow--top">
          <div class="frame__arrow__container frame__arrow__container--top">
            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 20 50">
              <path fill="#ffffff" d="M20,50L10 40 0 50 0 0 20 0 z"/>
            </svg>
          </div>
        </div>
        <div class="frame__part frame__part--left"></div>
        <div class="frame__part frame__part--right"></div>
      </a>

      <a class="frame__bar frame__bar--right" data-direction="east">
        <div class="frame__text frame__text--vertical">
          <div class="frame__letters frame__letters--vertical">
            <span class="frame__letter frame__letter--vertical"> E </span>
          </div>
        </div>
        <div class="frame__arrow frame__arrow--right">
          <div class="frame__arrow__container frame__arrow__container--right">
            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 50 20">
              <path fill="#ffffff" d="M0,0L10 10 0 20 50 20 50 0 z"/>
            </svg>
          </div>
        </div>
        <div class="frame__part frame__part--top"></div>
        <div class="frame__part frame__part--bottom"></div>
      </a>

      <a class="frame__bar frame__bar--bottom" data-direction="south">
        <div class="frame__text frame__text--horizontal">
          <span class="frame__letter"> S </span>
        </div>
        <div class="frame__arrow frame__arrow--bottom">
          <div class="frame__arrow__container frame__arrow__container--bottom">
            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 20 50">
              <path fill="#ffffff" d="M20,0L10 10 0 0 0 50 20 50 z"/>
            </svg>
          </div>
        </div>
        <div class="frame__part frame__part--left"></div>
        <div class="frame__part frame__part--right"></div>
      </a>

      <a class="frame__bar frame__bar--left" data-direction="west">
        <div class="frame__text frame__text--vertical">
          <div class="frame__letters frame__letters--vertical">
            <span class="frame__letter frame__letter--vertical"> W </span>
          </div>
        </div>
        <div class="frame__arrow frame__arrow--left">
          <div class="frame__arrow__container frame__arrow__container--left">
            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 50 20">
              <path fill="#ffffff" d="M50,20L40 10 50 0 0 0 0 20 z"/>
            </svg>
          </div>
        </div>
        <div class="frame__part frame__part--top"></div>
        <div class="frame__part frame__part--bottom"></div>
      </a>
    </div>
  `,

  events: {
    'mouseover .frame__bar': 'onMouseover',
    'mouseout .frame__bar': 'onMouseout'
  },

  els: {
    '$barnorth': '.frame__bar--top',
    '$barwest': '.frame__bar--left',
    '$barsouth': '.frame__bar--bottom',
    '$bareast': '.frame__bar--right'
  },

  didInitialize (options) {
    _.extend(this, _.pick(options, 'language'));
    this.listenTo(this.model, 'change', this.onChange);
  },

  onMouseover (e) {
    const $el = jQuery(e.currentTarget);
    const direction = $el.attr('data-direction');
    if (direction) this.trigger('mouseover', direction);
  },

  onMouseout () {
    this.trigger('mouseout');
  },

  onChange () {
    ['top', 'right', 'bottom', 'left'].forEach(position => {
      const $el = this.$(`.frame__bar--${position}`);
      const direction = $el.attr('data-direction');
      
      if (this.model.has(direction)) {
        const href = this.language
          ? `#city/${this.model.get(direction)}/${this.language}`
          : `#city/${this.model.get(direction)}`;

        $el.attr('href', href).removeClass('is-inactive');
      } else {
        $el.attr('href', null).addClass('is-inactive');
      }
    });
  },

  onUpdate (directions) {
    this.model.set(directions);
  },

  disable () {
    if (this.previousValues) return false;

    this.previousValues = this.model.toJSON();
    this.model.set({ north: undefined, east: undefined, south: undefined, west: undefined });
  },

  enable () {
    if (!this.previousValues) return false;
    
    this.model.set(this.previousValues);
    this.previousValues = null;
  },

  in () {
    this.els.$barnorth
      .css('top', -40)
      .velocity({ top: 0 }, { duration: 800 });
    
    this.els.$barsouth
      .css('bottom', -40)
      .velocity({ bottom: 0 }, { duration: 800 });
    
    this.els.$barwest
      .css('left', -40)
      .velocity({ left: 0 }, { duration: 800 });
    
    this.els.$bareast
      .css('right', -40)
      .velocity({ right: 0 }, { duration: 800 });
  },

  out () {
    this.els.$barnorth
      .velocity('stop')
      .velocity({ top: -40 }, { duration: 800, easing: easings.Expo.easeInOut });

    this.els.$barsouth
      .velocity('stop')
      .velocity({ bottom: -40 }, { duration: 800, easing: easings.Expo.easeInOut });

    this.els.$barwest
      .velocity('stop')
      .velocity({ left: -40 }, { duration: 800, easing: easings.Expo.easeInOut });

    this.els.$bareast
      .velocity('stop')
      .velocity({ right: -40 }, { duration: 800, easing: easings.Expo.easeInOut });  
  },

  getHref (direction) {
    const $el = this.els[`$bar${direction}`];

    if ($el) {
      return $el.attr("href");
    } else {
      return null;
    }
  }
});