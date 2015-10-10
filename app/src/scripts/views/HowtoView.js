/* jshint curly: false */

'use strict';

import jQuery from 'jquery';
import Backbone from 'backbone';

import { buttonPartial, buttonAnimation } from '../partials/button';

export default Backbone.PageView.extend({
  name: 'howto',
  className: 'howto',

  template: `
    <div class='howto__content'>
      <h2 class='howto__title'> POUR VOYAGER ENTRE CHAQUE PAYS </h2>
      <div class='howto__columns'>
        <div class='howto__column'>
          <div class='howto__keys__wrapper'>
            <div class='howto__keys'>
              <div class='howto__key--top'>
                <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                  <path fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="   M48,46.032C48,47.119,47.114,48,46.021,48H3.979C2.886,48,2,47.119,2,46.032V3.968C2,2.881,2.886,2,3.979,2h42.043   C47.114,2,48,2.881,48,3.968V46.032z"/>
                  <polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="   12.882,31.027 25,18.973 37.118,31.027  "/>
                </svg>
              </div>
              <div class='howto__key--right'>
                <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                  <path fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="   M48,46.032C48,47.119,47.114,48,46.021,48H3.979C2.886,48,2,47.119,2,46.032V3.968C2,2.881,2.886,2,3.979,2h42.043   C47.114,2,48,2.881,48,3.968V46.032z"/>
                  <polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="   18.973,12.882 31.027,25 18.973,37.118  "/>
                </svg>
              </div>
              <div class='howto__key--bottom'>
                <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                  <path fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="   M48,46.032C48,47.119,47.114,48,46.021,48H3.979C2.886,48,2,47.119,2,46.032V3.968C2,2.881,2.886,2,3.979,2h42.043   C47.114,2,48,2.881,48,3.968V46.032z"/>
                  <polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="   37.118,18.973 25,31.027 12.882,18.973  "/>
                </svg>
              </div>
              <div class='howto__key--left'>
                <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                  <path fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="   M48,46.032C48,47.119,47.114,48,46.021,48H3.979C2.886,48,2,47.119,2,46.032V3.968C2,2.881,2.886,2,3.979,2h42.043   C47.114,2,48,2.881,48,3.968V46.032z"/>
                  <polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="   31.027,37.118 18.973,25 31.027,12.882  "/>
                </svg>
              </div>
            </div>
          </div>
          <div class='howto__text'>
            <p> DIRIGEZ-VOUS GRÂCE AUX FLÊCHES DE VOTRE CLAVIER </p>
          </div>
          <div class='howto__text'>
            <p> TO DIRECT YOURSELF USE THE KEYBOARD ARROWS </p>
          </div>
        </div>
        <div class='howto__column howto__column--middle'>
          <div class='howto__text'> <p> OU </p> </div>
          <div class='howto__text'> <p> OR </p> </div>
        </div>
        <div class='howto__column'>
          <div class='howto__directions__wrapper'>
            <div class='howto__directions'>
              <div class='howto__directions__mouse'>
                <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 15 20">
                  <path fill="#0a0a0a" stroke="#ffffff" stroke-width="1" d="M0.742,0.082L0.742 17.12 5.495 12.966 9.33 19.918 11.411 18.794 8.4 11.979 14.258 11.135 z"/>
                </svg>
              </div>
              <div class='howto__directions__frame'>
                <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 180 110">
                  <rect x="4" y="1.5" fill="none" stroke="#ffffff" stroke-width="3" stroke-miterlimit="10" width="172" height="107"/>
                  <path fill="#ffffff" d="M91.019,91.492c-0.116-0.784-0.371-1.568-0.976-1.568c-0.668,0-0.933,0.815-0.933,1.712c0,0.864,0.116,1.137,1.229,2.146    c0.87,0.784,1.464,1.44,1.464,3.089c0,1.681-0.594,3.01-1.781,3.01c-1.252,0-1.708-1.249-1.813-2.945l0.71-0.145    c0.096,1.185,0.266,2.081,1.124,2.081c0.615,0,1.05-0.624,1.05-1.905c0-1.408-0.604-1.889-1.336-2.528    c-0.816-0.721-1.357-1.232-1.357-2.802c0-1.44,0.637-2.721,1.644-2.721c0.997,0,1.485,1.072,1.665,2.417L91.019,91.492z"/>
                  <path fill="#ffffff" d="M88.155,8.261h0.891l2.101,8.98l0.021-0.032l-0.031-2.385V8.261h0.71v10.677h-0.891l-2.1-8.996l-0.021,0.032l0.032,2.417    v6.547h-0.711V8.261z"/>
                  <path fill="#ffffff" d="M161.943,48.66h3.446v0.961h-2.736v3.521h2.26v0.96h-2.26v4.274h2.736v0.96h-3.446V48.66z"/>
                  <path fill="#ffffff" d="M18.749,48.66l-0.711,10.885H17.73l-1.177-6.45h-0.021l-1.177,6.45h-0.308L14.337,48.66l0.711-0.208l0.339,8.02h0.021    l1.028-5.618h0.212l1.029,5.618h0.021l0.34-8.02L18.749,48.66z"/>
                </svg>
              </div>
            </div>
          </div>
          <div class='howto__text'>
            <p> UTILISEZ VOTRE SOURIS POUR CLIQUER SUR LES DIRECTIONS </p>
          </div>
          <div class='howto__text'>
            <p> USE YOUR MOUSE TO CLICK ON THE DIFFERENT DIRECTIONS </p>
          </div>
        </div>
      </div>
      <div class='howto__buttons'>
        ${buttonPartial({
          className: 'howto__button--fr',
          link: '#city/anchorage',
          text: 'COMMENCER'
        })}
        ${buttonPartial({
          className: 'howto__button--en',
          link: '#city/anchorage/en',
          text: 'LET\'S GO'
        })}
      </div>
    </div>
    <div class='howto__background'></div>
  `,

  els: {
    '$background': '.howto__background',
    '$title': '.howto__title',
    '$columns': '.howto__column',
    '$keys': '.howto__key--top, .howto__key--right, .howto__key--bottom, .howto__key--left',
    '$mouse': '.howto__directions__mouse',
    '$buttonFr': '.howto__button--fr',
    '$buttonEn': '.howto__button--en'
  },

  willRemove () {
    this.stopIdleAnimations();
  },

  startIdleAnimations () {
    if (this.idlePlaying) return false;

    this.idlePlaying = true;

    // keys
    const totalKeys = this.els.$keys.length;
    let currentKey = 0;

    const nextKey = () => {
      if (!this.idlePlaying) return false;

      currentKey++;
      if (currentKey >= totalKeys) currentKey = 0;

      jQuery(this.els.$keys[currentKey])
        .velocity({ opacity: 1 }, { duration: 300, delay: 300 })
        .velocity({ opacity: 0.2 }, { duration: 300, delay: 200, complete: nextKey });
    };

    nextKey();

    // mouse
    const directions = {
      0: { top: '54%', left: '13%' }, // left
      1: { top: '20%', left: '54%' }, // top
      2: { top: '90%', left: '54%' }, // bottom
      3: { top: '54%', left: '94%' } // right
    };
    
    let currentDirection = 0;

    const nextDirection = () => {
      if (!this.idlePlaying) return false;

      currentDirection++;
      if (currentDirection >= 4) currentDirection = 0;
      this.els.$mouse
        .velocity(directions[currentDirection], { duration: 700, delay: 500, complete: nextDirection });
    };

    nextDirection();
  },

  stopIdleAnimations () {
    this.idlePlaying = false;
    this.els.$mouse.velocity('stop');
    this.els.$keys.velocity('stop');
  },

  in () {
    this.els.$background
      .velocity({ opacity: 0.4 }, 2000);

    this.els.$title
      .velocity({ opacity: 0, translateY: '-50px' }, 0)
      .velocity({ opacity: 1, translateY: 0 }, { duration: 500, delay: 1000 });

    this.els.$columns.each(function (i) {
      const $column = jQuery(this);

      const baseDelay = i * 300;

      $column
        .velocity({ opacity: 0, translateY: '50px' }, 0)
        .velocity({ opacity: 1, translateY: 0 }, { duration: 500, delay: baseDelay + 1000 });

      $column.find('.howto__text').each(function () {
        const $text = jQuery(this);

        $text.each(function (j) {
          jQuery(this)
            .velocity({ opacity: 0, translateY: '50px' }, 0)
            .velocity({ opacity: 1, translateY: 0 }, { duration: 500, delay: baseDelay + ((j + 1) * 300) + 1000 });
        });
      });
    });

    buttonAnimation(this.els.$buttonFr, { delay: 1400 });
    buttonAnimation(this.els.$buttonEn, { delay: 1500 });

    this.startIdleAnimations();
  }
});