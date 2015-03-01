'use strict';

export default class Loader {
  constructor (srcs) {
    this.srcs = srcs;
  }

  load () {
    return Promise.all(this.srcs.map(src => {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    }));
  }
}