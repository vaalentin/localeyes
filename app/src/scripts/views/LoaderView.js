'use strict';

import Backbone from 'backbone';

export default Backbone.PageView.extend({
  name: 'loader',

  didInitialize () {
    this.$el.velocity('stop').velocity({ opacity: 0 }, 2000);
  }
});