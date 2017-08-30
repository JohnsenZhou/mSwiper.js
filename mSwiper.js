/*!
 * mSwiper.js
 * @version 1.0.0
 */

(function (name, definition) {
  if (typeof definition === 'function') {
    define(definition);
  } else {
    this[name] = definition();
  }
})('mSwiper', function(){
  function mSwiper(selector) {
    this.list = document.querySelector(selector);
    this.x0 = 0;
    this.y0 = 0;
    this.hasmoved = 0;
    this.lock = 0;
    this.queue = [];
    this.css = [
      "-webkit-transition: -webkit-transform .3s ease; z-index: 3; -webkit-transform: translate3d(0, 0, 10px) scale3d(1, 1, 1); visibility: visible;", 
      "-webkit-transition: -webkit-transform .3s ease; z-index: 2; -webkit-transform: translate3d(" + rem(-148) + ", 0, 6px) scale3d(.8, .8, 1); visibility: visible;", 
      "-webkit-transition: -webkit-transform .3s ease; z-index: 2; -webkit-transform: translate3d(" + rem(148) + ", 0, 6px) scale3d(.8, .8, 1); visibility: visible;", 
      "-webkit-transition: -webkit-transform .3s ease; z-index: 1; -webkit-transform: translate3d(" + rem(-240) + ", 0, 2px) scale3d(.667, .667, 1); visibility: visible;", 
      "-webkit-transition: -webkit-transform .3s ease; z-index: 1; -webkit-transform: translate3d(" + rem(240) + ", 0, 2px) scale3d(.667, .667, 1); visibility: visible;"
    ];

    this._init();

  }

  mSwiper.prototype._init = function() {

  }

  mSwiper.prototype.touchstartHandle = function(e) {
    var touch = e.targetTouches[0],
        x = touch.pageX,
        y = touch.pageY;
    this.x0 = x;
    this.y0 = y;
    this.hasmoved = 0;
    this.lock = 0;
  }

  mSwiper.prototype.touchmoveHandle = function(e) {
    if(this.lock) return;
    var touch = e.targetTouches[0],
        x = touch.pageX,
        y = touch.pageY,
        offsetX = this.x0 - x,
        offsetY = this.y0 - y;
    // 阻止滚动
    this.hasmoved || (this.hasmoved = 1, Math.abs(offsetX) > Math.abs(offsetY) && e.preventDefault());
    if(offsetX <= 50) {
      // 向右
      console.log("向右");

    }
  }

})