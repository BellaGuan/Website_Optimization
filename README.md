### 优化措施
#### Part 1: 优化 index.html 的 PageSpeed Insights 得分

- 用了gulp~ 命令行里依次输入以下指令：（每次编辑jss或css,将会自动压缩保存它们到dist文件里）
```
cd [项目的根目录]
npm install gulp --save-dev
npm install
gulp
```
- 利用media query创造非阻塞式的css,如print.css添加media="print"；
- 利用 Web Font Loader 来实现异步载入字体资源；
- 用inline css代替外部css,减少浏览器的请求次数,并压缩css；
- 压缩所有图片的大小和图片pizzaria的尺寸。
----

#### Part 2: 优化 pizza.html 的 FPS（每秒帧数）
- 用getElementsBy*代替querySelector*，提高效率。

1. 在changePizzaSizes函数里
-  “document.querySelectorAll(".randomPizzaContainer")”在函数出现了四次，将其储存在一个变量中感觉会更好点；
- 将变量newwidth和变量dx移出for循环，并且只需访问一个元素的offsetWidth
>  for循环中offsetWidth多次导致强制布局;
又因为每个有randomPizzaContainer类的元素的offsetWidth是相同的，无需遍历所有元素的offsetWidth。

2. 在updatePosition函数里
- for循环里的scrollTop导致多次强制布局，可在循环外访问scrollTop并储存在一个变量里。
- tramsform 代替 left 去移动pizza，因为items[i].basicLeft返回值较大和translateX是做相对移动的，导致部分pizza跑散,所以去掉items[i].basicLeft和在初始化背景披萨mover的时候，为其设置初始位置。

3.针对浏览器的高度来确定需要的滑动pizza个数，这样就可以适配不同的设备尺寸。
```
  var h=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var pizzasNum=Math.ceil(h/256)*cols;
```

### 一些关于优化的提示与诀窍
* [web 性能优化](https://developers.google.com/web/fundamentals/performance/ "web 性能")
* [分析关键渲染路径](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "分析关键渲染路径")
* [优化关键渲染路径](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "优化关键渲染路径！")
* [避免 CSS 渲染阻塞](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "css渲染阻塞")
* [优化 JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [通过 Navigation Timing 进行检测](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api")。自动分析页面性能
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">下载量越少，性能越好</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">减少文本的大小</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">优化图片</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP缓存</a>
* [更多关于整合ngrok、Grunt和PageSpeed的信息](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)。
* [Chrome 开发者工具帮助](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### 使用 Bootstrap 并定制样式
所有的定制样式都在项目代码库的 `dist/css/portfolio.css` 中。

* <a href="http://getbootstrap.com/css/">Bootstrap CSS</a>
* <a href="http://getbootstrap.com/components/">Bootstrap组件</a>
