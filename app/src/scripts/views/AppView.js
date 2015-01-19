'use strict';

import Backbone from 'backbone';

import MenuView from './MenuView';

export default Backbone.ContentView.extend({
  content: '.app__content',
  
  template: `
    <div class="app">
      <div class="app__menu"></div>
      <div class="app__content"></div>
    </div>
  `,

  onInitialize () {
    this.menu = new MenuView();
    this.render();
  },

  render () {
    this.$el.html(this.template());
    this.assign(this.menu, '.app__menu');
    return this;
  }
});