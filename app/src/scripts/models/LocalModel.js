'use strict';

import Backbone from 'backbone';

import slug from '../utils/slugUtil';

export default Backbone.Model.extend({
  defaults: {
    name: undefined,
    slug: undefined,
    video: undefined,
    images: []
  },

  initialize: function () {
    if (!this.has('slug')) {
      this.set({ slug: slug(this.get('name')) });
    }
  },

  validate (attrs, options) {
    if (!attrs.name) {
      return 'Local must have a name.';
    }
  }
});