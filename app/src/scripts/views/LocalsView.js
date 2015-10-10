'use strict';

import Backbone from 'backbone';

import CoverView from './CoverView';

export default Backbone.PageView.extend({
  name: 'locals',
  className: 'locals',

  template: `
    <div class="locals__wrapper">
      <div class="locals__dummy"></div>
      <div class="locals__container">
        <div class="locals__centerer"></div>
        <div class="locals__content">
          <a class="locals__icon locals__icon--close">
            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <line stroke="#000000" stroke-width="2" x1="13.3" y1="36.7" x2="36.7" y2="13.3"/>
              <line stroke="#000000" stroke-width="2" x1="13.3" y1="13.3" x2="36.7" y2="36.7"/>
            </svg>
          </a>
          <div class="locals__frame">
            <div class="locals__bar locals__bar--top"></div>
            <div class="locals__bar locals__bar--right"></div>
            <div class="locals__bar locals__bar--bottom"></div>
            <div class="locals__bar locals__bar--left"></div>
          </div>
          <div class="locals__content__container"></div>
        </div>
      </div>
    </div>
  `,

  events: {
    'click .locals__icon--close': 'onCloseClick'
  },

  els: {
    '$barsTopBottom': '.locals__bar--top, .locals__bar--bottom',
    '$barsLeftRight': '.locals__bar--left, .locals__bar--right',
    '$icon': '.locals__icon--close'
  },

  onCloseClick (e) {
    this.trigger('close');
  },

  didInitialize () {
    this.covers = this.collection.map(city => {
      return new CoverView({ model: city });
    });
  },

  willRemove () {
    this.covers.forEach(cover => cover.remove());
  },

  in () {
    this.$el.velocity({ translateY: 200, opacity: 0 }, 0)
      .velocity({ translateY: 0, opacity: 1 }, { duration: 1200, easing: window.easings.Expo.easeOut });

    this.els.$barsLeftRight.css('height', 0)
      .velocity({ height: '100%' }, { duration: 1000, easing: window.easings.Expo.easeInOut });

    this.els.$barsTopBottom.css('width', 0)
      .velocity({ width: '100%' }, { duration: 1000, delay: 500 });

    this.els.$icon.velocity({ translateY: 50, opacity: 0 }, 0)
      .velocity({ translateY: 0, opacity: 1 }, { duration: 600, delay: 800 });

    this.covers.forEach((cover, i) => {
      cover.in((i * 200) + 400);
    });
  },

  out (done) {
    setTimeout(done, 200);
    return new Promise((resolve, reject) => {
      this.$el.velocity({ translateY: -200, opacity: 0 }, {
        duration: 1200,
        complete: resolve,
        easing: window.easings.Expo.easeOut
      });
    });
  },

  didRender () {
    this.append(this.covers, '.locals__content__container');
  }
});
