'use strict';

import _ from 'underscore';
import Backbone from 'backbone';

/**
 * @event [frame:over] Pass direction
 * @event [frame:out]
 * @event [frame:update] Pass directions
 */
var EventBus = {};
_.extend(EventBus, Backbone.Events);

export default EventBus;