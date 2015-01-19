'use strict';

import Backbone from 'backbone';

export default Backbone.PageView.extend({
  className: 'loader',

  name: 'loader',
  
  template: `
    <h1> Loader </h1>
    <div class="loader__text"></div>
    <div class="loader__progress"></div>
  `
});