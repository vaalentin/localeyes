'use strict';

import Backbone from 'backbone';

import CoverView from './CoverView';

export default Backbone.PageView.extend({
  className: 'locals',

  name: 'locals',

  template2: `
    <div class="locals__wrapper">
      <div class="locals__outerContainer">
        <div class="locals__innerContainer">
          <div class="locals__content"></div>
        </div>
      </div>
    </div>
  `,

  template: `
    <div class="locals__bars">
      <div class="locals__bar locals__bar--top"></div>
      <div class="locals__bar locals__bar--right"></div>
      <div class="locals__bar locals__bar--bottom"></div>
      <div class="locals__bar locals__bar--left"></div>
    </div>

    <a class="locals__icon locals__icon--close">
      <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <line stroke="#000000" stroke-width="2" x1="13.3" y1="36.7" x2="36.7" y2="13.3"/>
        <line stroke="#000000" stroke-width="2" x1="13.3" y1="13.3" x2="36.7" y2="36.7"/>
      </svg>
    </a>

    <div class="locals__wrapper">
      <ul class="locals__content"></ul>
    </div>
  `,

  didInitialize () {
    this.covers = this.collection.map((city, i) => {
      return new CoverView({ model: city, type: i % 4 });
    });
  },

  willRemove () {
    this.covers.forEach(cover => cover.remove());
  },

  in () {
    return new Promise((resolve, reject) => {
      this.$el.css('opacity', 0)
        .velocity({ opacity: 1 }, 1000);

      this.$('.locals__bar--top').css('right', '100%')
        .velocity({ right: 150 }, { duration: 2000 });

      this.$('.locals__bar--bottom').css('left', '100%')
        .velocity({ left: 150 }, { duration: 2000 });
      
      this.$('.locals__bar--left').css('bottom', '100%')
        .velocity({ bottom: 0 }, { duration: 1500 });

      this.$('.locals__bar--right').css('top', '100%')
        .velocity({ top: 0 }, { duration: 1500 });

      this.$('.locals__icon--close').css({ opacity: 0, top: 100 })
        .velocity({ top: 0, opacity: 1 }, { duration: 1000, delay: 500 });

      this.covers.forEach((cover, i) => {
        cover.in((i * 100) + 800);
      });

      resolve();
    });
  },

  didRender () {
    this.append(this.covers, '.locals__content');
  }
});
