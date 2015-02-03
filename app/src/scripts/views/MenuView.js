'use strict';

import jQuery from 'jquery';
import Backbone from 'backbone';

export default Backbone.BetterView.extend({
  template: `
    <div class="menu">
      <a class="menu__button menu__button--bottomRight" data-button="locals">
        <div class="menu__icon menu__icon--locals">
          <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <path d="M35.9,32C34.5,28.2,32,27.3,30,27c-1.7-0.3-3.7-0.9-4.4-1.3c0-0.3,0-1,0-2.1c0,0,0.1-0.1,0.1-0.1l0,0c1-1.3,1.4-2.5,1.7-3.4  c0.6-0.4,1.3-1.3,1.7-3c0.2-1,0.4-2.2-0.3-3.1c0,0,0,0,0-0.1c0.6-6.2-3.3-9.3-5.6-10.1l0,0l0,0c-0.9-0.3-1.7-0.4-2.5-0.4  c-0.2,0-0.4,0-0.5,0c-0.2,0-0.3,0-0.5,0c-0.8,0-1.6,0.1-2.5,0.4l0,0l0,0c-2.3,0.8-6.3,3.9-5.6,10.1c0,0,0,0,0,0.1  c-0.7,0.9-0.5,2.1-0.3,3.1c0.4,1.7,1.1,2.5,1.7,3c0.2,0.8,0.7,2,1.6,3.3v0c0,0,0,0,0,0c0.1,0.1,0.1,0.1,0.2,0.2  c0.1,1.1,0.1,1.7,0,2.1c-0.7,0.4-2.8,1-4.4,1.3c-2,0.4-4.4,1.2-5.9,5.1c-0.2,0.7-0.2,1.4,0.2,1.9c1.5,2.2,9.4,2.6,15.7,2.6  s14.2-0.5,15.7-2.6C36.1,33.4,36.2,32.7,35.9,32z M14,18.9c-0.2,0-1-0.1-1.5-2.2c-0.4-1.6,0-1.9,0.3-1.9c0.1,0,0.2,0.1,0.2,0.1  c-1.4-7.5,4.4-9.5,4.4-9.5c0.8-0.2,1.5-0.3,2-0.3c0.2,0,0.4,0,0.5,0c0.2,0,0.3,0,0.5,0c0.6,0,1.2,0.1,2,0.3c0,0,5.8,2,4.4,9.5  c0,0,0.1-0.1,0.2-0.1c0.3,0,0.7,0.3,0.3,1.9c-0.5,2.1-1.3,2.2-1.5,2.2c0,0,0,0,0,0s-0.1,2-1.9,4.1c0,0,0,0,0,0.1  c-1.4,1.4-2.8,2.1-4.3,2.1c-1.8-0.1-3.2-1.3-3.9-2c0,0,0,0,0,0C14.1,20.9,14,18.9,14,18.9C14,18.9,14,18.9,14,18.9z M20,35  c-7.5,0-15-0.8-14.4-2.4c1.2-3.2,3.1-3.8,4.7-4.1c1.5-0.3,5.3-1.2,5.6-2.1c0.1-0.3,0.1-0.8,0.1-1.3c0.9,0.7,2.2,1.4,3.7,1.4  c0.1,0,0.2,0,0.2,0c1.4,0,2.7-0.5,4-1.5c0,0.6,0,1.1,0.1,1.4c0.3,0.9,4.1,1.8,5.6,2.1c1.5,0.3,3.5,0.9,4.7,4.1  C35,34.2,27.5,35,20,35z"/>
          </svg>
        </div>
      </a>

      <a class="menu__button menu__button--topRight" data-button="map">
        <div class="menu__icon menu__icon--map">
          <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <path fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M35.2,30.3L26.4 34.6 14.4 28.4 4.8 33.2 4.8 10.1 14.4 5.4 26.4 11.6 35.2 7.2 z"/>
            <line stroke-width="2" stroke-width="1" x1="14.4" y1="5.4" x2="14.4" y2="28.4"/>
            <line stroke-width="2" stroke-width="1" x1="26.4" y1="11.6" x2="26.4" y2="34.6"/>
          </svg>
        </div>
      </a>

      <a class="menu__button menu__button--bottomLeft" data-button="share">
        <div class="menu__expandable">
          <div class="menu__icon menu__icon--pinterest">
            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
              <path d="M20.5,8.4c-5.7,0-8.5,4.5-8.5,8.3c0,2.3,0.8,4.3,2.4,5.1c0.3,0.1,0.5,0,0.6-0.3c0.1-0.2,0.2-0.8,0.2-1.1  c0.1-0.3,0-0.5-0.2-0.7c-0.5-0.6-0.8-1.5-0.8-2.6c0-3.4,2.3-6.4,5.9-6.4c3.2,0,5,2.2,5,5.1c0,3.8-1.5,7.1-3.8,7.1  c-1.2,0-2.2-1.2-1.9-2.6c0.4-1.7,1.1-3.5,1.1-4.7c0-1.1-0.5-2-1.6-2c-1.3,0-2.3,1.5-2.3,3.5c0,1.3,0.4,2.1,0.4,2.1s-1.3,6.2-1.5,7.3  c-0.5,2.2-0.1,4.8,0,5.1c0,0.2,0.2,0.2,0.3,0.1c0.1-0.2,1.6-2.3,2.2-4.4c0.1-0.6,0.8-3.7,0.8-3.7c0.4,0.9,1.6,1.7,2.9,1.7  c3.8,0,6.4-3.9,6.4-9.1C28,12.1,25,8.4,20.5,8.4z"/>
            </svg>
          </div>
          <div class="menu__icon menu__icon--twitter">
            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
              <path d="M9.6,27c0.3,0,0.7,0.1,1,0.1c2,0,3.8-0.6,5.4-1.9c-0.9,0-1.8-0.3-2.5-0.9s-1.2-1.3-1.5-2.2c0.2,0,0.5,0.1,0.8,0.1  c0.4,0,0.8-0.1,1.1-0.2c-1-0.2-1.8-0.7-2.5-1.6c-0.7-0.8-1-1.8-1-2.9v-0.1c0.6,0.4,1.3,0.5,2,0.6c-0.6-0.4-1.1-0.9-1.4-1.6  c-0.4-0.7-0.5-1.4-0.5-2.2c0-0.8,0.2-1.6,0.6-2.3c1.1,1.4,2.4,2.5,3.9,3.4c1.5,0.8,3.2,1.3,5,1.4c-0.1-0.4-0.1-0.7-0.1-1  c0-1.2,0.4-2.3,1.3-3.2c0.8-0.9,1.9-1.3,3-1.3c1.2,0,2.3,0.5,3.1,1.4c1-0.2,1.9-0.6,2.7-1.1c-0.3,1.1-0.9,1.9-1.9,2.5  c0.8-0.1,1.6-0.3,2.5-0.7c-0.5,0.9-1.3,1.7-2.1,2.4v0.6c0,1.2-0.2,2.4-0.5,3.6c-0.3,1.2-0.9,2.4-1.5,3.5c-0.7,1.1-1.5,2.1-2.5,3  s-2.1,1.6-3.4,2.1c-1.3,0.5-2.8,0.8-4.3,0.8C13.7,29,11.5,28.3,9.6,27L9.6,27z"/>
            </svg>
          </div>
          <div class="menu__icon menu__icon--facebook">
            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
              <path d="M14.6,20.7v-3.9h3.1v-1.9c0-1.4,0.5-2.6,1.4-3.6c0.9-1,2-1.5,3.3-1.5h3v3.9h-3c-0.2,0-0.4,0.1-0.5,0.3  c-0.2,0.2-0.2,0.5-0.2,0.8v2h3.8v3.9h-3.8v9.4h-3.8v-9.4L14.6,20.7L14.6,20.7z"/>
            </svg>
          </div>
        </div>
        <div class="menu__icon menu__icon--share">
          <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <path fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.2,22.9L3.1 17.2 36.9 3.1 22.8 36.9 z"/>
            <line stroke-width="2" x1="17.2" y1="22.9" x2="36.9" y2="3.1"/>
          </svg>
        </div>
      </a>

      <a class="menu__button menu__button--topLeft" data-button="infos">
        <div class="menu__icon menu__icon--infos">
          <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <rect x="18.5" y="16.1" width="3" height="15.2"/>
            <circle cx="20" cy="10.8" r="2.2"/>
          </svg>
        </div>
      </a>
    </div>
  `,

  events: {
    'click a': 'onClick',
    'mouseenter .menu__button--bottomLeft': 'onShareOver',
    'mouseleave .menu__button--bottomLeft': 'onShareOut'
  },

  els: {
    '$buttons': '.menu__button',
    '$expandable': '.menu__expandable',
    '$icon': '.menu__icon--share'
  },

  didInitialize () {
    this.expandableHeight = null;
    this.iconHeight = null;
  },

  onClick (e) {
    var $el = jQuery(e.currentTarget);
    var button = $el.attr('data-button');
    if (button) this.trigger('click', button);
  },

  setActive (name) {
    this.els.$buttons.removeClass('is-active');
    this.els.$buttons.each((i, el) => {
      var $el = jQuery(el);
      if ($el.attr('data-button') === name)
        $el.addClass('is-active');
    });
  },

  removeActive () {
    this.els.$buttons.removeClass('is-active');
  },

  onShareOver (e) {
    if (!this.expandableHeight) {
      this.expandableHeight = this.els.$expandable.css('height', 'auto').height();
      this.els.$expandable.css('height', 0);
    }

    if (!this.iconHeight) this.iconHeight = this.els.$icon.outerHeight();
    
    this.els.$expandable
      .velocity('stop')
      .velocity({ height: this.expandableHeight }, 300);

    this.els.$icon
      .velocity('stop')
      .velocity({ marginBottom: -this.iconHeight }, 400);
  },

  onShareOut (e) {
    this.els.$expandable
      .velocity('stop')
      .velocity({ height: 0 }, 300);

    this.els.$icon
      .velocity('stop')
      .velocity({ marginBottom: 0 }, 400);
  },

  in () {
    this.$('a').each(function (i) {
      jQuery(this)
        .css({ opacity: 0, marginTop: 50 })
        .velocity({ opacity: 1, marginTop: 0 }, { duration: 800, delay: i * 300 });
    });
  }
});