'use strict';

import Backbone from 'backbone';

import CoverView from './CoverView';

export default Backbone.PageView.extend({
  className: 'locals',

  name: 'locals',

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

  onInitialize () {
    this.covers = this.collection.map((city, i) => {
      return new CoverView({ model: city, type: i % 4 });
    });
  },

  onRemove () {
    this.covers.forEach(cover => cover.remove());
  },

  render () {
    this.$el.html(this.template());
    this.append(this.covers, '.locals__content');
    return this;
  }
});