# mSwiper.js &middot; [![downloads](https://img.shields.io/badge/downloads-3k-brightgreen.svg)](https://github.com/JohnsenZhou/mSwiper.js/releases/tag/v1.1.2)    [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/JohnsenZhou/mSwiper.js/blob/master/LICENSE)

[View README in English](https://github.com/JohnsenZhou/mSwiper.js/blob/master/README_en.md)

[项目地址](https://github.com/JohnsenZhou/mSwiper.js)

> 移动端微型 **swiper** 插件，小而美，无依赖.

## 前言

**mSwiper** 相对于其他的swiper插件而言，最大的优势就是 **小**，压缩后仅 **3k** ,能满足部分开发需求。插件的开发采用 **组合使用构造函数模式和原型模式**，通过 **Gulp** 构建，感兴趣的可以阅读源码🦄。欢迎 **star** 🌟

> 若有问题，请提issue

## 效果演示

[在线浏览Demo请戳这里](https://johnsenzhou.github.io/mSwiper.js/)

### 手机浏览请扫描下方二维码
![在线浏览](https://raw.githubusercontent.com/JohnsenZhou/NodeApp-Deploy/img/swiper.png)

## 开发

``` bash
# 克隆本仓库
git clone https://github.com/JohnsenZhou/mSwiper.js.git

# 进入仓库目录
cd mSwiper.js

# 安装依赖
npm install

# 启动项目，本地浏览地址 => localhost:8080
gulp

# 打包压缩
gulp build

```


## 安装
前往 **[release](https://github.com/JohnsenZhou/mSwiper.js/releases)** 下载所需版本。

## 使用

```
<ul id="selector">
  <li>
    <img src="./img/1.jpg">
  </li>
  <li>
    <img src="./img/2.jpg">
  </li>
  <li>
    <img src="./img/3.jpg">
  </li>
  <li>
    <img src="./img/4.jpg">
  </li>
  <li>
    <img src="./img/5.jpg">
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

## Api

### new mSwiper(options)

``options`` 具体参数：

| 参数        | 类型           | 默认值  | 功能描述  |
| ------------- |:-------------:| -----:| -----:|
| selector      | string | #selector | 容器选择器  |
| isAutoPlay      | bool      |   false| 是否自动播放  |
| isManual | bool      |    false | 是否支持手指滑动  |
| autoPlayTime | number      |    5000 | 自动播放间隔时间  |
| goDirection | string      |    left | 自动播放方向(left&right)  |

## License

[MIT](https://github.com/JohnsenZhou/mSwiper.js/blob/master/LICENSE) License
