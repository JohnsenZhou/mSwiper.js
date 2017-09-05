# mSwiper.js

[View README in English](https://github.com/JohnsenZhou/vue-mobile-starter/blob/master/README_en.md)

> 移动端微型 **swiper** 插件，小而美，无依赖.

## 效果演示
[在线浏览Demo请戳这里](https://johnsenzhou.github.io/mSwiper.js/)
### 手机浏览请扫描下方二维码
![在线浏览](https://raw.githubusercontent.com/JohnsenZhou/NodeApp-Deploy/img/swiper.png)


## 安装
前往 **[release](https://github.com/JohnsenZhou/mSwiper.js/releases)** 下载所需版本。

## 使用

```
<ul id="selector">
  <li>
    <img src="http://jdc.jd.com/img/600x264?color=ff736d&text=1">
  </li>
  <li>
    <img src="http://jdc.jd.com/img/600x264?color=4186c7&text=2">
  </li>
  <li>
    <img src="http://jdc.jd.com/img/600x264?color=f5d328&text=3">
  </li>
  <li>
    <img src="http://jdc.jd.com/img/600x264?color=65ac3a&text=4">
  </li>
  <li>
    <img src="http://jdc.jd.com/img/600x264?color=da8116&text=5">
  </li>
</ul>
<script src="../src/mSwiper.js"></script>
<script>
  var options = {
    selector: "#selector",  // 节点选择
    isAutoPlay: true,       // 是否自动播放
    autoPlayTime: 3000,     // 设置自动播放时间
  }
  var mSwiper = new mSwiper(options);
</script>
```
**mSwiper** 同时也支持 ``AMD`` 规范，你可以通过 ``require.js`` 进行加载使用：

```
require(['mSwiper'], function(mSwiper) {
  var options = {
    selector: "#selector",  // 节点选择
    isAutoPlay: true,       // 是否自动播放
    autoPlayTime: 3000,     // 设置自动播放时间
  }
  var mSwiper = new mSwiper(options);
})
```

## api

### new mSwiper(options)

``options`` 具体参数：

| 参数        | 类型           | 默认值  | 功能描述  |
| ------------- |:-------------:| -----:| -----:|
| selector      | String | #selector | 容器选择器  |
| isAutoPlay      | bool      |   false| 是否自动播放  |
| isManual | bool      |    false | 是否支持手指滑动  |
| autoPlayTime | number      |    5000 | 自动播放间隔时间  |

## License

[MIT](https://github.com/JohnsenZhou/mSwiper.js/blob/master/LICENSE) License
