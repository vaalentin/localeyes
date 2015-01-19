'use strict';

import Backbone from 'backbone';

export default Backbone.BetterView.extend({
  template: `
      <a href="#/locals" class="menu__icon menu__icon--bottomRight menu__icon--locals">
        <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
          <line stroke="#ffffff" stroke-width="1" x1="5.8" y1="10.2" x2="34.2" y2="10.2"/>
          <line stroke="#ffffff" stroke-width="1" x1="5.8" y1="20" x2="34.2" y2="20"/>
          <line stroke="#ffffff" stroke-width="1" x1="5.8" y1="29.8" x2="34.2" y2="29.8"/>
        </svg>
      </a>

      <a href="#/city/paris" class="menu__icon menu__icon--topRight menu__icon--map">
        <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
          <path fill="none"
            stroke="#ffffff"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M35.2,30.3L26.4 34.6 14.4 28.4 4.8 33.2 4.8 10.1 14.4 5.4 26.4 11.6 35.2 7.2 z"/>
          <line stroke="#ffffff" stroke-width="1" x1="14.4" y1="5.4" x2="14.4" y2="28.4"/>
          <line stroke="#ffffff" stroke-width="1" x1="26.4" y1="11.6" x2="26.4" y2="34.6"/>
        </svg>
      </a>

      <a href="#" class="menu__icon menu__icon--bottomLeft menu__icon--share">
        <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
          <path fill="none"
            stroke="#ffffff"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.2,22.9L3.1 17.2 36.9 3.1 22.8 36.9 z"/>
          <line stroke="#ffffff" stroke-width="1" x1="17.2" y1="22.9" x2="36.9" y2="3.1"/>
        </svg>
      </a>
      
      <a href="#/help" class="menu__icon menu__icon--topLeft menu__icon--help">
        <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
          <rect fill="#ffffff" x="18.5" y="16.1" width="3" height="15.2"/>
          <circle fill="#ffffff" cx="20" cy="10.8" r="2.2"/>
        </svg>
      </a>
  `,
});