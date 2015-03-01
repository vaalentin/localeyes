/* jshint curly: false */

'use strict';

import jQuery from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import skrollr from 'skrollr';

import Store from '../modules/StoreModule';
import Loader from '../modules/Loader';

import { ResponsiveVideo } from './VideoView';

export default Backbone.PageView.extend({
  name: 'local',
  className: 'local',

  template: `
    <% if (video) { %>
      <div class="local__video">
        <div class='local__video__overlay'>
          <% if (video.markers) _.each(video.markers, function (marker) { %>
            <div class='local__marker'
              style='left:<%= marker.position.x || 0 %>;top:<%= marker.position.y || 0 %>'>
              <% if (marker.text) { %>
                <a class="local__marker__link" data-time='<%= marker.time || 0 %>'>
                  <% if (_.isString(marker.text)) { %>
                    <%= marker.text.toUpperCase() %>
                  <% } else { %>
                    <% if (language === 'en') { %>
                      <%= marker.text.en.toUpperCase() %>
                    <% } else { %>
                      <%= marker.text.fr.toUpperCase() %>
                    <% } %>
                  <% } %>
                </a>
              <% } %>
              <div class="local__marker__icon">
                <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 30 48">
                  <path stroke='none'
                    fill='#fff'
                    d='M15,0C6.7,0,0,7.4,0,16.6c0,2.9,0.7,5.6,1.8,7.9c0,0.2,11.7,22.6,11.7,22.6c0.3,0.6,0.8,0.9,1.4,0.9c0.6,0,1.1-0.4,1.4-0.9  c0,0,11.7-22.4,11.7-22.6c1.2-2.4,1.8-5.1,1.8-7.9C30,7.4,23.3,0,15,0 M15,23.2c-4.1,0-7.5-3.3-7.5-7.4s3.4-7.4,7.5-7.4  c4.1,0,7.5,3.3,7.5,7.4C22.5,19.9,19.1,23.2,15,23.2'/>
                </svg>
              </div>
            </div>
          <% }); %>
        </div>
      </div>
    <% } %>
    
    <div class='local__content'  id='skrollr-body'></div>
    <% if (language === 'en') { %>
      <a href='#city/<%= citySlug %>/en' class='local__next' style='background-image:url(<%= cityBackground %>);'></a>
    <% } else { %>
      <a href='#city/<%= citySlug %>' class='local__next' style='background-image:url(<%= cityBackground %>);'></a>
    <% } %>
  `,

  blocksTemplates: {
    1: _.template(`
      <div class='local__block local__block--type1'>
        <img class='local__image' src='<%= urls[0] %>'>
      </div>
    `),

    2: _.template(`
      <div class='local__block local__block--type2'>
        <div class='local__column local__column--half local__column--left'>
          <div class='local__column__content'>
            <img class='local__image' src='<%= urls[0] %>'
              data-bottom-top='left:-100%;opacity:0;'
              data-center-center='left:0%;opacity:1;top:0px;'
              data-top-bottom='top:50px;'
              >
          </div>
        </div>
        <div class='local__column local__column--half local__column--right'>
          <div class='local__column__content'>
            <img class='local__image' src='<%= urls[1] %>'
              data-bottom-top='left:100%;opacity:0;;'
              data-center-center='left:0%;opacity:1;top:0px'
              data-top-bottom='top:-20px;'
              >
          </div>
        </div>
      </div>
    `),

    3: _.template(`
      <div class='local__block local__block--type3'>
        <div class='local__column local__column--mask'>
          <img class='local__image' src='<%= urls[0] %>'
            data-bottom-top='transform:scale(1.5);'
            data-center-bottom='transform:scale(1);'
            >
        </div>
      </div>
    `),

    4: _.template(`
      <div class='local__block local__block--type4'>
        <img class='local__image' src='<%= urls[0] %>'
          data-bottom-top='left:-100%;opacity:0;'
          data-center-center='left:0;opacity:1;'
          >
      </div>
    `),

    5: _.template(`
      <div class='local__block local__block--type5'>
        <img class='local__image' src='<%= urls[0] %>'
          data-bottom-top='left:100%;opacity:0;'
          data-center-center='left:0;opacity:1;'
          >
      </div>
    `),

    6: _.template(`
      <div class='local__block local__block--type6'>
        <img class='local__image' src='<%= urls[0] %>'
          data-bottom-top='top:300px;opacity:0;'
          data-center-center='top:0px;opacity:1;'
          >
      </div>
    `),
  },

  events: {
    'click .local__marker__link': 'onMarkerClick'
  },

  didInitialize (options) {
    _.extend(this, _.pick(options, 'language'));

    this.$win = jQuery(window); // keep track of the scrollTop to restore it on out
    this.$win.on('scroll', this.onScroll.bind(this));

    this.city = Store.getCities().findWhere({ localSlug: this.model.get('slug') });
    if (this.model.has('video')) {
      this.video = new ResponsiveVideo({ videoId: this.model.get('video').id, autoplay: 0 });
      this.listenTo(this.video, 'ready', this.markersIn);
    }
  },

  willRemove () {
    if (this.video) this.video.remove();
    this.$win.off('scroll', this.onScroll);
    skrollr.init().destroy();
  },

  in () {
    if (!this.loaded) return false;
    this.$el.velocity({ opacity: 1 }, 1500);
  },

  out (done) {
    jQuery('html,body').scrollTop(this.scrollTop);
    
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
    setImmediate(() => {
      this.skrollr = skrollr.init({ forceHeight: false });
    });
    this.in();
  },

  renderBlocks () {
    return this.model.get('images').reduce((out, image) => {
      return out += this.blocksTemplates[image.type](image);
    }, '');
  },

  render () {
    const data = _.extend(this.model.toJSON(), {
      language: this.language,
      citySlug: this.city.get('slug'),
      cityBackground: this.city.get('background')
    });

    this.$el.html(this.template(data));
    this.$('.local__content').html(this.renderBlocks());
    setImmediate(this.didRender.bind(this));
    return this;
  },

  onMarkerClick (e) {
    if (!this.video) return false;

    const time = jQuery(e.currentTarget).attr('data-time') || 0;
    this.video.goTo(time);
  },

  markersIn () {
    this.$('.local__marker').each((i, el) => {
      jQuery(el)
        .velocity({ translateY: 50, opacity: 0 }, 0)
        .velocity({ translateY: 0, opacity: 1 }, { duration: 500, delay: (i * 200) + 600 });
    });
  },

  didRender () {
    const images = this.model.get('images').reduce((out, image) => {
      return out.concat(image.urls || []);
    }, []);

    this.loaded = false;
    this.loader = new Loader(images);
    this.loader.load().then(this.onLoad.bind(this));

    if (this.video) {
      this.append(this.video, '.local__video');
    }
  },
});