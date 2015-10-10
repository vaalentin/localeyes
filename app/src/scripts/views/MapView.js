/* jshint curly: false */

'use strict';

import jQuery from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

export default Backbone.PageView.extend({
  name: 'map',
  className: 'map',

  template: `
    <div class="map__wrapper">
      <div class="map__dummy"></div>
      <div class="map__container">
        <div class="map__centerer"></div>
        <div class="map__content">
          <a class="map__icon map__icon--close">
            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <line stroke="#000000" stroke-width="2" x1="13.3" y1="36.7" x2="36.7" y2="13.3"/>
              <line stroke="#000000" stroke-width="2" x1="13.3" y1="13.3" x2="36.7" y2="36.7"/>
            </svg>
          </a>
          <div class="map__content__container"></div>
        </div>
      </div>
    </div>
  `,

  events: {
    'click .map__icon--close': 'onCloseClick'
  },

  didInitialize (options) {
    _.extend(this, _.pick(options, 'activeCity'));
  },

  onCloseClick (e) {
    this.trigger('close');
  },

  didRender () {
    jQuery.getScript('https://www.google.com/jsapi', () => {
      window.google.load('maps', '3', { other_params: 'sensor=false', callback: this.buildMap.bind(this) });
    });
  },

  buildMap () {
    const map = new window.google.maps.Map(this.$('.map__content__container')[0], { zoom: 4 });

    const geocoder = new window.google.maps.Geocoder();
    const markerBounds = new window.google.maps.LatLngBounds();

    const icon = new window.google.maps.MarkerImage('./app/public/images/map-marker.png', null, null, null, new window.google.maps.Size(22, 35));

    this.collection.each((city, i) => {
      const name = city.get('name');
      const country = city.get('country');
      const slug = city.get('slug');

      let coords = city.get('coords');
      const animation = slug === this.activeCity ? window.google.maps.Animation.BOUNCE : window.google.maps.Animation.DROP;

      if (coords) {
        coords = new google.maps.LatLng(coords.k, coords.D);
        markerBounds.extend(coords);
        map.fitBounds(markerBounds);

        const marker = new window.google.maps.Marker({
          map,
          icon,
          animation,
          position: coords,
          title: name
        });

        window.google.maps.event.addListener(marker, 'click', () => {
          this.trigger('marker:click', slug);
        });
      }

      // geocoder.geocode({ 'address': `${name}, ${country}` }, (results, status) => {
      //     if (!results || !results[0].geometry || !results[0].geometry.location) return false;

      //     const coords = results[0].geometry.location;
          // console.log(coords);

          // markerBounds.extend(coords);
          // map.fitBounds(markerBounds);

          // const marker = new window.google.maps.Marker({
          //   map,
          //   icon,
          //   animation,
          //   position: coords,
          //   title: name
          // });

          // window.google.maps.event.addListener(marker, 'click', () => {
          //   this.trigger('marker:click', slug);
          // });
        // });  
    });
  },

  in () {
    this.$el.velocity({ translateY: 200, opacity: 0 }, 0)
      .velocity({ translateY: 0, opacity: 1 }, { duration: 1200, easing: window.easings.Expo.easeOut });
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
  }
});