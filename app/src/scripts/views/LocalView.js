'use strict';

import jQuery from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Store from '../modules/StoreModule';
import Loader from '../modules/Loader';

export default Backbone.PageView.extend({
  className: 'local',

  name: 'local',

  template: `
    <div class="local__content"></div>
    <div class="local__next" style="background-image:url(<%= cityBackground %>);"></div>
  `,

  blocksTemplates: {
    1: _.template(`
      <div class="local__block local__block--type1">
        <img class="local__image" src="<%= urls[0] %>">
      </div>
    `),

    2: _.template(`
      <div class="local__block local__block--type2">
        <div class="local__column local__column--half local__column--left">
          <div class="local__column__content">
            <img class="local__image" src="<%= urls[0] %>"
              data-bottom-top="left:-100%;opacity:0;"
              data-center-center="left:0%;opacity:1;top:0px;"
              data-top-bottom="top:50px;"
              >
          </div>
        </div>
        <div class="local__column local__column--half local__column--right">
          <div class="local__column__content">
            <img class="local__image" src="<%= urls[1] %>"
              data-bottom-top="left:100%;opacity:0;;"
              data-center-center="left:0%;opacity:1;top:0px"
              data-top-bottom="top:-20px;"
              >
          </div>
        </div>
      </div>
    `),

    3: _.template(`
      <div class="local__block local__block--type3">
        <div class="local__column local__column--mask">
          <img class="local__image" src="<%= urls[0] %>"
            data-bottom-top="transform:scale(1.5);"
            data-center-bottom="transform:scale(1);"
            >
        </div>
      </div>
    `)
  },

  didInitialize () {
    this.$win = jQuery(window); // keep track of the scrollTop to restore it on out
    this.$win.on('scroll', this.onScroll.bind(this));

    this.city = Store.getCities().findWhere({ localSlug: this.model.get('slug') });
  },

  willRemove () {
    this.$win.off('scroll', this.onScroll);

  in () {
    if (!this.loaded) return false;
    Backbone.PageView.prototype.in.call(this);
  },

  out (done) {
    this.$win.scrollTop(this.scrollTop);
    
    return new Promise((resolve, reject) => {
      setTimeout(done, 400);
      this.$el.velocity('stop')
        .velocity({ opacity: 0 }, { duration: 800, complete: () => { resolve(); } });
    });
  },

  onScroll (e) {
    this.scrollTop = this.$win.scrollTop();
  },

  onLoad () {
    this.loaded = true;
    this.in();
  },

  renderBlocks () {
    var string = '';

    this.model.get('images').forEach(image => {
      string += this.blocksTemplates[image.type](image);
    });

    return string;
  },

  render () {
    this.$el.html(this.template({ cityBackground: this.city.get('background')}));
    this.$('.local__content').html(this.renderBlocks());
    this.didRender();
    return this;
  },

  didRender () {
    var images = [];
    this.model.get('images').forEach(image => {
      image.urls.forEach(url => images.push(url));
    });

    this.loaded = false;
    this.loader = new Loader(images);
    this.loader.load().then(this.onLoad.bind(this));
  },
});