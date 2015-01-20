'use strict';

import Backbone from 'backbone';

export default Backbone.ContentView.extend({
  content: '.app__content',
  
  template: `
    <div class="app">
      <div class="app__content"></div>
    </div>
  `,

  onInitialize () {
    this.render();
  }
});