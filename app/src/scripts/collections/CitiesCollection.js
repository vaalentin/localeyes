'use strict';

var Backbone = require('backbone');

var CityModel = require('../models/CityModel');

export default Backbone.Collection.extend({
  model: CityModel
});