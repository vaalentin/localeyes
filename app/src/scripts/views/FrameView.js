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

  didInitialize () {
    this.listenTo(this.model, 'change', this.onChange);
  },

  onMouseover (e) {
    var $el = jQuery(e.currentTarget);
    var direction = $el.attr('data-direction');
    if (direction) this.trigger('mouseover', direction);
  },

  onMouseout () {
    this.trigger('mouseout');
  },

  onChange () {
    ['top', 'right', 'bottom', 'left'].forEach(position => {
      var $el = this.$(`.frame__bar--${position}`);
      var direction = $el.attr('data-direction');
      
      if (this.model.has(direction)) {
        $el.attr('href', `#city/${this.model.get(direction)}`).removeClass('is-inactive');
      } else {
        $el.attr('href', null).addClass('is-inactive');
      }
    });
  },

  onUpdate (directions) {
    this.model.set(directions);
  },

  in () {
    this.$('.frame__bar--top').css('top', -40)
      .velocity({ top: 0 }, { duration: 800 });

    this.$('.frame__bar--bottom').css('bottom', -40)
      .velocity({ bottom: 0 }, { duration: 800 });

    this.$('.frame__bar--left').css('left', -40)
      .velocity({ left: 0 }, { duration: 800 });

    this.$('.frame__bar--right').css('right', -40)
      .velocity({ right: 0 }, { duration: 800 });
  }
});