'use strict';

import _ from 'underscore';
import Backbone from 'backbone';

export default Backbone.Model.extend({
  /**
   * @param {Object} [options]
   * @param {Backbone.Collection} [options.collection] CityModel
   */
  initialize (options) {
    Backbone.Model.prototype.initialize.call(this);
    _.extend(this, _.pick(options, 'collection'));
    this.build();
  },

  build () {
    var map = {};

    var collection = this.collection;
    var models = this.collection.models.slice(0);

    var directions = [
      { name: 'north', left: 0, top: -1 },
      { name: 'east', left: 1, top: 0 },
      { name: 'south', left: 0, top: 1 },
      { name: 'west', left: -1, top: 0 }
    ];

    function processParent (model, position) {
      var slug = model.get('slug');

      var data = {};

      data.position = position;

      data.directions = {
        north: model.get('northSlug'),
        east: model.get('eastSlug'),
        south: model.get('southSlug'),
        west: model.get('westSlug')
      };

      map[slug] = data;
    }

    function processChildren (model, position) {
      directions.forEach(direction => {
        var slug = model.get(`${direction.name}Slug`);
        var child = collection.findWhere({ slug: slug });

        if (child) {
          var data = {};

          data.position = {
            left: position.left + direction.left,
            top: position.top + direction.top
          };

          data.directions = {
            north: child.get('northSlug'),
            east: child.get('eastSlug'),
            south: child.get('southSlug'),
            west: child.get('westSlug')
          };

          map[slug] = data;
        }
      });
    }

    function processFirst () {
      var model = models[0];
      var position = { left: 0, top: 0 };
      processParent(model, position);
      processChildren(model, position);
      models.splice(0, 1);
    }

    function processRest () {
      for (var i = 0; i < models.length; ++i) {
        var model = models[i];
        var slug = model.get('slug');

        if (!map[slug]) continue;

        var position = map[slug].position;
        processChildren(model, position);
        models.splice(i, 1);
      }

      if (models.length) processRest();
    }

    processFirst();
    processRest();

    this.set(map);
  },

  getPosition (slug) {
    if (this.has(slug)) {
      return this.get(slug).position;
    }
  },
  getDirections (slug) {
    if (this.has(slug)) {
      return this.get(slug).directions;
    }
  }
});