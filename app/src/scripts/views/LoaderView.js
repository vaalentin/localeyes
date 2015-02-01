'use strict';

import Backbone from 'backbone';

export default Backbone.PageView.extend({
  name: 'loader',

  out () {
    this.$el
      .velocity('stop')
      .velocity({ opacity: 0 }, { duration: 2000, complete: this.remove.bind(this) });
  }
});