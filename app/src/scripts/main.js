'use strict';

import jQuery from 'jquery';
import Backbone from 'backbone';
import './extensions/BetterView';
import './extensions/PageView';
import './extensions/ContentView';

import AppView from './views/AppView';

jQuery(() => new AppView({ el: 'body' }));