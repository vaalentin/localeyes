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
              <% _.each(icon, function(el) { %>
              <path fill="#ffffff"
                stroke="#ffffff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="<%= el.path %>"
                <% if (el.length) { %>
                data-length="<%= el.length %>"
                <% } %>
                />
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

  didInitialize (options) {
    _.extend(this, _.pick(options, 'position'));
  },

  setPosition () {
    this.$el.css({
      left: (this.position.left * 100) + '%',
      top: (this.position.top * 100) + '%'
    });
  },

  in () {
    this.$el.css('z-index', 2);

    this.$squareTopLeft.velocity('stop')
      .velocity({ left: 0, opacity: 1 }, { duration: 400, delay: 500 })
      .velocity({ top: 0 }, { duration: 400, delay: 200 });

    this.$squareTopRight.velocity('stop')
      .velocity({ right: 0, opacity: 1 }, { duration: 400, delay: 500 })
      .velocity({ top: 0 }, { duration: 400, delay: 200 });

    this.$squareBottomLeft.velocity('stop')
      .velocity({ left: 0, opacity: 1 }, { duration: 400, delay: 500 })
      .velocity({ bottom: 0 }, { duration: 400, delay: 300 });

    this.$squareBottomRight.velocity('stop')
      .velocity({ right: 0, opacity: 1 }, { duration: 400, delay: 500 })
      .velocity({ bottom: 0 }, { duration: 400, delay: 300 });

    this.$name.velocity('stop')
      .velocity({ opacity: 1, top: 0 }, { duration: 500, delay: 1100 });

    this.$country.velocity('stop')
      .velocity({ opacity: 1, top: 0 }, { duration: 500, delay: 1200 });

    this.$icon.velocity('stop')
      .velocity({ top: -90, opacity: 1 }, { duration: 1500, delay: 500 });

    this.$button.velocity('stop')
      .velocity({ opacity: 1, top: 0 }, { duration: 500, delay: 1400 });

    this.$bordersTopBottom.velocity('stop')
      .velocity({ width: '100%' }, { duration: 1000, delay: 1400, display: 'block' });

    this.$bordersLeftRight.velocity('stop')
      .velocity({ height: '100%' }, { duration: 1000, delay: 1400, display: 'block' });

    this.$background.velocity('stop')
      .velocity({ scale: 1.2 }, 0).velocity({ scale: 1 }, 2500);

    this.$svgs.each(function () {
      jQuery('path', this).each(function () {
        var $path = jQuery(this);
        var data = $path.attr('data-length');
        
        var length;
        if (data) {
          length = parseFloat(data);
        } else {
          length = $path[0].getTotalLength();
          $path.attr('data-length', length);
        }

        $path.velocity('stop').velocity({
            'stroke-dashoffset': length,
            'stroke-dasharray': `${length},${length}`,
            fillOpacity: 0,
            strokeOpacity: 1
          }, 0)
          .velocity({ 'stroke-dashoffset': 0 }, { duration: 2000, delay: 500 })
          .velocity({ fillOpacity: 1 }, { duration: 500, delay: 2000, queue: false });
      });
    });
  },

  out () {
    this.$el.css('z-index', 1);
    this.$squareTopLeft.velocity('stop').css({ top: '50%', left: '50%', opacity: 0 });
    this.$squareTopRight.velocity('stop').css({ top: '50%', right: '50%', opacity: 0 });
    this.$squareBottomLeft.velocity('stop').css({ bottom: '50%', left: '50%', opacity: 0 })
    this.$squareBottomRight.velocity('stop').css({ bottom: '50%', right: '50%', opacity: 0 })
    this.$name.velocity('stop').css({ opacity: 0, top: -90 })
    this.$country.velocity('stop').css({ opacity: 0, top: 50 })
    this.$icon.velocity('stop').css({ top: -150, opacity: 0 })
    this.$button.velocity('stop').css({ opacity: 0, top: 50 })
    this.$bordersTopBottom.velocity('stop').css('width', 0)
    this.$bordersLeftRight.velocity('stop').css('height', 0)
    this.$background.velocity('stop').velocity({ scale: 1.2 }, 0);
    this.$svgs.each(function () {
      jQuery('path', this).each(function () {
        var $path = jQuery(this);
        var data = $path.attr('data-length');
        
        var length;
        if (data) {
          length = parseFloat(data);
        } else {
          length = $path[0].getTotalLength();
          $path.attr('data-length', length);
        }

        $path.velocity('stop')
          .velocity({
          'stroke-dashoffset': length,
          'stroke-dasharray': `${length},${length}`,
          fillOpacity: 0,
          strokeOpacity: 1
        }, 0);
      });
    });
  },

  didRender () {
    this.setPosition();

    this.$squareTopLeft = this.$('.city__square--topLeft');
    this.$squareTopRight = this.$('.city__square--topRight');
    this.$squareBottomLeft = this.$('.city__square--bottomLeft');
    this.$squareBottomRight = this.$('.city__square--bottomRight');
    this.$name = this.$('.city__name');
    this.$country = this.$('.city__country');
    this.$icon = this.$('.city__icon');
    this.$button = this.$('.city__button');
    this.$bordersTopBottom = this.$('.city__border--top, .city__border--bottom');
    this.$bordersLeftRight = this.$('.city__border--left, .city__border--right');
    this.$background = this.$('.city__background');
    this.$svgs = this.$('svg');
    return this;
  }
});