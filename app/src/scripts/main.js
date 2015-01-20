'use strict';

import Backbone from 'backbone';
import './extensions/BetterView';
import './extensions/PageView';
import './extensions/ContentView';

import AppRouter from './routers/AppRouter';

import Store from './modules/StoreModule';

import AppView from './views/AppView';
import LocalView from './views/LocalView';
import HelpView from './views/HelpView';
import LoaderView from './views/LoaderView';
import CitiesView from './views/CitiesView';
import LocalsView from './views/LocalsView';

var app = new AppView({ el: 'body' });

var router = new AppRouter();

var citiesView;

router.on('route:city', slug => {
  var currentView = app.getContent();
  if (currentView && currentView.name === 'cities' && citiesView) {
    citiesView.changeCity(slug);
  } else {
    citiesView = new CitiesView({ collection: Store.getCities(), activeCity: slug });
    app.changeContent(citiesView);
  }

  var citiesCurrentView = citiesView.getContent();
  if (citiesCurrentView) {
    citiesView.removeContent();
  }
});

router.on('route:locals', () => {
  var currentView = app.getContent();

 var localsView = new LocalsView({ collection: Store.getCities() });

  if (currentView && currentView.name === 'cities' && citiesView) {
    return citiesView.changeContent(localsView);
  }

  citiesView = new CitiesView({ collection: Store.getCities(), activeCity: 'paris' });
  app.changeContent(citiesView);
  citiesView.changeContent(localsView);
});

Backbone.history.start();