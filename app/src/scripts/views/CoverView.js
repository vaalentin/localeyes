'use strict';

import _ from 'underscore';
import Backbone from 'backbone';

export default Backbone.BetterView.extend({
  className: 'cover',

  template: `
    <div class="cover__overlay"></div>
    <a href="#/city/<%= slug %>" class="cover__link">
      <div class="cover__title">
        <h1 class="cover__name"> <% print(name.toUpperCase()); %> </h1>
        <h2 class="cover__country"> <% print(country.toUpperCase()); %> </h2>
      </div>
    </a>
    <% if (cover) { %>
      <div class="cover__background"
        style="background-image:url(<%= cover %>)"></div>
    <% } %>
  `,

  events: {
    'mouseover': 'onMouseover',
    'mouseout': 'onMouseout'
  },

  onMouseover () {
    this.$('.cover__overlay').velocity('stop').velocity({ opacity: 0.6 }, 400);
    this.$('.cover__background').velocity('stop').velocity({ scale: 1.1 }, 400);
    this.$('.cover__name').velocity('stop').velocity({ opacity: 1, top: 0 }, 300);
    this.$('.cover__country').velocity('stop').velocity({ opacity: 1, top: 0 }, 200);
  },

  onMouseout () {
    this.$('.cover__overlay').velocity('stop').velocity({ opacity: 0 }, 400);
    this.$('.cover__background').velocity('stop').velocity({ scale: 1 }, 400);
    this.$('.cover__name').velocity('stop').velocity({ opacity: 0, top: -30 }, 300);
    this.$('.cover__country').velocity('stop').velocity({ opacity: 0, top: 30 }, 200);
  },

  in (delay) {
    return new Promise((resolve, reject) => {
      this.$el.velocity({ rotateX: 90, opacity: 0 }, 0)
        .velocity({ rotateX: 0, opacity: 1 }, {
          duration: 500,
          delay: delay || 0,
          complete: resolve,
          easing: 'ease-out'
        });
    });
  }
});
