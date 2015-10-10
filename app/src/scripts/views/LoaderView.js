'use strict';

import Backbone from 'backbone';

export default Backbone.PageView.extend({
  name: 'loader',

  in () {
    this.$el.css('display', 'block')
      .velocity('stop')
      .velocity({ opacity: 1 }, { duration: 1000 });
  },

  out () {
    this.$el.velocity('stop')
      .velocity({ opacity: 0 }, { duration: 1000, complete: () => {
        this.$el.css('display', 'none');
      }});
  }
});