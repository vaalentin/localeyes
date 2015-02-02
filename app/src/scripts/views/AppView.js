'use strict';

import Backbone from 'backbone';

import AppRouter from '../routers/AppRouter';

import Store from '../modules/StoreModule';

import LoaderView from '../views/LoaderView';
import WelcomeView from '../views/WelcomeView';
import CitiesView from '../views/CitiesView';
import LocalView from '../views/LocalView';
import HowtoView from '../views/HowtoView';

export default Backbone.ContentView.extend({
  content: '.app__content',

  didInitialize () {
    var router = new AppRouter();
    var citiesView = null;

    var loader = new LoaderView({ el: '.loader' });
    loader.out();

    router.on('route:default', () => {
      router.navigate('/welcome', { trigger: true });
    });

    router.on('route:welcome', () => {
      var welcomeView = new WelcomeView();
      this.changeContent(welcomeView);
    });

    router.on('route:howto', () => {
      var howtoView = new HowtoView();
      this.changeContent(howtoView);
    });

    router.on('route:city', (slug, language) => {
      if (!slug) slug = Store.getCities().first().get('slug');

      if (this.currentView && this.currentView.name === 'cities' && citiesView) {
        citiesView.changeCity(slug);
      } else {
        citiesView = new CitiesView({ collection: Store.getCities(), activeCity: slug, language: language });
        this.listenTo(citiesView, 'router:navigate', router.navigate);
        this.changeContent(citiesView);
      }
    });

    router.on('route:local', (slug, language) => {
      var localModel = Store.getLocals().findWhere({ slug: slug });

      if (localModel) {
        var localView = new LocalView({ model: localModel, language: language });
        this.changeContent(localView);
      }
    });

    Backbone.history.start();
  }
});