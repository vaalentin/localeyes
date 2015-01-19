'use strict';

import Backbone from 'backbone';

import FrameModel from '../models/FrameModel';
import FrameView from '../views/FrameView';

export default Backbone.ContentView.extend({
  className: 'explore',

  name: 'explore',
  content: '.explore__content',
  
  template: `
    <div class="explore__frame"></div>
    <div class="explore__content"></div>
  `,

  onInitialize () {
    this.frame = new FrameView({ model: new FrameModel() });
  },

  onRemove () {
    this.frame.remove();
  },

  render () {
    this.$el.html(this.template());
    this.assign(this.frame, '.explore__frame');
    return this;
  }
});