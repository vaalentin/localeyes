/**
 * App bootstrap
 */
 
'use strict';

import jQuery from 'jquery';
jQuery.ajaxSetup({ cache: true });

import AppView from './views/AppView';

jQuery(() => new AppView({ el: '.app' }));