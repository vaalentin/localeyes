'use strict';

import _ from 'underscore';
import Backbone from 'backbone';

Backbone.BetterView = Backbone.View.extend({
  initialize () {
    this.template = _.template(this.template);
    if (this.onInitialize) this.onInitialize.apply(this, arguments);
    Backbone.View.prototype.initialize.apply(this, arguments);
  },

  remove () {
    if (this.onRemove) this.onRemove.apply(this, arguments);
    Backbone.View.prototype.remove.apply(this, arguments);
  },

  assign (view, selector) {
    if (!selector) view.setElement(this.$el.render());
    else view.setElement(this.$(selector)).render()
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
    if (!_.isArray(views)) views = [views];
    if (!selector) {
      views.forEach(view => this.$el.append(view.render().el));
    } else {
      views.forEach(view => this.$(selector).append(view.render().el));
    }
  },

  /**
   * @param {Backbone.View} [views] Single view or array of views
   * @param {String} [selector]
   */
  prepend (views, selector) {
    if (!_.isArray(views)) views = [views];
    if (!selector) {
      views.forEach(view => this.$el.prepend(view.render().el));
    } else {
      views.forEach(view => this.$(selector).prepend(view.render().el));
    }
  },

  render () {
    if (this.model) this.$el.html(this.template(this.model.toJSON()));
    else this.$el.html(this.template());
    if (this.onRender) this.onRender.apply(this, arguments);
    return this;
  },
});