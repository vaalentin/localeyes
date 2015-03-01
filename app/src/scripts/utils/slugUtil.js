'use strict';

/**
 * Slug a name
 * eg: Los Angeles => los_angeles
 *
 * @function slug
 * @param {String} [str='']
 * @return {String}
 */
export default function slug (str='') {
  return str.toLowerCase().replace(' ', '_');
}