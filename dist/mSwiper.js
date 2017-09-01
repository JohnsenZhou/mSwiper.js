/*!
 * mSwiper.js
 * @version 1.0.0
 */
(function (name, definition) {
    this[name] = definition();
})('mSwiper', function(){
  function mSwiper(selector) {
    this.container = document.querySelector(selector);
    this.item = this.container.querySelectorAll('li');
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

    this._init();

  }

  mSwiper.prototype._init = function() {
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
    this.container.addEventListener("touchstart", this.touchstartHandle.bind(this));
    this.container.addEventListener("touchmove", this.touchmoveHandle.bind(this));
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
    if(offsetX <= -50) {
      // 向右
      // console.log("向右");
      this.queue.unshift(this.queue.pop());
      this.lock = 1;
      this.swap("right");
    } else if(offsetX >= 50) {
      // 向左
      // console.log("向左");
      this.queue.push(this.queue.shift());
      this.lock = 1;
      this.swap("left");
    }
  }

  mSwiper.prototype.swap = function(description) {
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

  mSwiper.prototype.destory = function() {
    this.container.removeEventListener("touchstart", this.touchstartHandle);
    this.container.removeEventListener("touchmove", this.touchmoveHandle);
  }

  mSwiper.prototype.rem = function(px) {
    return px / 40 + "rem";
  }
  
  return mSwiper;
})