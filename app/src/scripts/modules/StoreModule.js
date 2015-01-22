'use strict';

import LocalsCollection from '../collections/LocalsCollection';
import CitiesCollection from '../collections/CitiesCollection';

/**
 * Data store
 *
 * Currently bootstrap the data,
 * Can easily fetch them over the network, by returning a Promise
 */
export default {
  locals: new LocalsCollection(window.locals),
  cities: new CitiesCollection(window.cities),

  getLocals () {
    return this.locals
  },

  getCities () {
    return this.cities
  }
}