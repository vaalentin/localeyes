'use strict';

/**
 * Slug a name
 * eg: Los Angeles => los_angeles
 *
 * @function slug
 * @param {String} [string='']
 * @return {String}
 */
export default function slug (string='') {
  return string.toLowerCase().replace(' ', '_');
}