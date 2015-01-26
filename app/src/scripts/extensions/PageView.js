'use strict';

import Backbone from 'backbone';

/**
 * Backbone PageView
 *
 * Animated view that can be passed to a ContentView
 */
Backbone.PageView = Backbone.BetterView.extend({
  /**
   * Name of the page
   */
  name: undefined,

  /**
   * Page in animation
   *
   * @method in
   */
  in () {
    this.$el.velocity('stop')
      .velocity({ opacity: 1}, { duration: 800 });
  },

  /**
   * Page out animation
   *
   * @method out
   * @param {Function} [done] Start the in animation of the potential next page.
   * @return {Promise} Resolve complete the animation, the view is then removed.
   */
  out (done) {
    return new Promise((resolve, reject) => {
      setTimeout(done, 400);
      this.$el.velocity('stop')
        .velocity({ opacity: 0 }, { duration: 800, complete: () => { resolve(); } });
    });
  }
});