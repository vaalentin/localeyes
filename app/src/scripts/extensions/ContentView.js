'use strict';

import Backbone from 'backbone';

/**
 * Backbone ContentView
 *
 * Page with a content area where PageView can be placed
 */
Backbone.ContentView = Backbone.PageView.extend({
  /**
   *  Selector for the content area
   */
  content: '',

  /**
   * Get the current active page
   *
   * @method getContent
   * @return {Backbone.PageView}
   */
  getContent () {
    return this.currentView || {};
  },

  /**
   * Change the content
   *
   * @method changeContent
   * @param {Backbone.PageView} [view] View to add
   */
  changeContent (view) {
    if (this.currentView && this.currentView.name === view.name) return false;

    var next = function () {
      this.prepend(view, this.content);
      this.currentView = view;
      view.in();
    }.bind(this);

    var previousView = this.currentView || null;

    if (previousView)
      previousView.out(next).then(() => previousView.remove());
    else
      next();
  },

  /**
   * Remove the content
   *
   * @method removeContent
   */
  removeContent () {
    if (!this.currentView) return false;

    this.currentView.out().then(() => {
      this.currentView.remove();
      this.currentView = null;
    });
  }
});