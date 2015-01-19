'use strict';

import Backbone from 'backbone';

export default Backbone.Router.extend({
  routes: {
    '': 'default',
    'help': 'help',
    'locals': 'locals',
    'local/:slug': 'local',
    'city': 'city',
    'city/:slug': 'city'
  }
});