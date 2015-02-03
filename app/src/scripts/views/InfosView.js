'use strict';

import jQuery from 'jquery';
import Backbone from 'backbone';

export default Backbone.PageView.extend({
  name: 'infos',
  className: 'infos',

  template: `
    <div class="infos__wrapper">
      <div class="infos__dummy"></div>
      <div class="infos__container">
        <div class="infos__centerer"></div>
        <div class="infos__content">
          <a class="infos__icon infos__icon--close">
            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <line stroke="#000000" stroke-width="2" x1="13.3" y1="36.7" x2="36.7" y2="13.3"/>
              <line stroke="#000000" stroke-width="2" x1="13.3" y1="13.3" x2="36.7" y2="36.7"/>
            </svg>
          </a>
          <div class="infos__content__container">
            <div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>
            <div class="viewport">
              <div class="overview">
                ${jQuery('#infosContent').html()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  events: {
    'click .infos__icon--close': 'onCloseClick'
  },

  els: {
    '$scrollBar': '.infos__content__container'
  },

  willRemove () {
    jQuery(window).off('resize', this.onResize);
  },

  onResize (e) {
    this.scrollbar.update();
  },

  onCloseClick (e) {
    this.trigger('close');
  },

  in () {
    this.$el.velocity({ translateY: 200, opacity: 0 }, 0)
      .velocity({ translateY: 0, opacity: 1 }, 500);
  },

  out (done) {
    setTimeout(done, 200);
    return new Promise((resolve, reject) => {
      this.$el.velocity({ translateY: -200, opacity: 0 }, { duration: 500, complete: resolve });
    });
  },

  didRender () {
    this.els.$scrollBar.tinyscrollbar();
    this.scrollbar = this.els.$scrollBar.data('plugin_tinyscrollbar');
    
    jQuery(window).on('resize', this.onResize.bind(this));
  }
});