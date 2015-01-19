'use strict';

import Backbone from 'backbone';

import LocalModel from '../models/LocalModel';

export default Backbone.Collection.extend({
  model: LocalModel
});