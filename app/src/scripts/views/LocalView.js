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
    <div id='skrollr-body'>
      <% if (video) { %>
        <div class="local__video">
          <div class='local__arrow local__arrow--down'>
            <% if (language === 'en') { %>
              <p>TO DISCOVER THE PICTURES</p>
            <% } else { %>
              <p>POUR DÉCOUVRIR LES PHOTOS</p>
            <% } %>
            <div class="icon"></div>
          </div>
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
              </div>
            <% }); %>
          </div>
        </div>
      <% } %>
      
      <div class='local__content'></div>

      <div class='local__arrow local__arrow--up'></div>

      <div class='local__video--bonus'>
        <div class='local__video__text'>
          <% if (language === 'en') { %>
            <p>WE DID THE SAME EXPERIENCE IN PARIS AND ASKED EACH LOCAL TO CHOOSE ONE RANDOM PICTURE AND TO KEEP IT AS A SOUVENIR</p>
          <% } else { %>
            <p>NOUS AVONS RÉALISÉ LA MÊME EXPÉRIENCE À PARIS ET AVONS DEMANDÉ À CHAQUE PARTICIPANT DE CHOISIR UNE PHOTO AU HASARD ET DE LA GARDER EN SOUVENIR</p>
          <% } %>
        </div>
      </div>

      <% if (language === 'en') { %>
        <a href='#city/<%= citySlug %>/en' class='local__next'> BACK TO <%= cityName.toUpperCase() %> </a>
      <% } else { %>
        <a href='#city/<%= citySlug %>' class='local__next'> RETOURNER À <%= cityName.toUpperCase() %> </a>
      <% } %>
    </div>
  `,

  // 1 zoom
  // 2-3 curtains
  // 4 translate left
  // 5 normal
  blocksTemplates: {
    1: _.template(`
      <div class='local__block local__block--type3'>
        <div class='local__column local__column--mask'>
          <img class='local__image' src='<%= urls[0] %>'
            data-bottom-top='transform:scale(1.5);'
            data-center-bottom='transform:scale(1);'
            >
        </div>
      </div>
    `),

    2: _.template(`
      <div class='local__block local__block--type2'>
        <div class='local__column local__column--half local__column--left'>
          <div class='local__column__content'>
            <img class='local__image' src='<%= urls[0] %>'
              data-bottom-top='left:-100%;opacity:0;'
              data-center-center='left:0%;opacity:1;'
              >
          </div>
        </div>
        <div class='local__column local__column--half local__column--right'>
          <div class='local__column__content'>
            <img class='local__image' src='<%= urls[1] %>'
              data-bottom-top='left:100%;opacity:0;'
              data-center-center='left:0%;opacity:1;'
              >
          </div>
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
      <div class='local__block local__block--type1'>
        <img class='local__image' src='<%= urls[0] %>'>
      </div>
    `)
  },

  events: {
    'click .local__marker__link': 'onMarkerClick',
    'click .local__arrow--down': 'scrollDown',
    'click .local__arrow--up': 'scrollUp'
  },

  didInitialize (options) {
    Backbone.trigger('loader:in');

    _.extend(this, _.pick(options, 'language'));

    this.$win = jQuery(window); // keep track of the scrollTop to restore it on out
    this.$win.on('scroll', this.onScroll.bind(this));

    this.city = Store.getCities().findWhere({ localSlug: this.model.get('slug') });
    if (this.model.has('video')) {
      const video = this.model.get('video');
      
      let id;
      if (this.language === 'en') {
        id = video.idEn ? video.idEn : video.id;
      }
      else {
        id = video.id;
      }
      
      this.video = new ResponsiveVideo({ videoId: id, autoplay: 1 });
      this.listenTo(this.video, 'ready', this.markersIn);
    }

    if (this.model.has('bonus')) {
      let bonusId;
      if (this.language === 'en') {
        bonusId = this.model.has('videoEn') ? this.model.get('bonus') : this.model.get('bonus');
      }
      else {
        bonusId = this.model.get('bonus');
      }

      this.bonusVideo = new ResponsiveVideo({ videoId: bonusId, autoplay: 0 });
    }

    this.arrowHidden = true;
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

  scrollDown () {
    this.$('.local__content').velocity('scroll', { duration: 1000 });
  },

  scrollUp () {
    this.$('.local__video').velocity('scroll', { duration: 1000 });
  },

  onScroll (e) {
    const scrollTop = this.$win.scrollTop();
    this.scrollTop = scrollTop;
    
    if (scrollTop > 200 && this.arrowHidden) {
      this.showArrow();
      this.arrowHidden = false;
    }
    else if (scrollTop <= 200 && !this.arrowHidden) {
      this.hideArrow();
      this.arrowHidden = true;
    }
  },

  showArrow () {
    this.$('.local__arrow--up').velocity('stop')
      .velocity({ opacity: 1 }, 500);
  },

  hideArrow () {
    this.$('.local__arrow--up').velocity('stop')
      .velocity({ opacity: 0 }, 500);
  },

  onLoad () {
    this.loaded = true;
    setImmediate(() => {
      this.skrollr = skrollr.init({ forceHeight: false });
    });
    Backbone.trigger('loader:out');
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
      cityName: this.city.get('name'),
      citySlug: this.city.get('slug')
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

    if (this.bonusVideo) {
      this.append(this.bonusVideo, '.local__video--bonus');
    }
  },
});