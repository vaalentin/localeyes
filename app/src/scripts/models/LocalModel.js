'use strict';

import Backbone from 'backbone';

import slug from '../utils/slugUtil';

export default Backbone.Model.extend({
  defaults: {
    'name': undefined,
    'slug': undefined,
    'bio': undefined
  },

  initialize: function () {
    if (!this.has('slug')) this.set({ slug: slug(this.get('name')) });
  }
});