/*!
 * mSwiper.js
 * @version 1.0.0
 */
(function (name, definition) {
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = definition();
    }
  } else if (typeof define === 'function') {
    define(definition);
  } else {
    this[name] = definition();
  }
})('mSwiper', function(){
  function mSwiper(options) {
    this.container = options.selector ? document.querySelector(options.selector) : document.querySelector('#selector');
    this.item = this.container.querySelectorAll('li');
    this.isManual = options.isManual ? options.isManual : false;
    this.isAutoPlay = options.isAutoPlay ? options.isAutoPlay : false;
    this.goDirection = options.goDirection ? options.goDirection : 'left';
    this.autoPlayTime = options.autoPlayTime ? options.autoPlayTime : 5000;
    this.timer;
    this.x0 = 0;
    this.y0 = 0;
    this.hasmoved = 0;
    this.lock = 0;
    this.queue = [];
    this.virtual = [];
    this.css = [
      "-webkit-transition: -webkit-transform .3s ease; z-index: 3; -webkit-transform: translate3d(0, 0, 10px) scale3d(1, 1, 1); visibility: visible;", 
      "-webkit-transition: -webkit-transform .3s ease; z-index: 2; -webkit-transform: translate3d(" + this.rem(-148) + ", 0, 6px) scale3d(.8, .8, 1); visibility: visible;", 
      "-webkit-transition: -webkit-transform .3s ease; z-index: 2; -webkit-transform: translate3d(" + this.rem(148) + ", 0, 6px) scale3d(.8, .8, 1); visibility: visible;", 
      "-webkit-transition: -webkit-transform .3s ease; z-index: 1; -webkit-transform: translate3d(" + this.rem(-240) + ", 0, 2px) scale3d(.667, .667, 1); visibility: visible;", 
      "-webkit-transition: -webkit-transform .3s ease; z-index: 1; -webkit-transform: translate3d(" + this.rem(240) + ", 0, 2px) scale3d(.667, .667, 1); visibility: visible;"
    ];

    this.init();
  }

  mSwiper.prototype.init = function init() {
    this.container.style["-webkit-transform-style"] = "preserve-3d";
    for(var i = 0; i < this.item.length; i ++) {
      this.item[i].style.visibility = "hidden"
    }
    this.queue = (function(len) {
      var arr = [];
      for(var i = 0; i < len; i++) {
        arr[i] = i;
      }
      return arr;
    })(this.item.length);
    this.virtual = new Array(this.item.length);
    this.swap();
    if(this.item.length <= 1) reutrn;

    this.isAutoPlay ? this.autoPlay() : '';
    this.isManual ? this.manual() :this.destory();
  }

  mSwiper.prototype.touchstartHandle = function touchstartHandle(e) {
    var touch = e.targetTouches[0],
        x = touch.pageX,
        y = touch.pageY;
    this.x0 = x;
    this.y0 = y;
    this.hasmoved = 0;
    this.lock = 0;
  }

  mSwiper.prototype.touchmoveHandle = function touchmoveHandle(e) {
    if(this.lock) return;
    clearInterval(this.timer)
    var touch = e.targetTouches[0],
        x = touch.pageX,
        y = touch.pageY,
        offsetX = this.x0 - x,
        offsetY = this.y0 - y;
    // 阻止滚动
    this.hasmoved || (this.hasmoved = 1, Math.abs(offsetX) > Math.abs(offsetY) && e.preventDefault());
    if(offsetX <= -50) {
      // 向右
      // console.log("向右");
      this.queue.unshift(this.queue.pop());
      this.lock = 1;
      this.swap("right");
      this.autoPlay();
    } else if(offsetX >= 50) {
      // 向左
      // console.log("向左");
      this.queue.push(this.queue.shift());
      this.lock = 1;
      this.swap("left");
      this.autoPlay();
    }
  }

  mSwiper.prototype.swap = function swap(description) {
    var oQueue = [].concat(this.queue),
        total = this.virtual.length, // item总数
        last = total - 1, //最后一个索引
        collect = 0,
        virtual = new Array(total),
        odd = 1;
    // 提取前三个元素与后三个元素
    while(collect < 5 && oQueue.length > 0) {
      virtual[odd ? oQueue.shift() : oQueue.pop()] = this.css[collect == last && !odd && "right" == orientation ? ++collect : collect++]; // 做一个方向优化
      odd = !odd;
    }
    // 对比下数组
    for(var i = 0; i < total; i++) {
      virtual[i] != this.virtual[i] && (this.virtual[i] = virtual[i], this.item[i].style.cssText = this.virtual[i] || "visibility: hidden");
    }
  }

  mSwiper.prototype.autoPlay = function autoPlay() {
    this.timer = setInterval(function() {
      this.goDirection === 'left' 
        ? this.queue.push(this.queue.shift())
        : this.goDirection === 'right'
            ? this.queue.unshift(this.queue.pop()) 
            : this.queue.push(this.queue.shift());;
      this.lock = 1;
      this.swap(this.goDirection);
    }.bind(this), this.autoPlayTime);
  }

  mSwiper.prototype.manual = function manual() {
    this.container.addEventListener("touchstart", this.touchstartHandle.bind(this));
    this.container.addEventListener("touchmove", this.touchmoveHandle.bind(this));
  }

  mSwiper.prototype.destory = function destory() {
    this.container.removeEventListener("touchstart", this.touchstartHandle.bind(this));
    this.container.removeEventListener("touchmove", this.touchmoveHandle.bind(this));
  }

  mSwiper.prototype.rem = function rem(px) {
    return px / 40 + "rem";
  }
  
  return mSwiper;
})
