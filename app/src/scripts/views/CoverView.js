'use strict';

import _ from 'underscore';
import Backbone from 'backbone';

export default Backbone.BetterView.extend({
  className: 'cover',

  template: `
    <div class="cover__overlay"></div>
    <a href="#/local/<%= localSlug %>" class="cover__link">
      <div class="cover__title">
        <h1 class="cover__name"> <% print(name.toUpperCase()); %> </h1>
        <h2 class="city__country"> <% print(country.toUpperCase()); %> </h2>
      </div>
    </a>
    <% if (cover) { %>
      <div class="cover__background"
        style="background-image:url(<%= cover %>)"></div>
    <% } %>
  `,

  onInitialize (options) {
    _.extend(this, _.pick(options, 'type'));
  },

  onRender () {
    this.$el.addClass(`cover cover--type${this.type}`);
  }
});
