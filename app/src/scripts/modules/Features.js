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

function mobile () {
  const name = 'mobile';
  let result;
  let className;

  if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    || false) {
    result = true;
  }
  else {
    result = false;
  }

  className = result ? 'mobile' : '';

  return { name, result, className };
}

let features = {};
const tests = [mobile];

let className = tests.map(test => {
  let { name, result, className } = test();
  features[name] = result;
  return className;
}).join(' ');

jQuery('html').addClass(className);

export default features;