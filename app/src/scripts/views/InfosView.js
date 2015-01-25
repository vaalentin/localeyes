'use strict';

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
            <p>
              During a trip in the heart of both Americas, fascinated by the image, we give the opportunity for locals to realize our photos of the travel
            </p>

            <h3> INTRO </h3>

            <p>
              We get on an airplane, with our travel guides and notes of friends. It starts with the discovery of a new land. We hope to meet locals, who would show us something new and unexpected. We are looking for something new, unknown, surprising.
              A few weeks before our departure, we will send selected locals a disposable camera. Our route will let us pick it up once the film over. It is once returned to France that they will get developed . So finally, our travel photos, it’s the locals who will decide.
            </p>

            <h3> THE PROJECT </h3>

            <p>
              Each local participating in the project has been given a disposable camera that he has to finish before our arrival. We let him/her complete freedom, we only want to see what they want to show us. Local diversity is an essential part of this project. No familiarity with the image is requested, only the desire to participate. Once the film is completed, we will pick it back and we will arrange to have developed.
              In the course of these exchanges, we will get each participant to talk about his/her experience and what he decided to capture.
              These stories and these pictures will lead to a web documentary. On a dedicated website, we store the portraits of our participants, related to their photos as well as additional information on the project and travel. Through a digital experience, we want to help people discover the visions of our 12 local participants, situated in the heart of the Americas .
            </p>

            <h3> THE ROUTE </h3>

            <p>
              We decided to explore North America in height and South America, in its width.
              We begin our journey in North America. Alaska will be the first to welcome us. We then descend to San Francisco via Seattle, Portland and some natural parks.
              We do not cross Canada but pass through Vancouver.
              In terms of South America, we get to Peru first, we cross to go to Bolivia and finish in lower Brazil.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,

  events: {
    'click .infos__icon--close': 'onCloseClick'
  },

  onCloseClick (e) {
    this.trigger('close');
  }
});