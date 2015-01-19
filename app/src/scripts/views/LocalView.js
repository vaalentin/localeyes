'use strict';

import Backbone from 'backbone';

export default Backbone.PageView.extend({
  className: 'local',

  name: 'local',

  template: `
    <h1 class="local__name"> Local: <%= name %> </h1>
    <p class="local__bio"> <%= bio %> </p>
  `
});