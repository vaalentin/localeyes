'use strict';

import jQuery from 'jquery';

/**
 * Tests structure
 *
 * @return {Object} [data]
 * @return {String} [data.name] Test name, used to access to the result
 * @return {Boolean} [data.result] Test result
 * @return {String} [data.className] Classname to be added to html (can be empty)
 */

var features = {};

function mobile () {
  var result;

  if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    || false)
    result = true;
  else
    result = false;

  return { name: 'mobile', result: result, className: result ? 'mobile' : '' };
}

var tests = [mobile];

var className = tests.map(t => {
  var data = t();
  features[data.name] = data.result;
  return data.className;
}).join(' ');

jQuery('html').addClass(className);

export default features;