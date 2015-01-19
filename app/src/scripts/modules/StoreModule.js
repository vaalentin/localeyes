'use strict';

import LocalsCollection from '../collections/LocalsCollection';
import CitiesCollection from '../collections/CitiesCollection';

export default {
  locals: new LocalsCollection(window.locals),
  cities: new CitiesCollection(window.cities),

  getLocals () { return this.locals },
  getCities () { return this.cities }
}