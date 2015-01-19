'use strict';

import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults: {
    'north': undefined,
    'east': undefined,
    'south': undefined,
    'west': undefined
  }
});