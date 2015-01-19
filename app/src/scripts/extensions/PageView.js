'use strict';

import Backbone from 'backbone';

Backbone.PageView = Backbone.BetterView.extend({
  name: undefined,

  in () {
    return new Promise((resolve, reject) => {
      this.$el.css('opacity', 0)
        .velocity('stop')
        .velocity({ opacity: 1}, { duration: 800, complete: resolve });
    });
  },

  /**
   * done start the in animation of the potential next page
   * resolve complete this page out animation (the view is removed)
   *
   * @param {Function} [done]
   * @return {Promise}
   */
  out (done) {
    return new Promise((resolve, reject) => {
      setTimeout(done, 400);
      this.$el.velocity('stop')
        .velocity({ opacity: 0 }, { duration: 800, complete: () => {
            resolve();
          }
        });
    });
  }
});