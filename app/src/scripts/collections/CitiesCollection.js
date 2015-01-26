'use strict';

import Backbone from 'backbone';

import CityModel from '../models/CityModel';

export default Backbone.Collection.extend({
  model: CityModel
});