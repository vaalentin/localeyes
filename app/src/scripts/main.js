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
import ExploreView from './views/ExploreView';
import CitiesView from './views/CitiesView';
import LocalsView from './views/LocalsView';

var app = new AppView({ el: 'body' });

var router = new AppRouter();

router.on('route:default', () => {
  app.changeContent(new LoaderView())
});

router.on('route:help', () => {
  app.changeContent(new HelpView())
});

router.on('route:local', slug => {
  var local = Store.getLocals().findWhere({ slug: slug });
  if (!local) return false;
  app.changeContent(new LocalView({ model: local }));
});


var exploreView;
var citiesView;

router.on('route:city', slug => {
  if (app.getContent().name !== 'explore' || !exploreView) {
    if (!exploreView) exploreView = new ExploreView();
    app.changeContent(exploreView);
  }

  if (exploreView.getContent().name === 'cities' && citiesView) {
    citiesView.changeCity(slug);
  } else {
    citiesView = new CitiesView({ collection: Store.getCities(), activeCity: slug });
    exploreView.changeContent(citiesView);
  }
});

router.on('route:locals', () => {
  if (app.getContent().name !== 'explore' || !exploreView) {
    if (!exploreView) exploreView = new ExploreView();
    app.changeContent(exploreView);
  }
  
  var localsView = new LocalsView({ collection: Store.getCities() });
  exploreView.changeContent(localsView);
});

Backbone.history.start();