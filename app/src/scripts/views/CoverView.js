'use strict';

import Backbone from 'backbone';

export default Backbone.BetterView.extend({
  className: 'cover',

  template: `
    <div class="cover__overlay"></div>
    <a href="#/local/<%= localSlug %>" class="cover__link">
      <h1 class="cover__text">
        <% print(name.toUpperCase()); %>
      </h1>
    </a>
    <% if (cover) { %>
      <div class="cover__background"
        style="background-image:url(<%= cover %>)"></div>
    <% } %>
  `
});