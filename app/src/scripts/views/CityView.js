'use strict';

import Backbone from 'backbone';

export default Backbone.BetterView.extend({
  className: 'city',

  template: `
    <div class="city__content">
      <div class="city__content__section">
        <div class="city__title">
          <div class="city__icon">
            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
              <% _.each(paths, function(path) { %>
              <path fill="#ffffff"
                stroke="#ffffff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="<%= path %>"/>
              <% }); %>
            </svg>
          </div>
          <h1 class="city__name"> <% print(name.toUpperCase()); %> </h1>
          <h2 class="city__country"> <% print(country.toUpperCase()); %> </h2>
          <div class="city__square city__square--topLeft"></div>
          <div class="city__square city__square--topRight"></div>
          <div class="city__square city__square--bottomLeft"></div>
          <div class="city__square city__square--bottomRight"></div>
        </div>
      </div>
      <% if (localSlug) { %>
      <div class="city__content__section city__content__section--button">
        <div class="city__button">
          <a href="#/local/<%= localSlug %>" class="city__link">
            DÉCOUVRIR <% print(local.toUpperCase()); %>
          </a>
          <div class="city__border city__border--top"></div>
          <div class="city__border city__border--left"></div>
          <div class="city__border city__border--bottom"></div>
          <div class="city__border city__border--right"></div>
        </div>
      </div>
      <% } %>
    </div>
    <% if (background) { %>
      <div class="city__background"
        style="background-image:url(<%= background %>)"></div>
    <% } %>
  `,

  onInitialize (options) {
    this.position = options.position;
  },

  setPosition () {
    this.$el.css({
      left: (this.position.left * 100) + '%',
      top: (this.position.top * 100) + '%'
    });
  },

  in () {
    
  },

  out () {
    
  },

  render () {
    this.$el.html(this.template(this.model.toJSON()));
    this.setPosition();
    return this;
  }
});