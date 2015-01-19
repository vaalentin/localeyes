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
    this.$('.city__square--topLeft').css({ top: '50%', left: '50%', opacity: 0 })
      .velocity({ left: 0, opacity: 1 }, { duration: 400, delay: 500 })
      .velocity({ top: 0 }, { duration: 400, delay: 200 });

    this.$('.city__square--topRight').css({ top: '50%', right: '50%', opacity: 0 })
      .velocity({ right: 0, opacity: 1 }, { duration: 400, delay: 500 })
      .velocity({ top: 0 }, { duration: 400, delay: 200 });

    this.$('.city__square--bottomLeft').css({ bottom: '50%', left: '50%', opacity: 0 })
      .velocity({ left: 0, opacity: 1 }, { duration: 400, delay: 500 })
      .velocity({ bottom: 0 }, { duration: 400, delay: 300 });

    this.$('.city__square--bottomRight').css({ bottom: '50%', right: '50%', opacity: 0 })
      .velocity({ right: 0, opacity: 1 }, { duration: 400, delay: 500 })
      .velocity({ bottom: 0 }, { duration: 400, delay: 300 });

    this.$('.city__name').css({ opacity: 0, top: -90 })
      .velocity({ opacity: 1, top: 0 }, { duration: 500, delay: 1100 });

    this.$('.city__country').css({ opacity: 0, top: 50 })
      .velocity({ opacity: 1, top: 0 }, { duration: 500, delay: 1200 });

    this.$('.city__icon').css({ top: -150 })
      .velocity({ top: -90 }, { duration: 1500, delay: 500 });

    this.$('.city__button').css({ opacity: 0, top: 50 })
      .velocity({ opacity: 1, top: 0 }, { duration: 500, delay: 1400 });

    this.$('.city__border--top, .city__border--bottom').css('width', 0)
      .velocity({ width: '100%' }, { duration: 1000, delay: 1400, display: 'block' });

    this.$('.city__border--left, .city__border--right').css('height', 0)
      .velocity({ height: '100%' }, { duration: 1000, delay: 1400, display: 'block' });

    this.$('.city__background').velocity({ scale: 1.2 }, 0).velocity({ scale: 1 }, 1500);

    this.$('svg').each(function () {
      jQuery('path', this).each(function () {
        var $path = jQuery(this);
        var length = $path[0].getTotalLength();

        $path.velocity({
            'stroke-dashoffset': length,
            'stroke-dasharray': length + ',' + length,
            fillOpacity: 0,
            strokeOpacity: 1
          }, 0)
          .velocity({ 'stroke-dashoffset': 0 }, { duration: 2000, delay: 500 })
          .velocity({ fillOpacity: 1 }, { duration: 500, delay: 2000, queue: false });
      });
    });
  },

  out () {
    this.$('.city__background').velocity({ scale: 1.2 }, 0);
  },

  render () {
    this.$el.html(this.template(this.model.toJSON()));
    this.setPosition();
    return this;
  }
});