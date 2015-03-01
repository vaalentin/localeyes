'use strict';

import _ from 'underscore';
import Backbone from 'backbone';

/**
 * Backbone BetterView
 *
 * Improved Backbone view
 * With auto template, helpers and lifecycle
 *
 * Lifecycle:
 * willInitialize: Right before the view is initialized
 * didInitialize: Right after the view is initialized
 * willRender: Right before the view is rendered
 * willRender: Right after the view is rendered
 * cache: Right after the view is rendered, cache DOM
 * willRemove: Right before the view is removed
 * didRemove: Right after the view is removed
 */
Backbone.BetterView = Backbone.View.extend({
  initialize () {
    if (this.willInitialize) {
      this.willInitialize.apply(this.arguments);
    }

    if (this.template) {
      this.template = _.template(this.template);
    }
    
    Backbone.View.prototype.initialize.apply(this, arguments);

    if (this.didInitialize) {
      this.didInitialize.apply(this, arguments);
    }
  },

  remove () {
    if (this.willRemove) {
      this.willRemove.apply(this, arguments);
    }

    Backbone.View.prototype.remove.apply(this, arguments);

    if (this.didRemove) {
      this.didRemove.apply(this, arguments);
    }
  },

  /**
   * Assign a view to el itself or to a specific element
   *
   * @method assign
   * @param {Backbone.View} [view] Single view
   * @param {String} [selector]
   */
  assign (view, selector) {
    if (!selector) {
      view.setElement(this.$el.render());
    }
    else {
      view.setElement(this.$(selector)).render()
    }
  },

  /**
   * Unassign the view
   *
   * @method unassign
   */
  unassign () {
    this.$el.empty().off();
    this.stopListening();
    return this;
  },

  /**
   * Append one or more views to el itself or to a specific element
   *
   * @method append
   * @param {Backbone.View} [views] Single view or array of views
   * @param {String} [selector]
   */
  append (views, selector) {
    if (!_.isArray(views)) {
      views = [views];
    }

    if (!selector) {
      views.forEach(view => this.$el.append(view.render().el));
    }
    else {
      views.forEach(view => this.$(selector).append(view.render().el));
    }
  },

  /**
   * Prepend a view to el itself or to a specific element
   *
   * @method prepend
   * @param {Backbone.View} [views] Single view or array of views
   * @param {String} [selector]
   */
  prepend (views, selector) {
    if (!_.isArray(views)) {
      views = [views];
    }

    if (!selector) {
      views.forEach(view => this.$el.prepend(view.render().el));
    }
    else {
      views.forEach(view => this.$(selector).prepend(view.render().el));
    }
  },

  render (data) {
    if (this.willRender) {
      this.willRender.apply(this, arguments);
    }

    if (!data) data = this.model? this.model.toJSON() : {};
    this.$el.html(this.template(data));

    // cache DOM elements
    if (this.els) {
      var cache = {};
      for (var name in this.els) {
        if (this.els.hasOwnProperty(name)) {
          cache[name] = this.$(this.els[name]);
        }
      }
      this.els = cache;
    }
    
    if (this.didRender) {
      setImmediate(() => {
        this.didRender.apply(this, arguments);
      });
    }

    return this;
  },
});