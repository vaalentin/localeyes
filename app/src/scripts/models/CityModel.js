'use strict';

import Backbone from 'backbone';

import slug from '../utils/slugUtil';

var CityModel = Backbone.Model.extend({
  defaults: {
    'name': '',
    'country': '',
    'background': undefined,
    'slug': undefined,
    'north': undefined,
    'east': undefined,
    'south': undefined,
    'west': undefined,
    'northSlug': undefined,
    'eastSlug': undefined,
    'southSlug': undefined,
    'westSlug': undefined,
    'local': undefined,
    'localSlug': undefined,
    'icon': []
  },

  initialize: function () {
    var attrs = {};

    if (!this.has('slug')) attrs.slug = slug(this.get('name'));
    if (!this.has('localSlug') && this.has('local')) attrs.localSlug = slug(this.get('local'));

    ['north', 'east', 'south', 'west'].forEach(direction => {
      if (this.has(direction) && !this.has(direction + 'Slug'))
        attrs[`${direction}Slug`] = slug(this.get(direction));
    });

    this.set(attrs);
  }
});

module.exports = CityModel;