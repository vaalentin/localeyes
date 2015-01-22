'use strict';

import Backbone from 'backbone';

export default Backbone.Router.extend({
  routes: {
    '': 'default',
    'welcome': 'welcome',
    'local/:slug': 'local',
    'city': 'city',
    'city/:slug': 'city'
  }
});