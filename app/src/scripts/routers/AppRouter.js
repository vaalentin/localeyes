'use strict';

import Backbone from 'backbone';

export default Backbone.Router.extend({
  routes: {
    '': 'default',
    'welcome': 'welcome',
    'howto': 'howto',
    'local/:slug': 'local',
    'local/:slug/:language': 'local',
    'city': 'city',
    'city/:slug': 'city',
    'city/:slug/:language': 'city'
  }
});