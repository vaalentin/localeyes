'use strict';

import jQuery from 'jquery';
import Backbone from 'backbone';

export default Backbone.PageView.extend({
  name: 'map',
  className: 'map',

  template: `
    <div class="map__wrapper">
      <div class="map__dummy"></div>
      <div class="map__container">
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

  onCloseClick (e) {
    this.trigger('close');
  },

  didRender () {
    jQuery.ajaxSetup({ cache: true });
    jQuery.getScript('https://www.google.com/jsapi', () => {
      window.google.load('maps', '3', { other_params: 'sensor=false', callback: this.buildMap.bind(this) });
    });
  },

  buildMap () {
    var mapOptions = {
      zoom: 4,
      styles: [
        {
          'featureType': 'water',
          'stylers': [
            { 'color': '#ffffff' }
          ]
        },
        {
          'featureType': 'landscape',
          'stylers': [
            { 'saturation': -100 },
            { 'color': '#424242' }
          ]
        },
        {
          'featureType': 'road.highway',
          'stylers': [
            { 'saturation': -100 },
            { 'lightness': -74 }
          ]
        },
        {
          'featureType': 'water',
          'stylers': [
            { 'color': '#969696' }
          ]
        },
        {
          'featureType': 'road.arterial',
          'stylers': [
            { 'visibility': 'off' }
          ]
        },
        {
          'featureType': 'poi',
          'stylers': [
            { 'saturation': -100 },
            { 'lightness': -54 }
          ]
        }
      ]
    };

    var map = new google.maps.Map(this.$('.map__content__container')[0], mapOptions);

    var geocoder = new google.maps.Geocoder();
    var markerBounds = new google.maps.LatLngBounds();

    var icon = new google.maps.MarkerImage('../app/public/images/map-marker.png', null, null, null, new google.maps.Size(22, 35));

    this.collection.each((city, i) => {
      var name = city.get('name');
      var country = city.get('country');
      var slug = city.get('slug');

      geocoder.geocode({ 'address': `${name}, ${country}` }, (results, status) => {
        var coords = results[0].geometry.location;

        if (!coords) return false;

        markerBounds.extend(coords);
        map.fitBounds(markerBounds);

        setTimeout(() => {  
          var marker = new google.maps.Marker({
            position: coords,
            map: map,
            title: name,
            animation: google.maps.Animation.DROP,
            icon: icon
          });

          google.maps.event.addListener(marker, 'click', () => {
            this.trigger('marker:click', slug);
          });
        }, i * 300);
      });
    });
  }
});