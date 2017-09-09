# mSwiper.js &middot; [![downloads](https://img.shields.io/badge/downloads-1.2k-brightgreen.svg)](https://github.com/JohnsenZhou/mSwiper.js/releases/tag/v1.1.2)    [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/JohnsenZhou/mSwiper.js/blob/master/LICENSE)


[View README in Chinese](https://github.com/JohnsenZhou/mSwiper.js/blob/master/README.md)

> A mini **swiper** for mobile, no dependent.

## Result
[Click to see the demo online](https://johnsenzhou.github.io/mSwiper.js/)
### Scaning ths qrcode with you phone
![在线浏览](https://raw.githubusercontent.com/JohnsenZhou/NodeApp-Deploy/img/swiper.png)

## Develop

``` bash
# clone the repository
git clone https://github.com/JohnsenZhou/mSwiper.js.git

# go to the repository catalog
cd mSwiper.js

# install dependencies
npm install

# serve with hot reload at localhost:8080
gulp

# build for production with minification
gulp build

```

## Download
Go to **[release](https://github.com/JohnsenZhou/mSwiper.js/releases)** to download which version you need.

## Using

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
    selector: "#selector",
    isAutoPlay: true,
    autoPlayTime: 3000,
  }
  var mSwiper = new mSwiper(options);
</script>
```
**mSwiper** is also supported ``AMD`` standard，you can use ``require.js`` to load it：

```
require(['mSwiper'], function(mSwiper) {
  var options = {
    selector: "#selector",
    isAutoPlay: true,   
    autoPlayTime: 3000,  
  }
  var mSwiper = new mSwiper(options);
})
```

## Api

### new mSwiper(options)

``options`` parameters：

| parameter        | type           | default  | description  |
| ------------- |:-------------:| -----:| -----|
| selector      | string | #selector | HTMLElement or string (with CSS Selector) of swiper container HTML element. Required.  |
| isAutoPlay      | bool      |   false| Auto play will be disabled when the value is false.  |
| isManual | bool      |    false | Slide the img manually  |
| autoPlayTime | number      |    5000 | Delay between transitions (in ms).  |
| goDirection | string      |    left | The auto play direction(left&right).  |

## License

[MIT](https://github.com/JohnsenZhou/mSwiper.js/blob/master/LICENSE) License
