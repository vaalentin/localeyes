'use strict';

import _ from 'underscore';

/**
 * @param {Object} [options]
 * @param {String} [options.link] 
 * @param {String} [options.text]
 */
export var buttonPartial = function (options) {
  var params = _.extend({
    link: null,
    text: '',
    className: ''
  }, options);

  var link = params.link ? `
    <a href="${params.link}" class="button__link">
      ${params.text || ''}
    </a>
  ` : `
    <a class="button__link">
      ${params.text || ''}
    </a>
  `

  return `
    <div class="button ${params.className}">
      ${link}
      <div class="button__border--top"></div>
      <div class="button__border--left"></div>
      <div class="button__border--bottom"></div>
      <div class="button__border--right"></div>
    </div>
  `;
}

/**
 * @param {jQuery} [$el]
 * @param {Object} [options]
 * @param {Boolean} [options.withBorders=false]
 * @param {Number} [options.delay=0]
 */
export var buttonAnimation = function ($el, options) {
  var params = _.extend({
    withBorders: false,
    delay: 0
  }, options);

  var $horizontalBorders = $el.find('.button__border--top, .button__border--bottom')
  var $verticalBorders = $el.find('.button__border--left, .button__border--right');

  if (params.withBorders) {
    $el.velocity('stop')
      .velocity({ opacity: 1, top: 0 }, { duration: 500, delay: params.delay });

    $horizontalBorders
      .velocity('stop')
      .velocity({ width: '100%' }, { duration: 1000, delay: params.delay, display: 'block' });

    $verticalBorders
      .velocity('stop')
      .velocity({ height: '100%' }, { duration: 1000, delay: params.delay, display: 'block' });
  } else {
    $el.velocity('stop')
      .velocity({ opacity: 1, top: 0 }, { duration: 500, delay: params.delay });

    $horizontalBorders
      .velocity({ width: '100%' }, 0);

    $verticalBorders
      .velocity({ height: '100%' }, 0);
  }
}