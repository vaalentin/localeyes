'use strict';

import _ from 'underscore';
import Backbone from 'backbone';

Backbone.BetterView = Backbone.View.extend({
  initialize () {
    if (this.willInitialize)
      this.willInitialize.apply(this.arguments);

    this.template = _.template(this.template);
    Backbone.View.prototype.initialize.apply(this, arguments);

    if (this.didInitialize)
      this.didInitialize.apply(this, arguments);
  },

  remove () {
    if (this.willRemove)
      this.willRemove.apply(this, arguments);

    Backbone.View.prototype.remove.apply(this, arguments);

    if (this.didRemove)
      this.didRemove.apply(this, arguments);
  },

  assign (view, selector) {
    if (!selector)
      view.setElement(this.$el.render());
    else
      view.setElement(this.$(selector)).render()
  },

  unassign () {
    this.$el.empty().off();
    this.stopListening();
    return this;
  },

  /**
   * @param {Backbone.View} [views] Single view or array of views
   * @param {String} [selector]
   */
  append (views, selector) {
    if (!_.isArray(views))
      views = [views];

    if (!selector)
      views.forEach(view => this.$el.append(view.render().el));
    else
      views.forEach(view => this.$(selector).append(view.render().el));
  },

  /**
   * @param {Backbone.View} [views] Single view or array of views
   * @param {String} [selector]
   */
  prepend (views, selector) {
    if (!_.isArray(views))
      views = [views];

    if (!selector)
      views.forEach(view => this.$el.prepend(view.render().el));
    else
      views.forEach(view => this.$(selector).prepend(view.render().el));
  },

  render () {
    if (this.willRender)
      this.willRender.apply(this, arguments);

    if (this.model)
      this.$el.html(this.template(this.model.toJSON()));
    else
      this.$el.html(this.template());

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
    
    if (this.didRender)
      this.didRender.apply(this, arguments);

    return this;
  },
});