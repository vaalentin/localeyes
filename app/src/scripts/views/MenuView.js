'use strict';

import jQuery from 'jquery';
import Backbone from 'backbone';

export default Backbone.BetterView.extend({
  template: `
    <div class="menu">
      <a class="menu__button menu__button--bottom menu__button--bottomRight" data-button="locals">
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

      <div class="menu__button menu__button--bottom menu__button--bottomLeft" data-button="share">
        <div class="menu__expandable">

          <a href='https://instagram.com/localeyesproject' target='_blank' class="menu__icon menu__icon--instagam">
            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
              <path fill="#fff" d="M26.006,7.985H13.995c-3.309,0-6.001,2.683-6.001,5.98v12.068c0,3.297,2.692,5.98,6.001,5.98h12.011c3.309,0,6-2.684,6-5.98  V13.966C32.006,10.668,29.314,7.985,26.006,7.985L26.006,7.985z M29.783,26.034c0,2.076-1.695,3.766-3.777,3.766H13.995  c-2.083,0-3.779-1.689-3.779-3.766v-7.795h4.748c-0.346,0.733-0.542,1.552-0.542,2.414c0,3.132,2.558,5.681,5.7,5.681  c3.143,0,5.7-2.549,5.7-5.681c0-0.862-0.193-1.681-0.541-2.414h4.502V26.034L29.783,26.034z M17.757,20.653  c0-1.3,1.062-2.358,2.366-2.358c1.305,0,2.368,1.059,2.368,2.358s-1.062,2.358-2.368,2.358  C18.818,23.012,17.757,21.953,17.757,20.653L17.757,20.653z M29.783,16.024h-6.361c-0.932-0.661-2.07-1.053-3.299-1.053  c-1.229,0-2.367,0.392-3.298,1.053h-6.608v-2.059c0-2.076,1.695-3.766,3.779-3.766h12.011c2.082,0,3.777,1.689,3.777,3.766V16.024  L29.783,16.024L29.783,16.024z M27.375,11.544h-2.061c-0.367,0-0.666,0.299-0.666,0.664v2.054c0,0.365,0.299,0.664,0.666,0.664  h2.061c0.367,0,0.668-0.299,0.668-0.664v-2.054C28.043,11.843,27.742,11.544,27.375,11.544L27.375,11.544z"/>
            </svg>
          </a>

          <a href='https://www.facebook.com/localeyesproject' target='_blank' class="menu__icon menu__icon--facebook">
            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
              <path d="M14.6,20.7v-3.9h3.1v-1.9c0-1.4,0.5-2.6,1.4-3.6c0.9-1,2-1.5,3.3-1.5h3v3.9h-3c-0.2,0-0.4,0.1-0.5,0.3  c-0.2,0.2-0.2,0.5-0.2,0.8v2h3.8v3.9h-3.8v9.4h-3.8v-9.4L14.6,20.7L14.6,20.7z"/>
            </svg>
          </a>
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
      </div>

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
    this.expandableHeight = this.iconHeight = null;
  },

  onClick (e) {
    const $el = jQuery(e.currentTarget);
    const button = $el.attr('data-button');
    if (button) this.trigger('click', button);
  },

  setActive (name) {
    this.els.$buttons.removeClass('is-active');
    this.els.$buttons.each((i, el) => {
      const $el = jQuery(el);
      if ($el.attr('data-button') === name) {
        $el.addClass('is-active');
      }
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
    this.$('.menu__button').each(function (i) {
      const delay = ((i + 1) * 200) + 2000;
      const $el = jQuery(this);

      let cssProps;
      let animateProps;

      if ($el.hasClass('.menu__button--bottom')) {
        cssProps = { marginBottom: -50, opacity: 0 };
        animateProps = { marginBottom: 0, opacity: 1 };
      }
      else {
        cssProps = { marginTop: 50, opacity: 0 };
        animateProps = { marginTop: 0, opacity: 1 };
      }

      $el
        .css(cssProps)
        .velocity(animateProps, { duration: 500, delay: delay - 100, easing: window.easings.Expo.easeInOut });

      $el
        .velocity({ paddingTop: 15 }, { duration: 200, delay: delay, queue: false, easing: window.easings.Expo.easeOut })
        .velocity({ paddingTop: 0 }, { duration: 500, delay: delay + 200, queue: false, easing: window.easings.Expo.easeOut });

      $el
        .velocity({ paddingBottom: 15 }, { duration: 200, delay: delay + 50, queue: false, easing: window.easings.Expo.easeOut })
        .velocity({ paddingBottom: 0 }, { duration: 600, delay: delay + 250, queue: false, easing: window.easings.Expo.easeOut });
    });
  }
});