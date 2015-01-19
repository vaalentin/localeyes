'use strict';

import Backbone from 'backbone';

Backbone.ContentView = Backbone.PageView.extend({
  content: '',

  getContent () {
    return this.currentView || {};
  },

  /**
   * @param {Backbone.PageView} [view]
   */
  changeContent (view) {
    if (this.currentView && this.currentView.name === view.name) return false;

    var next = function () {
      this.prepend(view, this.content);
      this.currentView = view;
      view.in();
    }.bind(this);

    var previousView = this.currentView || null;

    if (previousView) {
      previousView.out(next).then(() => previousView.remove());
    } else {
      next();
    }
  }
});