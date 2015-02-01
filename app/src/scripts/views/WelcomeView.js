'use strict';

import _ from 'underscore';
import Backbone from 'backbone';
import videojs from 'videojs';

import HowtoView from './HowtoView';

export default Backbone.ContentView.extend({
  name: 'welcome',
  className: 'welcome',
  content: '.welcome__overlay',

  template: `
    <div class='welcome__overlay'></div>
    <div class='welcome__logo'>
      <div class="welcome__logo__part welcome__logo__part--eyes">
        <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 350 350">
          <path fill="#ffffff" d="M170.711,47.193c0-16.047-14.476-29.064-32.29-29.064c-5.614,0-10.874,1.291-15.471,3.545   c-0.343,0.068-44.112,22.746-44.112,22.746c-1.086,0.57-1.768,1.631-1.768,2.773c0,1.15,0.682,2.195,1.768,2.77   c0,0,43.77,22.678,44.102,22.746c4.6,2.264,9.867,3.547,15.481,3.547C156.235,76.26,170.711,63.238,170.711,47.193 M125.358,47.193   c0-8.016,6.493-14.512,14.509-14.512c8.029,0,14.519,6.496,14.519,14.512c0,8.02-6.489,14.516-14.519,14.516   C131.852,61.709,125.358,55.205,125.358,47.193"/>
          <path fill="#ffffff" d="M176.195,46.623c0,15.615,14.057,28.268,31.406,28.268c5.445,0,10.564-1.252,15.023-3.447   c0.348-0.072,42.902-22.131,42.902-22.131c1.061-0.547,1.73-1.578,1.73-2.689c0-1.113-0.67-2.133-1.73-2.695   c0,0-42.554-22.055-42.886-22.121c-4.475-2.199-9.598-3.449-15.039-3.449C190.25,18.357,176.195,31.012,176.195,46.623    M220.29,46.623c0,7.791-6.321,14.107-14.119,14.107c-7.788,0-14.104-6.316-14.104-14.107c0-7.799,6.316-14.111,14.104-14.111   C213.969,32.512,220.29,38.822,220.29,46.623"/>
        </svg>
      </div>
      <div class="welcome__logo__part welcome__logo__part--firstLine">
        <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 350 350">
          <path fill="#ffffff" d="M57.839,209.961c-12.034-0.104-24.062,0.213-36.098,0.225c-0.44-45.725,0.002-91.5,0.71-137.217   c0.094-5.957-9.136-5.945-9.229,0c-0.731,47.256-1.2,94.578-0.682,141.838c0.028,2.527,2.08,4.598,4.615,4.615   c13.563,0.09,27.12-0.354,40.684-0.23C63.792,219.25,63.788,210.02,57.839,209.961z"/>
          <path fill="#ffffff" d="M128.055,143.332c-1.467-14.496-13.062-40.309-32.65-32.73c-19.783,7.662-19.412,42.539-19.751,58.896   c0.354,16.195,2.644,33.123,14.173,45.33c6.213,6.58,19.268,7.465,25.541,0.469C131.229,197.609,130.319,165.752,128.055,143.332z    M118.801,178.768c-0.769,10.088-2.842,24.646-11.541,31.166c-17.764,13.32-22.271-35.568-22.377-40.439   c0.318-15.156-0.209-37.1,11.539-48.836c10.566-10.557,20.694,13.43,22.086,20.551   C120.826,153.111,119.713,166.732,118.801,178.768z"/>
          <path fill="#ffffff" d="M188.086,201.658c-27.802,27.314-28.904-31.4-28.41-44.357c0.512-13.459,4.992-45.27,25.172-36.105   c5.38,2.441,10.07-5.51,4.658-7.973c-61.18-27.793-47.691,146.84,5.106,94.965C198.863,204.008,192.333,197.49,188.086,201.658z"/>
          <path fill="#ffffff" d="M265.634,213.852c-5.908-33.953-12.603-67.771-19.587-101.52c-0.941-4.531-7.816-4.301-8.895,0   c-5.65,22.445-10.805,45.207-15.341,68.029c-0.317,0.764-0.494,1.59-0.494,2.43c-2.056,10.471-4.017,20.947-5.757,31.418   c-0.967,5.822,7.924,8.311,8.896,2.451c1.559-9.373,3.299-18.748,5.121-28.119c7.352,0.047,14.705-0.076,22.059-0.107   c1.73,9.283,3.482,18.564,5.102,27.869C257.754,222.162,266.652,219.672,265.634,213.852z M231.812,177.17   c2.902-14.217,6.055-28.393,9.404-42.486c2.861,14.115,5.645,28.248,8.342,42.396C243.643,177.127,237.727,177.182,231.812,177.17z   "/>
          <path fill="#ffffff" d="M333.216,208.742c-11.68,0.043-23.354,0.213-35.031,0.094c-0.641-44.672,1.18-89.363-0.23-134.021   c-0.188-5.938-9.418-5.955-9.23,0c1.465,46.189-0.564,92.42,0.281,138.623c0.047,2.549,2.066,4.568,4.615,4.615   c13.199,0.24,26.393-0.029,39.596-0.08C339.167,217.947,339.167,208.717,333.216,208.742z"/>
        </svg>
      </div>
      <div class="welcome__logo__part welcome__logo__part--secondLine">
        <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 350 350">
          <path fill="#ffffff" d="M163.937,240.445c-6.097,11.02-11.481,22.42-17.36,33.557c-6.542-10.607-12.96-21.287-19.051-32.168   c-2.906-5.186-10.881-0.533-7.969,4.662c7.117,12.705,14.627,25.158,22.328,37.518c-4.54,14.051-9.395,28-13.592,42.158   c-1.697,5.723,7.211,8.148,8.898,2.455c4.395-14.82,9.514-29.412,14.226-44.133c7.173-12.947,13.327-26.439,20.487-39.387   C174.785,239.898,166.817,235.238,163.937,240.445z"/>
          <path fill="#ffffff" d="M224.506,321.619c-9.387,0.129-18.768,0.057-28.148,0.004c-0.059-5.773-0.072-11.545-0.108-17.318   c6.37,0.021,12.738-0.031,19.108,0.041c5.957,0.064,5.949-9.166,0-9.23c-6.389-0.068-12.777-0.016-19.166-0.039   c-0.062-15.67-0.025-31.34,0.18-47.008c9.201,0.057,18.402,0.014,27.604,0.053c5.953,0.025,5.949-9.205,0-9.229   c-10.729-0.049-21.456,0.049-32.186-0.072c-2.546-0.033-4.575,2.119-4.615,4.613c-0.422,27.594-0.311,55.189-0.018,82.781   c0.025,2.523,2.076,4.605,4.615,4.615c10.91,0.045,21.819,0.17,32.734,0.02C230.445,330.77,230.457,321.539,224.506,321.619z"/>
          <path fill="#ffffff" d="M104.757,306.158c-7.348,0.094-14.692,0.043-22.042,0.004c-0.009-4.428-0.023-8.852-0.06-13.279   c5.013,0.025,10.026-0.008,15.038-0.221c5.928-0.252,5.953-9.48,0-9.229c-5.037,0.217-10.075,0.248-15.111,0.219   c-0.098-11.854-0.131-23.713,0.109-35.566c7.213,0.035,14.43,0.008,21.637,0.039c5.952,0.033,5.949-9.197,0-9.23   c-8.723-0.039-17.454,0.045-26.18-0.057c-2.566-0.029-4.543,2.123-4.615,4.615c-0.613,22.432-0.003,44.869-0.028,67.299   c-0.003,2.527,2.105,4.6,4.614,4.615c8.885,0.039,17.758,0.137,26.638,0.021C110.706,315.303,110.713,306.072,104.757,306.158z"/>
          <path fill="#ffffff" d="M277.358,244.422c-16.284-15.002-37.755-0.133-36.763,19.74c0.418,8.396,6.801,13.922,14.516,15.449   c8.634,1.713,15.917-0.5,19.233,10.283c4.68,15.215-17.478,24.77-24.552,9.373c-2.48-5.4-10.434-0.705-7.967,4.662   c8.682,18.887,39.208,15.545,41.821-5.988c1.236-10.168-2.105-20.279-11.725-24.928c-3.924-1.896-8.732-1.912-12.985-2.203   c-19.125-1.301-3.92-34.436,11.899-19.859C275.2,254.977,281.751,248.467,277.358,244.422"/>
        </svg>
      </div>
    </div>
    <div class='welcome__video'>
      <video class='welcome__video__video video-js vjs-default-skin'
        style='position:absolute;top:0;left:0;overflow:hidden;z-index:-998;'
        height='100%'
        width='100%'
        data-setup='{ "techOrder": ["youtube"], "src": "https://www.youtube.com/watch?v=dPZxMU876Pw" }'
        ></video>
    </div>
  `,

  els: {
    '$eyes': '.welcome__logo__part--eyes',
    '$firstLine': '.welcome__logo__part--firstLine',
    '$secondLine': '.welcome__logo__part--secondLine'
  },

  willRemove () {
    this.video.dispose();
  },

  logoIn () {
    this.els.$eyes
      .velocity('stop')
      .velocity({ opacity: 1, top: 0 }, { duration: 500, delay: 200 });

    this.els.$firstLine
      .velocity('stop')
      .velocity({ opacity: 1, top: 0 }, { duration: 500 });

    this.els.$secondLine
      .velocity('stop')
      .velocity({ opacity: 1, top: 0 }, { duration: 700 });
  },

  logoOut () {
    this.els.$eyes
      .velocity('stop')
      .velocity({ opacity: 0, top: -50 }, { duration: 400 });

    this.els.$firstLine
      .velocity('stop')
      .velocity({ opacity: 0, top: 100 }, { duration: 600, delay: 100 });

    this.els.$secondLine
      .velocity('stop')
      .velocity({ opacity: 0, top: 100 }, { duration: 400, delay: 100 });
  },

  setupVideo () {
    var $video = this.$('.welcome__video__video');

    this.video = videojs($video[0]);
    this.video.one('play', this.videoIn);
    this.video.on('timeupdate', onProgress.bind(this), false);
    this.video.Background({ mediaType: 'youtube', volume: 1 });
  
    var flagA = false;
    var flagB = false;

    function onProgress () {
      var elasped = this.video.currentTime();

      if (!flagA && elasped > 57.5) {
        this.logoIn();
        flagA = true;
      }

      if (!flagB && elasped > 62) {
        this.logoOut();
        flagB = true;

        var howtoView = new HowtoView();
        this.changeContent(howtoView);
      }

      if (flagA && flagB) {
        this.video.off('timeupdate', onProgress);
      }
    }

    this.video.currentTime(50);
  },

  videoIn (e) {
    jQuery(e.target)
      .velocity('stop')
      .velocity({ opacity: 1 }, { duration: 800, delay: 100 });
  },

  out (done) {
    return new Promise((resolve, reject) => {
      setTimeout(done, 400);
      this.$el
        .velocity('stop')
        .velocity({ opacity: 0, tween: [0, 1] }, { duration: 1000,
          progress: (e, c, r, s, t) => { this.video.volume(t); }, // fadeout sound
          complete: resolve
        });
    });
  },

  didRender () {
    this.setupVideo();
  }
});