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

    var directions = [
      { name: 'north', left: 0, top: -1 },
      { name: 'east', left: 1, top: 0 },
      { name: 'south', left: 0, top: 1 },
      { name: 'west', left: -1, top: 0 }
    ];

    this.collection.each((city, i) => {
      var slug = city.get('slug');
      var position = i === 0
        ? { left: 0, top: 0 }
        : map[slug] ? map[slug].position : undefined;

      directions.forEach(direction => {
        var targetSlug = city.get(`${direction.name}Slug`);

        if (targetSlug && !map[targetSlug]) {
          var targetPosition = _.clone(position);
          targetPosition.top += direction.top;
          targetPosition.left += direction.left;

          map[targetSlug] = {};
          map[targetSlug].position = targetPosition;

          var targetCity = this.collection.findWhere({ slug: targetSlug });
          map[targetSlug].directions = {
            north: targetCity.get('northSlug'),
            east: targetCity.get('eastSlug'),
            south: targetCity.get('southSlug'),
            west: targetCity.get('westSlug')
          };
        }
      });
    });

    this.set(map);
  },

  getPosition (slug) {
    if (this.has(slug)) return this.get(slug).position;
  },
  getDirections (slug) {
    if (this.has(slug)) return this.get(slug).directions
  }
});