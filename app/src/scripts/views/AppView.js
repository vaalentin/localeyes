/**
 * App main logic
 */

'use strict';

import Backbone from 'backbone';
import '../extensions/BetterView';
import '../extensions/PageView';
import '../extensions/ContentView';

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
    const router = new AppRouter();
    let citiesView = null;

    const loader = new LoaderView({ el: '.loader' });
    loader.out();

    router.on('route:welcome', () => {
      const welcomeView = new WelcomeView();
      this.listenTo(welcomeView, 'router:navigate', router.navigate);
      this.changeContent(welcomeView);
    });

    router.on('route:howto', () => {
      const howtoView = new HowtoView();
      this.changeContent(howtoView);
    });

    router.on('route:city', (slug, language) => {
      if (slug === 'en') {
        language = slug;
        slug = null;
      }
      
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
      const localModel = Store.getLocals().findWhere({ slug: slug });

      if (localModel) {
        const localView = new LocalView({ model: localModel, language: language });
        this.changeContent(localView);
      }
    });

    Backbone.history.start();
  }
});