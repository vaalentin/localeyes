'use strict';

import jQuery from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

class Dragger {
  constructor ($el, opts) {
    _.extend(this, Backbone.Events);

    this.$el = $el;
    this.$doc = jQuery(document);

    this.params = _.extend(this.getDefaults(), opts || {});

    this.isEnabled;
    this.way;
    this.startOffset;
    this.startPosition;
    this.currentPosition;

    this.enable();
  }

  getDefaults () {
    return {
      lockToAxis: true,
      lockToAxisThreshold: 0
    }
  }

  enable () {
    if (this.isEnabled) {
      return false;
    }

    this.$el.on('touchstart.dragger, mousedown.dragger', this.onStart.bind(this));
  }

  disable () {
    if (!this.isEnabled) {
      return false;
    }

    this.$el.off('.dragger');
    this.$doc.off('.dragger');
  }

  onStart (e) {
    this.startPosition = {
      x: e.pageX || e.originalEvent.touches[0].pageX,
      y: e.pageY || e.originalEvent.touches[0].pageY
    }

    this.trigger('start', this.startPosition);

    this.$doc.on({
      'touchmove.dragger, mousemove.dragger': this.onMove.bind(this),
      'touchend.dragger, mouseup.dragger': this.onEnd.bind(this)
    });
  }

  onMove (e) {
    this.currentPosition = {
      x: e.pageX || e.originalEvent.touches[0].pageX,
      y: e.pageY || e.originalEvent.touches[0].pageY
    }

    let delta = {
      x: this.currentPosition.x - this.startPosition.x,
      y: this.currentPosition.y - this.startPosition.y
    }

    if (this.params.lockToAxis) {
      if (!this.way) {
        this.way = this.getWay(delta);
      } else {
        delta = this.applyWay(delta);
      }  
    }

    this.trigger('move', delta);
  }

  onEnd () {
    this.$doc.off('.dragger');

    this.trigger('end', this.currentPosition);
  }

  done () {
    this.way = null;
  }

  getWay (delta) {
    let way;

    if (Math.abs(delta.y) > this.params.lockToAxisThreshold) {
      way = 'vertical';
    }
    else if (Math.abs(delta.x) > this.params.lockToAxisThreshold) {
      way = 'horizontal';
    }

    return way;
  }

  applyWay (delta) {
    if (this.way === 'vertical') {
      delta.x = 0;
    }

    if (this.way === 'horizontal') {
      delta.y = 0;
    }

    return delta;
  }

  destruct () {
    this.disable();
  }
}

export default Dragger;