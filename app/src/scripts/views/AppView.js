'use strict';

import Backbone from 'backbone';

import AppRouter from '../routers/AppRouter';

import Store from '../modules/StoreModule';

import CitiesView from '../views/CitiesView';
export default Backbone.ContentView.extend({
  content: '.app__content',
  
  template: `
    <div class="app">
      <div class="app__content"></div>
    </div>
  `,

  didInitialize () {
    this.render();
  },

  didRender () {
    this.router = new AppRouter();
    this.citiesView;

    this.router.on('route:default', () => {
      this.router.navigate('/welcome', { trigger: true });
    });

    this.router.on('route:welcome', () => {

    });

    this.router.on('route:city', slug => {
      if (this.currentView && this.currentView.name === 'cities' && this.citiesView) {
        this.citiesView.changeCity(slug);
      } else {
        this.citiesView = new CitiesView({ collection: Store.getCities(), activeCity: slug });
        this.changeContent(this.citiesView);
      }
    });
    Backbone.on('router:navigate', url => this.router.navigate(url));

    Backbone.history.start();
  }
});