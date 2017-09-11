(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mSwiper = require('../../mSwiper');
var options = {
  selector: "#selector",  // 节点选择
  isAutoPlay: true,       // 是否自动播放
  autoPlayTime: 3000,     // 设置自动播放时间
  isManual: true,         // 是否支持手动切换
}
new mSwiper(options);

},{"../../mSwiper":2}],2:[function(require,module,exports){
/*!
 * mSwiper.js
 * @version 1.0.0
 */
(function (name, definition) {

  // Export the mSwiper object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `mSwiper` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = definition();
    }
    exports[name] = definition();
  } else if (typeof define === 'function' && define.amd) {
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
    setInterval(function() {
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZGVtby9saWIvY21kLmpzIiwic3JjL21Td2lwZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgbVN3aXBlciA9IHJlcXVpcmUoJy4uLy4uL21Td2lwZXInKTtcbnZhciBvcHRpb25zID0ge1xuICBzZWxlY3RvcjogXCIjc2VsZWN0b3JcIiwgIC8vIOiKgueCuemAieaLqVxuICBpc0F1dG9QbGF5OiB0cnVlLCAgICAgICAvLyDmmK/lkKboh6rliqjmkq3mlL5cbiAgYXV0b1BsYXlUaW1lOiAzMDAwLCAgICAgLy8g6K6+572u6Ieq5Yqo5pKt5pS+5pe26Ze0XG4gIGlzTWFudWFsOiB0cnVlLCAgICAgICAgIC8vIOaYr+WQpuaUr+aMgeaJi+WKqOWIh+aNolxufVxubmV3IG1Td2lwZXIob3B0aW9ucyk7XG4iLCIvKiFcbiAqIG1Td2lwZXIuanNcbiAqIEB2ZXJzaW9uIDEuMC4wXG4gKi9cbihmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuXG4gIC8vIEV4cG9ydCB0aGUgbVN3aXBlciBvYmplY3QgZm9yICoqTm9kZS5qcyoqLCB3aXRoXG4gIC8vIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5IGZvciB0aGUgb2xkIGByZXF1aXJlKClgIEFQSS4gSWYgd2UncmUgaW5cbiAgLy8gdGhlIGJyb3dzZXIsIGFkZCBgbVN3aXBlcmAgYXMgYSBnbG9iYWwgb2JqZWN0LlxuICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKCk7XG4gICAgfVxuICAgIGV4cG9ydHNbbmFtZV0gPSBkZWZpbml0aW9uKCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGRlZmluaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIHRoaXNbbmFtZV0gPSBkZWZpbml0aW9uKCk7XG4gIH1cbn0pKCdtU3dpcGVyJywgZnVuY3Rpb24oKXtcbiAgZnVuY3Rpb24gbVN3aXBlcihvcHRpb25zKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBvcHRpb25zLnNlbGVjdG9yID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLnNlbGVjdG9yKSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWxlY3RvcicpO1xuICAgIHRoaXMuaXRlbSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG4gICAgdGhpcy5pc01hbnVhbCA9IG9wdGlvbnMuaXNNYW51YWwgPyBvcHRpb25zLmlzTWFudWFsIDogZmFsc2U7XG4gICAgdGhpcy5pc0F1dG9QbGF5ID0gb3B0aW9ucy5pc0F1dG9QbGF5ID8gb3B0aW9ucy5pc0F1dG9QbGF5IDogZmFsc2U7XG4gICAgdGhpcy5nb0RpcmVjdGlvbiA9IG9wdGlvbnMuZ29EaXJlY3Rpb24gPyBvcHRpb25zLmdvRGlyZWN0aW9uIDogJ2xlZnQnO1xuICAgIHRoaXMuYXV0b1BsYXlUaW1lID0gb3B0aW9ucy5hdXRvUGxheVRpbWUgPyBvcHRpb25zLmF1dG9QbGF5VGltZSA6IDUwMDA7XG4gICAgdGhpcy54MCA9IDA7XG4gICAgdGhpcy55MCA9IDA7XG4gICAgdGhpcy5oYXNtb3ZlZCA9IDA7XG4gICAgdGhpcy5sb2NrID0gMDtcbiAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgdGhpcy52aXJ0dWFsID0gW107XG4gICAgdGhpcy5jc3MgPSBbXG4gICAgICBcIi13ZWJraXQtdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gLjNzIGVhc2U7IHotaW5kZXg6IDM7IC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAxMHB4KSBzY2FsZTNkKDEsIDEsIDEpOyB2aXNpYmlsaXR5OiB2aXNpYmxlO1wiLFxuICAgICAgXCItd2Via2l0LXRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIC4zcyBlYXNlOyB6LWluZGV4OiAyOyAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoXCIgKyB0aGlzLnJlbSgtMTQ4KSArIFwiLCAwLCA2cHgpIHNjYWxlM2QoLjgsIC44LCAxKTsgdmlzaWJpbGl0eTogdmlzaWJsZTtcIixcbiAgICAgIFwiLXdlYmtpdC10cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAuM3MgZWFzZTsgei1pbmRleDogMjsgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKFwiICsgdGhpcy5yZW0oMTQ4KSArIFwiLCAwLCA2cHgpIHNjYWxlM2QoLjgsIC44LCAxKTsgdmlzaWJpbGl0eTogdmlzaWJsZTtcIixcbiAgICAgIFwiLXdlYmtpdC10cmFuc2l0aW9uOiAtd2Via2l0LXRyYW5zZm9ybSAuM3MgZWFzZTsgei1pbmRleDogMTsgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKFwiICsgdGhpcy5yZW0oLTI0MCkgKyBcIiwgMCwgMnB4KSBzY2FsZTNkKC42NjcsIC42NjcsIDEpOyB2aXNpYmlsaXR5OiB2aXNpYmxlO1wiLFxuICAgICAgXCItd2Via2l0LXRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIC4zcyBlYXNlOyB6LWluZGV4OiAxOyAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoXCIgKyB0aGlzLnJlbSgyNDApICsgXCIsIDAsIDJweCkgc2NhbGUzZCguNjY3LCAuNjY3LCAxKTsgdmlzaWJpbGl0eTogdmlzaWJsZTtcIlxuICAgIF07XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIG1Td2lwZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiBpbml0KCkge1xuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlW1wiLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGVcIl0gPSBcInByZXNlcnZlLTNkXCI7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbS5sZW5ndGg7IGkgKyspIHtcbiAgICAgIHRoaXMuaXRlbVtpXS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIlxuICAgIH1cbiAgICB0aGlzLnF1ZXVlID0gKGZ1bmN0aW9uKGxlbikge1xuICAgICAgdmFyIGFyciA9IFtdO1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGFycltpXSA9IGk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0pKHRoaXMuaXRlbS5sZW5ndGgpO1xuICAgIHRoaXMudmlydHVhbCA9IG5ldyBBcnJheSh0aGlzLml0ZW0ubGVuZ3RoKTtcbiAgICB0aGlzLnN3YXAoKTtcbiAgICBpZih0aGlzLml0ZW0ubGVuZ3RoIDw9IDEpIHJldXRybjtcblxuICAgIHRoaXMuaXNBdXRvUGxheSA/IHRoaXMuYXV0b1BsYXkoKSA6ICcnO1xuICAgIHRoaXMuaXNNYW51YWwgPyB0aGlzLm1hbnVhbCgpIDp0aGlzLmRlc3RvcnkoKTtcbiAgfVxuXG4gIG1Td2lwZXIucHJvdG90eXBlLnRvdWNoc3RhcnRIYW5kbGUgPSBmdW5jdGlvbiB0b3VjaHN0YXJ0SGFuZGxlKGUpIHtcbiAgICB2YXIgdG91Y2ggPSBlLnRhcmdldFRvdWNoZXNbMF0sXG4gICAgICAgIHggPSB0b3VjaC5wYWdlWCxcbiAgICAgICAgeSA9IHRvdWNoLnBhZ2VZO1xuICAgIHRoaXMueDAgPSB4O1xuICAgIHRoaXMueTAgPSB5O1xuICAgIHRoaXMuaGFzbW92ZWQgPSAwO1xuICAgIHRoaXMubG9jayA9IDA7XG4gIH1cblxuICBtU3dpcGVyLnByb3RvdHlwZS50b3VjaG1vdmVIYW5kbGUgPSBmdW5jdGlvbiB0b3VjaG1vdmVIYW5kbGUoZSkge1xuICAgIGlmKHRoaXMubG9jaykgcmV0dXJuO1xuICAgIHZhciB0b3VjaCA9IGUudGFyZ2V0VG91Y2hlc1swXSxcbiAgICAgICAgeCA9IHRvdWNoLnBhZ2VYLFxuICAgICAgICB5ID0gdG91Y2gucGFnZVksXG4gICAgICAgIG9mZnNldFggPSB0aGlzLngwIC0geCxcbiAgICAgICAgb2Zmc2V0WSA9IHRoaXMueTAgLSB5O1xuICAgIC8vIOmYu+atoua7muWKqFxuICAgIHRoaXMuaGFzbW92ZWQgfHwgKHRoaXMuaGFzbW92ZWQgPSAxLCBNYXRoLmFicyhvZmZzZXRYKSA+IE1hdGguYWJzKG9mZnNldFkpICYmIGUucHJldmVudERlZmF1bHQoKSk7XG4gICAgaWYob2Zmc2V0WCA8PSAtNTApIHtcbiAgICAgIC8vIOWQkeWPs1xuICAgICAgLy8gY29uc29sZS5sb2coXCLlkJHlj7NcIik7XG4gICAgICB0aGlzLnF1ZXVlLnVuc2hpZnQodGhpcy5xdWV1ZS5wb3AoKSk7XG4gICAgICB0aGlzLmxvY2sgPSAxO1xuICAgICAgdGhpcy5zd2FwKFwicmlnaHRcIik7XG4gICAgfSBlbHNlIGlmKG9mZnNldFggPj0gNTApIHtcbiAgICAgIC8vIOWQkeW3plxuICAgICAgLy8gY29uc29sZS5sb2coXCLlkJHlt6ZcIik7XG4gICAgICB0aGlzLnF1ZXVlLnB1c2godGhpcy5xdWV1ZS5zaGlmdCgpKTtcbiAgICAgIHRoaXMubG9jayA9IDE7XG4gICAgICB0aGlzLnN3YXAoXCJsZWZ0XCIpO1xuICAgIH1cbiAgfVxuXG4gIG1Td2lwZXIucHJvdG90eXBlLnN3YXAgPSBmdW5jdGlvbiBzd2FwKGRlc2NyaXB0aW9uKSB7XG4gICAgdmFyIG9RdWV1ZSA9IFtdLmNvbmNhdCh0aGlzLnF1ZXVlKSxcbiAgICAgICAgdG90YWwgPSB0aGlzLnZpcnR1YWwubGVuZ3RoLCAvLyBpdGVt5oC75pWwXG4gICAgICAgIGxhc3QgPSB0b3RhbCAtIDEsIC8v5pyA5ZCO5LiA5Liq57Si5byVXG4gICAgICAgIGNvbGxlY3QgPSAwLFxuICAgICAgICB2aXJ0dWFsID0gbmV3IEFycmF5KHRvdGFsKSxcbiAgICAgICAgb2RkID0gMTtcbiAgICAvLyDmj5Dlj5bliY3kuInkuKrlhYPntKDkuI7lkI7kuInkuKrlhYPntKBcbiAgICB3aGlsZShjb2xsZWN0IDwgNSAmJiBvUXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgdmlydHVhbFtvZGQgPyBvUXVldWUuc2hpZnQoKSA6IG9RdWV1ZS5wb3AoKV0gPSB0aGlzLmNzc1tjb2xsZWN0ID09IGxhc3QgJiYgIW9kZCAmJiBcInJpZ2h0XCIgPT0gb3JpZW50YXRpb24gPyArK2NvbGxlY3QgOiBjb2xsZWN0KytdOyAvLyDlgZrkuIDkuKrmlrnlkJHkvJjljJZcbiAgICAgIG9kZCA9ICFvZGQ7XG4gICAgfVxuICAgIC8vIOWvueavlOS4i+aVsOe7hFxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0b3RhbDsgaSsrKSB7XG4gICAgICB2aXJ0dWFsW2ldICE9IHRoaXMudmlydHVhbFtpXSAmJiAodGhpcy52aXJ0dWFsW2ldID0gdmlydHVhbFtpXSwgdGhpcy5pdGVtW2ldLnN0eWxlLmNzc1RleHQgPSB0aGlzLnZpcnR1YWxbaV0gfHwgXCJ2aXNpYmlsaXR5OiBoaWRkZW5cIik7XG4gICAgfVxuXG4gIH1cblxuICBtU3dpcGVyLnByb3RvdHlwZS5hdXRvUGxheSA9IGZ1bmN0aW9uIGF1dG9QbGF5KCkge1xuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5nb0RpcmVjdGlvbiA9PT0gJ2xlZnQnXG4gICAgICAgID8gdGhpcy5xdWV1ZS5wdXNoKHRoaXMucXVldWUuc2hpZnQoKSlcbiAgICAgICAgOiB0aGlzLmdvRGlyZWN0aW9uID09PSAncmlnaHQnXG4gICAgICAgICAgICA/IHRoaXMucXVldWUudW5zaGlmdCh0aGlzLnF1ZXVlLnBvcCgpKVxuICAgICAgICAgICAgOiB0aGlzLnF1ZXVlLnB1c2godGhpcy5xdWV1ZS5zaGlmdCgpKTs7XG4gICAgICB0aGlzLmxvY2sgPSAxO1xuICAgICAgdGhpcy5zd2FwKHRoaXMuZ29EaXJlY3Rpb24pO1xuICAgIH0uYmluZCh0aGlzKSwgdGhpcy5hdXRvUGxheVRpbWUpO1xuICB9XG5cbiAgbVN3aXBlci5wcm90b3R5cGUubWFudWFsID0gZnVuY3Rpb24gbWFudWFsKCkge1xuICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMudG91Y2hzdGFydEhhbmRsZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMudG91Y2htb3ZlSGFuZGxlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgbVN3aXBlci5wcm90b3R5cGUuZGVzdG9yeSA9IGZ1bmN0aW9uIGRlc3RvcnkoKSB7XG4gICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50b3VjaHN0YXJ0SGFuZGxlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy50b3VjaG1vdmVIYW5kbGUuYmluZCh0aGlzKSk7XG4gIH1cblxuICBtU3dpcGVyLnByb3RvdHlwZS5yZW0gPSBmdW5jdGlvbiByZW0ocHgpIHtcbiAgICByZXR1cm4gcHggLyA0MCArIFwicmVtXCI7XG4gIH1cblxuICByZXR1cm4gbVN3aXBlcjtcbn0pXG4iXX0=
