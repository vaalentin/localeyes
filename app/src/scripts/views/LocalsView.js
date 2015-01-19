'use strict';

import Backbone from 'backbone';

import CoverView from './CoverView';

export default Backbone.PageView.extend({
  className: 'locals',

  name: 'locals',

  template: `
    <a class="locals__icon locals__icon--close">
      <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <line stroke="#000000" stroke-width="2" x1="13.3" y1="36.7" x2="36.7" y2="13.3"/>
        <line stroke="#000000" stroke-width="2" x1="13.3" y1="13.3" x2="36.7" y2="36.7"/>
      </svg>
    </a>
    <ul class="locals__content"></ul>
  `,

  onInitialize () {
    this.covers = this.collection.map(city => {
      return new CoverView({ model: city });
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