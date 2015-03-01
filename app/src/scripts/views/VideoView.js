'use strict';

import jQuery from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import { buttonPartial, buttonAnimation } from '../partials/button';

export const ResponsiveVideo = Backbone.BetterView.extend({
  className: 'video',

  template: `
    <div class='video__controls'>
      <div class='video__playPause is-paused'>
        <div class='video__icon--play'>
          <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <path fill="#ffffff" d="M31,19.411L9 31 9 9 31 19.411 z"/>
          </svg>
        </div>
        <div class='video__icon--pause'>
          <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <rect fill="#ffffff" x="12" y="10" width="6" height="20"/>
            <rect fill="#ffffff" x="23" y="10" width="6" height="20"/>
          </svg>
        </div>
      </div>
      <div class='video__time'> 0:00 / 0:00 </div>
      <div class='video__muteUnmute'>
        <div class='video__icon--unmute'>
          <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <path fill="#ffffff" d="M19.498,10.795L13.051 16.371 6.949 16.371 6.949 23.549 12.959 23.549 19.498 29.205 z"/>
            <path fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M22.783,24.049   c0.725-1.164,1.15-2.533,1.15-4.004c0-1.496-0.438-2.885-1.184-4.061"/>
            <path fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M26.396,13.34   c1.389,1.873,2.211,4.193,2.211,6.705c0,2.488-0.809,4.787-2.176,6.652"/>
            <path fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="   M29.887,29.152c1.98-2.506,3.164-5.668,3.164-9.107c0-3.465-1.199-6.646-3.201-9.158"/>
          </svg>
        </div>
        <div class='video__icon--mute'>
          <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <path fill="#ffffff" d="M19.498,10.795L13.051 16.371 6.949 16.371 6.949 23.549 12.959 23.549 19.498 29.205 z"/>
          </svg>
        </div>
      </div>
      <div class='video__volume'>
        <div class='video__volume__slider'></div>
      </div>
      <div class='video__bar'>
        <div class='video__progress'></div>
        <div class='video__buffer'></div>
      </div>
    </div>
    <div id='video__player'></div>
  `,

  els: {
    '$playPauseButton': '.video__playPause',
    '$muteUnmuteButton': '.video__muteUnmute',
    '$volume': '.video__volume',
    '$volumeSlider': '.video__volume__slider',
    '$bar': '.video__bar',
    '$progress': '.video__progress',
    '$buffer': '.video__buffer',
    '$time': '.video__time'
  },

  events: {
    'click .video__playPause': 'onPlayPauseClick',
    'click .video__muteUnmute': 'onMuteUnmuteClick',
    'click .video__bar': 'onBarClick',
    'click .video__volume': 'onVolumeClick',
    'mousedown .video__volume': 'onEnterVolume',
    'mouseup .video__volume': 'onLeaveVolume',
    'mouseleave .video__volume': 'onLeaveVolume',
    'mousemove .video__volume': 'onDragVolume'
  },

  didInitialize (options) {
    _.extend(this, _.pick(options, 'videoId', 'autoplay'));
  },

  willRemove () {
    this.player.removeEventListener('onReady', this.onVideoReady);
    this.player.removeEventListener('onStateChange', this.onVideoStateChange);
    this.player.destroy();
  },

  convertTime (time) {
    const date = new Date(time * 1000);
    const minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (seconds < 10) seconds = '0' + seconds;
    return `${minutes}:${seconds}`;
  },

  onEnterVolume (e) {
    this.mouseOnVolume = true;
  },

  onLeaveVolume (e) {
    this.mouseOnVolume = false;
  },

  onDragVolume (e) {
    if (!this.mouseOnVolume || this.player.isMuted()) return false;

    const ratio = (e.pageX - this.els.$volume.offset().left) / this.els.$volume.width();
    const percent = Math.round(ratio * 100);

    this.player.setVolume(percent);
    this.els.$volumeSlider.css('width', `${percent}%`);
  },

  onPlayPauseClick () {
    const state = this.player.getPlayerState();

    if (state === window.YT.PlayerState.PLAYING) {
      this.player.pauseVideo();
      this.els.$playPauseButton.addClass('is-paused');
    } else {
      this.player.playVideo();
      this.els.$playPauseButton.removeClass('is-paused');
    }
  },

  onMuteUnmuteClick () {
    if (this.player.isMuted()) {
      this.player.unMute();
      this.els.$muteUnmuteButton.removeClass('is-muted');
      this.els.$volume.removeClass('is-muted');
    } else {
      this.player.mute();
      this.els.$muteUnmuteButton.addClass('is-muted');
      this.els.$volume.addClass('is-muted');
    }
  },

  onBarClick (e) {
    const ratio = (e.pageX - this.els.$bar.offset().left) / this.els.$bar.width();
    const percent = ratio * 100;

    this.player.seekTo(this.duration * ratio, true);
    this.els.$progress
      .velocity('stop')
      .velocity({ width: `${percent}%` }, 300);
  },

  onVolumeClick (e) {
    if (this.player.isMuted()) return false;

    const ratio = (e.pageX - this.els.$volume.offset().left) / this.els.$volume.width();
    const percent = ratio * 100;

    this.player.setVolume(percent);
    this.els.$volumeSlider
      .velocity('stop')
      .velocity({ width: `${percent}%` }, 300);
  },

  onVideoReady (e) {
    this.trigger('ready');
    this.$el
      .velocity({ translateY: 50, opacity: 0 }, 0)
      .velocity({ translateY: 0, opacity: 1 }, { duration: 800, delay: 100 });
  },

  onVideoProgress () {
    const played = (this.player.getCurrentTime() * 100) / this.duration;
    const loaded = this.player.getVideoLoadedFraction() * 100;

    this.els.$progress.css('width', `${played}%`);
    this.els.$buffer.css('width', `${loaded}%`);
    this.els.$time.html(`${this.convertTime(played)} / ${this.convertTime(this.duration)}`);
  },

  onVideoStateChange (e) {
    if (e.data === window.YT.PlayerState.PLAYING) {
      if (!this.duration) this.duration = this.player.getDuration();
      this.interval = window.setInterval(this.onVideoProgress.bind(this), 500);
      this.els.$playPauseButton.removeClass('is-paused');
    } else if (e.data === window.YT.PlayerState.PAUSED) {
      this.els.$playPauseButton.addClass('is-paused');
      if (this.interval) {
        window.clearInterval(this.interval);
        this.interval = null;
      }
    } else {
      if (this.interval) {
        window.clearInterval(this.interval);
        this.interval = null;
      }
    }
  },

  onYoutubeReady () {
    this.player = new window.YT.Player('video__player', {
      videoId: this.videoId,
      width: '100%',
      height: 'auto',
      playerVars: { enablejsapi: 1, autoplay: this.autoplay, controls: 0, rel: 0, showinfo: 0 }
    });

    this.player.addEventListener('onReady', this.onVideoReady.bind(this));
    this.player.addEventListener('onStateChange', this.onVideoStateChange.bind(this));
  },

  didRender () {
    if (typeof(window.YT) == 'undefined' || typeof(window.YT.Player) == 'undefined') {
      window.onYouTubeIframeAPIReady = this.onYoutubeReady.bind(this);
      jQuery.getScript('//www.youtube.com/iframe_api');
    } else {
      this.onYoutubeReady();
    }
  },

  goTo (time) {
    const percent = (time * 100) / this.duration;

    this.player.seekTo(time, true);
    this.els.$progress
      .velocity('stop')
      .velocity({ width: `${percent}%` }, 300);
  }
});

export const FullscreenVideo = Backbone.BetterView.extend({
  className: 'video--fullscreen',

  template: `
    ${buttonPartial({
      link: '#city',
      className: 'video__skip',
      text: 'SKIP'
    })}
    ${buttonPartial({
      className: 'video__mute',
      text: 'MUTE'
    })}
    <a class='video__skip'> SKIP </div>
    <div id='video__player'></div>
  `,

  els: {
    '$buttonSkip': '.video__skip',
    '$buttonMute': '.video__mute'
  },

  events: {
    'click .video__mute': 'onButtonMuteClick'
  },

  didInitialize (options) {
    _.extend(this, _.pick(options, 'videoId', 'autoplay', 'ratio', 'markers'));
  },

  willRemove () {
    this.$win.off('resize', this.onWindowResize);
    this.player.removeEventListener('onReady', this.onVideoReady);
    this.player.removeEventListener('onStateChange', this.onVideoStateChange);
    this.player.destroy();
  },

  onButtonMuteClick (e) {
    if (this.player.isMuted()) {
      this.player.unMute();
      this.els.$buttonMute.find('.button__link').html('MUTE');
    } else {
      this.player.mute();
      this.els.$buttonMute.find('.button__link').html('UNMUTE');
    }
  },

  onWindowResize (e) {
    const width = this.$win.width();
    const height = this.$win.height();

    const ratio = width / height;

    if (ratio < this.ratio) {
      const playerWidth = Math.ceil(height * this.ratio);
      this.$player.css({
        width: playerWidth,
        height: height,
        left: (width - playerWidth) / 2,
        top: 0
      });
    } else {
      const playerHeight = Math.ceil(width * this.ratio);
      this.$player.css({
        width: width,
        height: playerHeight,
        left: 0,
        top: (height - playerHeight) / 2
      });
    }
  },

  onVideoProgress (e) {
    if (!this.markers) return false;

    const time = this.player.getCurrentTime();
    
    for (let i = 0, j = this.markers.length; i < j; ++i) {
      const marker = this.markers[i];
      if (!marker) continue;
      if (time > marker.time) {
        marker.fn();
        this.markers.splice(i--, 1);
      }
    }
  },

  onVideoStateChange (e) {
    if (e.data === window.YT.PlayerState.PLAYING) {
      this.interval = window.setInterval(this.onVideoProgress.bind(this), 500);
    } else {
      if (this.interval) {
        window.clearInterval(this.interval);
        this.interval = null;
      }
    }
  },

  onVideoReady (e) {
    this.$player = this.$('#video__player');
    this.onWindowResize();

    buttonAnimation(this.els.$buttonSkip, { delay: 600 });
    buttonAnimation(this.els.$buttonMute, { delay: 700 });
    this.$el
      .velocity({ translateY: 50, opacity: 0 }, 0)
      .velocity({ translateY: 0, opacity: 1 }, { duration: 800, delay: 100 });
  },

  onYoutubeReady () {
    this.$win = jQuery(window);
    this.player = new window.YT.Player('video__player', {
      videoId: this.videoId,
      width: '100%',
      height: '100%',
      playerVars: { enablejsapi: 1, autoplay: this.autoplay, controls: 0, rel: 0, showinfo: 0 }
    });

    this.player.addEventListener('onReady', this.onVideoReady.bind(this));
    this.player.addEventListener('onStateChange', this.onVideoStateChange.bind(this));
    this.$win.on('resize', _.debounce(this.onWindowResize.bind(this), 50));
  },

  didRender () {
    if (typeof(window.YT) == 'undefined' || typeof(window.YT.Player) == 'undefined') {
      window.onYouTubeIframeAPIReady = this.onYoutubeReady.bind(this);
      jQuery.getScript('//www.youtube.com/iframe_api');
    } else {
      this.onYoutubeReady();
    }
  }
});