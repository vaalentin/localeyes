!function e(t,n,i){function s(a,l){if(!n[a]){if(!t[a]){var r="function"==typeof require&&require;if(!l&&r)return r(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var d=n[a]={exports:{}};t[a][0].call(d.exports,function(e){var n=t[a][1][e];return s(n?n:e)},d,d.exports,e,t,n,i)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<i.length;a++)s(i[a]);return s}({"./app/src/scripts/main.js":[function(e){(function(t){"use strict";var n=function(e){return e&&(e["default"]||e)},i=n("undefined"!=typeof window?window.Backbone:"undefined"!=typeof t?t.Backbone:null);e("./extensions/BetterView"),e("./extensions/PageView"),e("./extensions/ContentView");var s,o=n(e("./routers/AppRouter")),a=n(e("./modules/StoreModule")),l=n(e("./views/AppView")),r=(n(e("./views/LocalView")),n(e("./views/HelpView")),n(e("./views/LoaderView")),n(e("./views/CitiesView"))),c=n(e("./views/LocalsView")),d=new l({el:"body"}),f=new o;f.on("route:city",function(e){var t=d.getContent();t&&"cities"===t.name&&s?s.changeCity(e):(s=new r({collection:a.getCities(),activeCity:e}),d.changeContent(s));var n=s.getContent();n&&s.removeContent()}),f.on("route:locals",function(){var e=d.getContent(),t=new c({collection:a.getCities()});return e&&"cities"===e.name&&s?s.changeContent(t):(s=new r({collection:a.getCities(),activeCity:"paris"}),d.changeContent(s),void s.changeContent(t))}),i.history.start()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./extensions/BetterView":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/extensions/BetterView.js","./extensions/ContentView":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/extensions/ContentView.js","./extensions/PageView":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/extensions/PageView.js","./modules/StoreModule":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/modules/StoreModule.js","./routers/AppRouter":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/routers/AppRouter.js","./views/AppView":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/AppView.js","./views/CitiesView":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/CitiesView.js","./views/HelpView":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/HelpView.js","./views/LoaderView":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/LoaderView.js","./views/LocalView":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/LocalView.js","./views/LocalsView":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/LocalsView.js"}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/collections/CitiesCollection.js":[function(e,t){(function(n){"use strict";var i="undefined"!=typeof window?window.Backbone:"undefined"!=typeof n?n.Backbone:null,s=e("../models/CityModel");t.exports=i.Collection.extend({model:s})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../models/CityModel":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/models/CityModel.js"}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/collections/LocalsCollection.js":[function(e,t){(function(n){"use strict";var i=function(e){return e&&(e["default"]||e)},s=i("undefined"!=typeof window?window.Backbone:"undefined"!=typeof n?n.Backbone:null),o=i(e("../models/LocalModel"));t.exports=s.Collection.extend({model:o})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../models/LocalModel":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/models/LocalModel.js"}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/extensions/BetterView.js":[function(){(function(e){"use strict";var t=function(e){return e&&(e["default"]||e)},n=t("undefined"!=typeof window?window._:"undefined"!=typeof e?e._:null),i=t("undefined"!=typeof window?window.Backbone:"undefined"!=typeof e?e.Backbone:null);i.BetterView=i.View.extend({initialize:function(){this.template=n.template(this.template),this.onInitialize&&this.onInitialize.apply(this,arguments),i.View.prototype.initialize.apply(this,arguments)},remove:function(){this.onRemove&&this.onRemove.apply(this,arguments),i.View.prototype.remove.apply(this,arguments)},assign:function(e,t){t?e.setElement(this.$(t)).render():e.setElement(this.$el.render())},unassign:function(){return this.$el.empty().off(),this.stopListening(),this},append:function(e,t){var i=this;n.isArray(e)||(e=[e]),e.forEach(t?function(e){return i.$(t).append(e.render().el)}:function(e){return i.$el.append(e.render().el)})},prepend:function(e,t){var i=this;n.isArray(e)||(e=[e]),e.forEach(t?function(e){return i.$(t).prepend(e.render().el)}:function(e){return i.$el.prepend(e.render().el)})},render:function(){return this.$el.html(this.model?this.template(this.model.toJSON()):this.template()),this.onRender&&this.onRender.apply(this,arguments),this}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/extensions/ContentView.js":[function(){(function(e){"use strict";var t=function(e){return e&&(e["default"]||e)},n=t("undefined"!=typeof window?window.Backbone:"undefined"!=typeof e?e.Backbone:null);n.ContentView=n.PageView.extend({content:"",getContent:function(){return this.currentView||{}},changeContent:function(e){if(this.currentView&&this.currentView.name===e.name)return!1;var t=function(){this.prepend(e,this.content),this.currentView=e,e["in"]()}.bind(this),n=this.currentView||null;n?n.out(t).then(function(){return n.remove()}):t()},removeContent:function(){var e=this;return this.currentView?void this.currentView.out().then(function(){e.currentView.remove(),e.currentView=null}):!1}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/extensions/PageView.js":[function(){(function(e){"use strict";var t=function(e){return e&&(e["default"]||e)},n=t("undefined"!=typeof window?window.Backbone:"undefined"!=typeof e?e.Backbone:null);n.PageView=n.BetterView.extend({name:void 0,"in":function(){var e=this;return new Promise(function(t){e.$el.css("opacity",0).velocity("stop").velocity({opacity:1},{duration:800,complete:t})})},out:function(e){var t=this;return new Promise(function(n){setTimeout(e,400),t.$el.velocity("stop").velocity({opacity:0},{duration:800,complete:function(){n()}})})}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/models/CityModel.js":[function(e,t){(function(n){"use strict";var i=function(e){return e&&(e["default"]||e)},s=i("undefined"!=typeof window?window.Backbone:"undefined"!=typeof n?n.Backbone:null),o=i(e("../utils/slugUtil")),a=s.Model.extend({defaults:{name:"",country:"",background:void 0,slug:void 0,north:void 0,east:void 0,south:void 0,west:void 0,northSlug:void 0,eastSlug:void 0,southSlug:void 0,westSlug:void 0,local:void 0,localSlug:void 0,paths:[]},initialize:function(){var e=this,t={};this.has("slug")||(t.slug=o(this.get("name"))),!this.has("localSlug")&&this.has("local")&&(t.localSlug=o(this.get("local"))),["north","east","south","west"].forEach(function(n){e.has(n)&&!e.has(n+"Slug")&&(t[""+n+"Slug"]=o(e.get(n)))}),this.set(t)}});t.exports=a}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils/slugUtil":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/utils/slugUtil.js"}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/models/FrameModel.js":[function(e,t){(function(e){"use strict";var n=function(e){return e&&(e["default"]||e)},i=n("undefined"!=typeof window?window.Backbone:"undefined"!=typeof e?e.Backbone:null);t.exports=i.Model.extend({defaults:{north:void 0,east:void 0,south:void 0,west:void 0}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/models/LocalModel.js":[function(e,t){(function(n){"use strict";var i=function(e){return e&&(e["default"]||e)},s=i("undefined"!=typeof window?window.Backbone:"undefined"!=typeof n?n.Backbone:null),o=i(e("../utils/slugUtil"));t.exports=s.Model.extend({defaults:{name:void 0,slug:void 0,bio:void 0},initialize:function(){this.has("slug")||this.set({slug:o(this.get("name"))})}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils/slugUtil":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/utils/slugUtil.js"}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/models/MapModel.js":[function(e,t){(function(e){"use strict";var n=function(e){return e&&(e["default"]||e)},i=n("undefined"!=typeof window?window._:"undefined"!=typeof e?e._:null),s=n("undefined"!=typeof window?window.Backbone:"undefined"!=typeof e?e.Backbone:null);t.exports=s.Model.extend({initialize:function(e){s.Model.prototype.initialize.call(this),i.extend(this,i.pick(e,"collection")),this.build()},build:function(){var e=this,t={},n=[{name:"north",left:0,top:-1},{name:"east",left:1,top:0},{name:"south",left:0,top:1},{name:"west",left:-1,top:0}];this.collection.each(function(s,o){var a=s.get("slug"),l=0===o?{left:0,top:0}:t[a]?t[a].position:void 0;n.forEach(function(n){var o=s.get(""+n.name+"Slug");if(o&&!t[o]){var a=i.clone(l);a.top+=n.top,a.left+=n.left,t[o]={},t[o].position=a;var r=e.collection.findWhere({slug:o});t[o].directions={north:r.get("northSlug"),east:r.get("eastSlug"),south:r.get("southSlug"),west:r.get("westSlug")}}})}),this.set(t)},getPosition:function(e){return this.get(e).position},getDirections:function(e){return this.get(e).directions}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/modules/StoreModule.js":[function(e,t){"use strict";var n=function(e){return e&&(e["default"]||e)},i=n(e("../collections/LocalsCollection")),s=n(e("../collections/CitiesCollection"));t.exports={locals:new i(window.locals),cities:new s(window.cities),getLocals:function(){return this.locals},getCities:function(){return this.cities}}},{"../collections/CitiesCollection":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/collections/CitiesCollection.js","../collections/LocalsCollection":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/collections/LocalsCollection.js"}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/routers/AppRouter.js":[function(e,t){(function(e){"use strict";var n=function(e){return e&&(e["default"]||e)},i=n("undefined"!=typeof window?window.Backbone:"undefined"!=typeof e?e.Backbone:null);t.exports=i.Router.extend({routes:{"":"default",help:"help",locals:"locals","local/:slug":"local",city:"city","city/:slug":"city"}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/utils/slugUtil.js":[function(e,t){"use strict";function n(e){return(e||"").toLowerCase().replace(" ","_")}t.exports=n},{}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/AppView.js":[function(e,t){(function(e){"use strict";var n=function(e){return e&&(e["default"]||e)},i=n("undefined"!=typeof window?window.Backbone:"undefined"!=typeof e?e.Backbone:null);t.exports=i.ContentView.extend({content:".app__content",template:'\n    <div class="app">\n      <div class="app__content"></div>\n    </div>\n  ',onInitialize:function(){this.render()}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/CitiesView.js":[function(e,t){(function(n){"use strict";var i=function(e){return e&&(e["default"]||e)},s=i("undefined"!=typeof window?window._:"undefined"!=typeof n?n._:null),o=i("undefined"!=typeof window?window.Backbone:"undefined"!=typeof n?n.Backbone:null),a=i("undefined"!=typeof window?window.Hammer:"undefined"!=typeof n?n.Hammer:null),l=i(e("../models/MapModel")),r=i(e("../models/FrameModel")),c=i(e("./CityView")),d=i(e("./MenuView")),f=i(e("./FrameView"));t.exports=o.ContentView.extend({name:"cities",className:"cities",content:".cities__overlay",template:'\n    <div class="cities__outerOverlay">\n      <div class="cities__overlay"></div>\n    </div>\n    <div class="cities__frame"></div>\n    <div class="cities__menu"></div>\n    <div class="cities__content"></div>\n  ',onInitialize:function(e){var t=this;s.extend(this,s.pick(e,"activeCity")),this.map=new l({collection:this.collection}),this.menu=new d,this.frame=new f({model:new r}),this.cities=this.collection.map(function(e){return new c({model:e,position:t.map.getPosition(e.get("slug"))})}),this.listenTo(this.frame,"frame:over",this.onFrameOver),this.listenTo(this.frame,"frame:out",this.onFrameOut),jQuery(document).on("keydown",this.onKeydown.bind(this)),this.isSliding=!1,this.isOpen=!1,this.hammer=new a.Manager(this.$el[0],{dragLockToAxis:!0,preventDefault:!0}),this.hammer.add(new a.Pan({direction:a.DIRECTION_ALL})),this.hammer.on("panleft panright",this.onPanHorizontal.bind(this)),this.hammer.on("panup pandown",this.onPanVertical.bind(this)),this.hammer.on("panend",this.onPanend.bind(this)),jQuery(window).on("resisze",this.onResize.bind(this)),this.translateX,this.translateY,this.width,this.height,this.panX,this.panY},onPanHorizontal:function(e){if(this.isSliding)return!1;if(this.panY)return!1;this.width&&this.height||this.onResize(),this.panX=!0;var t=100/this.width*e.deltaX;2===e.direction?this.frame.model.get("east")||(t*=.2):4===e.direction&&(this.frame.model.get("west")||(t*=.2));var n=this.translateX+t;this.$(".cities__content").velocity({translateX:n+"%"},0)},onPanVertical:function(e){if(this.isSliding)return!1;if(this.panX)return!1;this.width&&this.height||this.onResize(),this.panY=!0;var t=100/this.height*e.deltaY;8===e.direction?this.frame.model.get("south")||(t*=.2):16===e.direction&&(this.frame.model.get("north")||(t*=.2));var n=this.translateY+t;this.$(".cities__content").velocity({translateY:n+"%"},0)},onPanend:function(e){switch(this.panX=!1,this.panY=!1,e.direction){case 2:var t=100/this.width*e.deltaX;Math.abs(t)>40&&this.frame.model.get("east")?this.frame.click("right"):this.setPosition();break;case 4:var t=100/this.width*e.deltaX;Math.abs(t)>40&&this.frame.model.get("west")?this.frame.click("left"):this.setPosition();break;case 8:var t=100/this.height*e.deltaY;Math.abs(t)>40&&this.frame.model.get("south")?this.frame.click("bottom"):this.setPosition();break;case 16:var t=100/this.height*e.deltaY;Math.abs(t)>40&&this.frame.model.get("north")?this.frame.click("top"):this.setPosition()}},onSwipe:function(){console.log("swipe")},onRemove:function(){this.cities.forEach(function(e){return e.remove()}),jQuery(document).off("keydown",this.onKeydown),this.hammer.destroy()},onFrameOver:function(e){if(this.isSliding)return!1;var t,n=this.map.getPosition(this.activeCity),i=this.map.getDirections(this.activeCity);"north"===e&&i.north?t={translateY:-100*n.top+10+"%"}:"east"===e&&i.east?t={translateX:-100*n.left-10+"%"}:"south"===e&&i.south?t={translateY:-100*n.top-10+"%"}:"west"===e&&i.west&&(t={translateX:-100*n.left+10+"%"}),t&&(this.isOpen=!0,this.$(".cities__content").velocity("stop").velocity(t,{duration:400}))},onFrameOut:function(){if(this.isSliding||!this.isOpen)return!1;var e=this.map.getPosition(this.activeCity),t={translateX:""+-100*e.left+"%",translateY:""+-100*e.top+"%"};this.$(".cities__content").velocity("stop").velocity(t,{duration:400})},onKeydown:function(e){if(!this.isSliding){var t=e.charcode?e.charcode:e.keyCode;switch(t){case 38:this.frame.click("top");break;case 39:this.frame.click("right");break;case 40:this.frame.click("bottom");break;case 37:this.frame.click("left")}}},onResize:function(){this.width=this.$el.width(),this.height=this.$el.height()},setCity:function(){var e=this.collection.findWhere({slug:this.activeCity}),t=s.findWhere(this.cities,{model:e});t&&t["in"](),this.setPosition(!1),this.setDirections()},changeCity:function(e){if(e===this.activeCity)return!1;var t=this.collection.findWhere({slug:e}),n=s.findWhere(this.cities,{model:t});n&&n["in"]();var i;if(this.activeCity){var o=this.collection.findWhere({slug:this.activeCity});i=s.findWhere(this.cities,{model:o})}this.activeCity=e,this.setPosition().then(function(){i&&i.out()}),this.setDirections()},setPosition:function(){var e=this,t=void 0===arguments[0]?!0:arguments[0],n=this.map.getPosition(this.activeCity);if(!n)return!1;this.translateX=-100*n.left,this.translateY=-100*n.top;var i={translateX:this.translateX+"%",translateY:this.translateY+"%"};return this.isSliding=!0,new Promise(function(n){e.$(".cities__content").velocity("stop").velocity(i,{duration:t?800:0,complete:function(){e.isSliding=!1,n()}})})},setDirections:function(){var e=this.map.getDirections(this.activeCity);this.frame.model.set(e)},render:function(){return this.$el.html(this.template()),this.append(this.cities,".cities__content"),this.assign(this.menu,".cities__menu"),this.assign(this.frame,".cities__frame"),this.setCity(),this}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../models/FrameModel":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/models/FrameModel.js","../models/MapModel":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/models/MapModel.js","./CityView":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/CityView.js","./FrameView":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/FrameView.js","./MenuView":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/MenuView.js"}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/CityView.js":[function(e,t){(function(e){"use strict";var n=function(e){return e&&(e["default"]||e)},i=n("undefined"!=typeof window?window.Backbone:"undefined"!=typeof e?e.Backbone:null);t.exports=i.BetterView.extend({className:"city",template:'\n    <div class="city__content">\n      <div class="city__content__section">\n        <div class="city__title">\n          <div class="city__icon">\n            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 90 90">\n              <% _.each(paths, function(path) { %>\n              <path fill="#ffffff"\n                stroke="#ffffff"\n                stroke-width="1"\n                stroke-linecap="round"\n                stroke-linejoin="round"\n                d="<%= path %>"/>\n              <% }); %>\n            </svg>\n          </div>\n          <h1 class="city__name"> <% print(name.toUpperCase()); %> </h1>\n          <h2 class="city__country"> <% print(country.toUpperCase()); %> </h2>\n          <div class="city__square city__square--topLeft"></div>\n          <div class="city__square city__square--topRight"></div>\n          <div class="city__square city__square--bottomLeft"></div>\n          <div class="city__square city__square--bottomRight"></div>\n        </div>\n      </div>\n      <% if (localSlug) { %>\n      <div class="city__content__section city__content__section--button">\n        <div class="city__button">\n          <a href="#/local/<%= localSlug %>" class="city__link">\n            DÉCOUVRIR <% print(local.toUpperCase()); %>\n          </a>\n          <div class="city__border city__border--top"></div>\n          <div class="city__border city__border--left"></div>\n          <div class="city__border city__border--bottom"></div>\n          <div class="city__border city__border--right"></div>\n        </div>\n      </div>\n      <% } %>\n    </div>\n    <% if (background) { %>\n      <div class="city__background"\n        style="background-image:url(<%= background %>)"></div>\n    <% } %>\n  ',onInitialize:function(e){this.position=e.position},setPosition:function(){this.$el.css({left:100*this.position.left+"%",top:100*this.position.top+"%"})},"in":function(){},out:function(){},render:function(){return this.$el.html(this.template(this.model.toJSON())),this.setPosition(),this}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/CoverView.js":[function(e,t){(function(e){"use strict";var n=function(e){return e&&(e["default"]||e)},i=n("undefined"!=typeof window?window._:"undefined"!=typeof e?e._:null),s=n("undefined"!=typeof window?window.Backbone:"undefined"!=typeof e?e.Backbone:null);t.exports=s.BetterView.extend({className:"cover",template:'\n    <div class="cover__overlay"></div>\n    <a href="#/city/<%= slug %>" class="cover__link">\n      <div class="cover__title">\n        <h1 class="cover__name"> <% print(name.toUpperCase()); %> </h1>\n        <h2 class="cover__country"> <% print(country.toUpperCase()); %> </h2>\n      </div>\n    </a>\n    <% if (cover) { %>\n      <div class="cover__background"\n        style="background-image:url(<%= cover %>)"></div>\n    <% } %>\n  ',events:{mouseover:"onMouseover",mouseout:"onMouseout"},onInitialize:function(e){i.extend(this,i.pick(e,"type"))},onMouseover:function(){this.$(".cover__overlay").velocity("stop").velocity({opacity:.6},400),this.$(".cover__background").velocity("stop").velocity({scale:1.1},400),this.$(".cover__name").velocity("stop").velocity({opacity:1,top:0},300),this.$(".cover__country").velocity("stop").velocity({opacity:1,top:0},200)},onMouseout:function(){this.$(".cover__overlay").velocity("stop").velocity({opacity:0},400),this.$(".cover__background").velocity("stop").velocity({scale:1},400),this.$(".cover__name").velocity("stop").velocity({opacity:0,top:-30},300),this.$(".cover__country").velocity("stop").velocity({opacity:0,top:30},200)},"in":function(e){var t=this;return new Promise(function(n){t.$el.css("opacity",0).velocity({opacity:1},{duration:500,delay:e||0,complete:n})})},onRender:function(){this.$el.addClass("cover cover--type"+this.type)}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/FrameView.js":[function(e,t){(function(e){"use strict";var n=function(e){return e&&(e["default"]||e)},i=n("undefined"!=typeof window?window.Backbone:"undefined"!=typeof e?e.Backbone:null);t.exports=i.BetterView.extend({template:'\n    <div class="frame">\n      <a class="frame__bar frame__bar--top" data-direction="north">\n        <div class="frame__text frame__text--horizontal">\n          <span class="frame__letter"> N </span>\n        </div>\n        <div class="frame__arrow frame__arrow--top">\n          <div class="frame__arrow__container frame__arrow__container--top">\n            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 20 50">\n              <path fill="#ffffff" d="M20,50L10 40 0 50 0 0 20 0 z"/>\n            </svg>\n          </div>\n        </div>\n        <div class="frame__part frame__part--left"></div>\n        <div class="frame__part frame__part--right"></div>\n      </a>\n\n      <a class="frame__bar frame__bar--right" data-direction="east">\n        <div class="frame__text frame__text--vertical">\n          <div class="frame__letters frame__letters--vertical">\n            <span class="frame__letter frame__letter--vertical"> E </span>\n          </div>\n        </div>\n        <div class="frame__arrow frame__arrow--right">\n          <div class="frame__arrow__container frame__arrow__container--right">\n            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 50 20">\n              <path fill="#ffffff" d="M0,0L10 10 0 20 50 20 50 0 z"/>\n            </svg>\n          </div>\n        </div>\n        <div class="frame__part frame__part--top"></div>\n        <div class="frame__part frame__part--bottom"></div>\n      </a>\n\n      <a class="frame__bar frame__bar--bottom" data-direction="south">\n        <div class="frame__text frame__text--horizontal">\n          <span class="frame__letter"> S </span>\n        </div>\n        <div class="frame__arrow frame__arrow--bottom">\n          <div class="frame__arrow__container frame__arrow__container--bottom">\n            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 20 50">\n              <path fill="#ffffff" d="M20,0L10 10 0 0 0 50 20 50 z"/>\n            </svg>\n          </div>\n        </div>\n        <div class="frame__part frame__part--left"></div>\n        <div class="frame__part frame__part--right"></div>\n      </a>\n\n      <a class="frame__bar frame__bar--left" data-direction="west">\n        <div class="frame__text frame__text--vertical">\n          <div class="frame__letters frame__letters--vertical">\n            <span class="frame__letter frame__letter--vertical"> W </span>\n          </div>\n        </div>\n        <div class="frame__arrow frame__arrow--left">\n          <div class="frame__arrow__container frame__arrow__container--left">\n            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 50 20">\n              <path fill="#ffffff" d="M50,20L40 10 50 0 0 0 0 20 z"/>\n            </svg>\n          </div>\n        </div>\n        <div class="frame__part frame__part--top"></div>\n        <div class="frame__part frame__part--bottom"></div>\n      </a>\n    </div>\n  ',events:{"mouseover .frame__bar":"onMouseover","mouseout .frame__bar":"onMouseout"},onInitialize:function(){this.listenTo(this.model,"change",this.onChange)},onMouseover:function(e){var t=jQuery(e.currentTarget),n=t.attr("data-direction");n&&this.trigger("frame:over",n)},onMouseout:function(){this.trigger("frame:out")},onChange:function(){var e=this;["top","right","bottom","left"].forEach(function(t){var n=e.$(".frame__bar--"+t),i=n.attr("data-direction");e.model.has(i)?n.attr("href","#/city/"+e.model.get(i)).removeClass("is-inactive"):n.attr("href",null).addClass("is-inactive")})},click:function(e){var t=this.$(".frame__bar--"+e);return t[0].click(),!1},onUpdate:function(e){this.model.set(e)}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/HelpView.js":[function(e,t){(function(e){"use strict";var n=function(e){return e&&(e["default"]||e)},i=n("undefined"!=typeof window?window.Backbone:"undefined"!=typeof e?e.Backbone:null);t.exports=i.PageView.extend({className:"help",name:"help",template:"\n    <h1> Help </h1>\n  "})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/LoaderView.js":[function(e,t){(function(e){"use strict";var n=function(e){return e&&(e["default"]||e)},i=n("undefined"!=typeof window?window.Backbone:"undefined"!=typeof e?e.Backbone:null);t.exports=i.PageView.extend({className:"loader",name:"loader",template:'\n    <h1> Loader </h1>\n    <div class="loader__text"></div>\n    <div class="loader__progress"></div>\n  '})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/LocalView.js":[function(e,t){(function(e){"use strict";var n=function(e){return e&&(e["default"]||e)},i=n("undefined"!=typeof window?window.Backbone:"undefined"!=typeof e?e.Backbone:null);t.exports=i.PageView.extend({className:"local",name:"local",template:'\n    <h1 class="local__name"> Local: <%= name %> </h1>\n    <p class="local__bio"> <%= bio %> </p>\n  '})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/LocalsView.js":[function(e,t){(function(n){"use strict";var i=function(e){return e&&(e["default"]||e)},s=i("undefined"!=typeof window?window.Backbone:"undefined"!=typeof n?n.Backbone:null),o=i(e("./CoverView"));t.exports=s.PageView.extend({className:"locals",name:"locals",template2:'\n    <div class="locals__wrapper">\n      <div class="locals__outerContainer">\n        <div class="locals__innerContainer">\n          <div class="locals__content"></div>\n        </div>\n      </div>\n    </div>\n  ',template:'\n    <div class="locals__bars">\n      <div class="locals__bar locals__bar--top"></div>\n      <div class="locals__bar locals__bar--right"></div>\n      <div class="locals__bar locals__bar--bottom"></div>\n      <div class="locals__bar locals__bar--left"></div>\n    </div>\n\n    <a class="locals__icon locals__icon--close">\n      <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 50 50">\n        <line stroke="#000000" stroke-width="2" x1="13.3" y1="36.7" x2="36.7" y2="13.3"/>\n        <line stroke="#000000" stroke-width="2" x1="13.3" y1="13.3" x2="36.7" y2="36.7"/>\n      </svg>\n    </a>\n\n    <div class="locals__wrapper">\n      <ul class="locals__content"></ul>\n    </div>\n  ',onInitialize:function(){this.covers=this.collection.map(function(e,t){return new o({model:e,type:t%4})})},onRemove:function(){this.covers.forEach(function(e){return e.remove()})},"in":function(){var e=this;return new Promise(function(t){e.covers.forEach(function(e,t){e["in"](200*t+200)}),t()})},render:function(){return this.$el.html(this.template()),this.append(this.covers,".locals__content"),this}})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./CoverView":"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/CoverView.js"}],"/Users/valentin/Documents/repos/localeyes-es6/app/src/scripts/views/MenuView.js":[function(e,t){(function(e){"use strict";var n=function(e){return e&&(e["default"]||e)},i=n("undefined"!=typeof window?window.Backbone:"undefined"!=typeof e?e.Backbone:null);t.exports=i.BetterView.extend({template:'\n    <div class="menu">\n      <a href="#/locals" class="menu__icon menu__icon--bottomRight menu__icon--locals">\n        <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">\n          <line stroke="#ffffff" stroke-width="1" x1="5.8" y1="10.2" x2="34.2" y2="10.2"/>\n          <line stroke="#ffffff" stroke-width="1" x1="5.8" y1="20" x2="34.2" y2="20"/>\n          <line stroke="#ffffff" stroke-width="1" x1="5.8" y1="29.8" x2="34.2" y2="29.8"/>\n        </svg>\n      </a>\n\n      <a href="#/city/paris" class="menu__icon menu__icon--topRight menu__icon--map">\n        <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">\n          <path fill="none"\n            stroke="#ffffff"\n            stroke-width="1"\n            stroke-linecap="round"\n            stroke-linejoin="round"\n            d="M35.2,30.3L26.4 34.6 14.4 28.4 4.8 33.2 4.8 10.1 14.4 5.4 26.4 11.6 35.2 7.2 z"/>\n          <line stroke="#ffffff" stroke-width="1" x1="14.4" y1="5.4" x2="14.4" y2="28.4"/>\n          <line stroke="#ffffff" stroke-width="1" x1="26.4" y1="11.6" x2="26.4" y2="34.6"/>\n        </svg>\n      </a>\n\n      <a href="#" class="menu__icon menu__icon--bottomLeft menu__icon--share">\n        <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">\n          <path fill="none"\n            stroke="#ffffff"\n            stroke-width="1"\n            stroke-linecap="round"\n            stroke-linejoin="round"\n            d="M17.2,22.9L3.1 17.2 36.9 3.1 22.8 36.9 z"/>\n          <line stroke="#ffffff" stroke-width="1" x1="17.2" y1="22.9" x2="36.9" y2="3.1"/>\n        </svg>\n      </a>\n      \n      <a href="#/help" class="menu__icon menu__icon--topLeft menu__icon--help">\n        <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 40 40">\n          <rect fill="#ffffff" x="18.5" y="16.1" width="3" height="15.2"/>\n          <circle fill="#ffffff" cx="20" cy="10.8" r="2.2"/>\n        </svg>\n      </a>\n    </div>\n  '})
}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},["./app/src/scripts/main.js"]);