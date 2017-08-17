Note
===

> [预览效果](https://wispamulet.github.io/js-practice/javascript30.com/01%20-%20JavaScript%20Drum%20Kit/index.html)

HTML
---

> [data-*属性](http://www.w3school.com.cn/tags/att_global_data.asp)

使用 data-* 属性来嵌入自定义数据。

```html
<div data-key="65" class="key">
  <kbd>A</kbd>
  <span class="sound">clap</span>
</div>

<audio data-key="65" src="sounds/clap.wav"></audio>
```

上一段代码中的65代表keycode，可以在[这里](http://keycode.info/)查询到它们的值。

也可以使用以下代码自行查询按键对应的keycode：

```js
window.addEventListener('keydown', (e) => {
    console.log(e);
});
```

会得到一个KeyboardEvent，其中的一个属性为KeyCode: 65。通过这里的data-key将按键与音乐**绑定**。

> [HTML音频](http://www.w3school.com.cn/html/html_audio.asp)

`<audio>`元素是一个 HTML5 元素，在 HTML 4 中是非法的，但在所有浏览器中都有效。

CSS
---

> [CSS3 background-size 属性](http://www.w3school.com.cn/cssref/pr_background-size.asp)

```css
html {
  ...
  background-size: cover;
}
```

把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。背景图像的某些部分也许无法显示在背景定位区域中。

> [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

```css
.keys {
  display: flex;
  /*flex：1;*/
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}
.key {
  flex: 1;
  ...
  /*width: 10rem;*/
  transition: all .07s ease;
  ...
}
```

+ flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

  如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

+ vh: 视窗高度，100vh即100%的高度。

  vw：视窗宽度。
  
  vmin：vh和vw中较小的那一个。
  
  vmax：vh和vw中较大的那一个。

+ px：固定长度的长度单位。

  em: 相对于父元素计算的长度单位。
  
  rem：相对于根元素`<html>`计算的长度单位，本例中设置为10px。

+ align-items：定义项目在交叉轴上如何对齐（可以理解为y轴的方向）。

  justify-content：定义了项目在主轴上的对齐方式（可以理解为x轴的方向）。

在本例中，可以在`key`的属性中设置`flex: 1;`，所有的按键会平均占用整个x轴方向的位置。这样就不用设置每个按键的宽度。

> [CSS3 transition 属性](http://www.w3school.com.cn/cssref/pr_transition.asp)

结合以下代码来看

```css
.playing {
  transform: scale(1.1);
  border-color: #ffc600;
  box-shadow: 0 0 1rem #ffc600;
}
```

按键时为该元素添加play类，产生一个动态的按键效果。整个效果由`transition: all .07s ease;`来控制。
效果完成后还需要一个函数来移除play类。

JS
---

通过addEventListener监视keydown事件

```js
window.addEventListener('keydown', playSound);
```

playSound()函数

```js
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  // console.log(audio);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  // console.log(key);
  if (!audio) return; // stop the function
  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
}
```

+ `const audio  = ...; `获取到按下的键对应的声音文件。
  `const key = ...;`获取到按下的键对应的元素。

+ 可以使用`conlose.log();`确认到底有没有获取到需要的元素。

+ `if(!audio) return;`当按下没有对应声音文件的按键时，结果为null。应及时停止函数。

+ `audio.currentTime = 0; audio.play();`使用`audio.play()`播放音频文件。但如果快速连续的按下一个键，要等这一段音频结束才会播放下一段音频，因此添加`audio.currentTime = 0;`用来重置播放时间。

+ `key.classList.add('playing');`为获取到的元素添加playing类。

通过addEventListener监视transitionend事件

```js
const keys = Array.from(document.querySelectorAll('.key'));
// console.log(keys);
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
```

+ `const keys = ...;`获取所有的按键元素然后从NodeList转化为数组。

+ `keys.forEach(...);`遍历数组当动画效果结束后，执行removeTransition()函数。

removeTransition()函数；

```js
function removeTransition(e) {
  // console.log(e);
  if (e.propertyName !== 'transform') return; // skip it if it's not tranform
  // console.log(e.propertyName);
  // console.log(this);
  this.classList.remove('playing');
}
```

+ `if (...) return;`直接使用`console.log(e);`语句，会发现获得了一系列事件，而我们只需要关注其中的`propertyName: "transform"`。

+ `this.classList.remove('playing');`然后在移除playing类。
  当不确定this是什么的时候，可以使用`console.log(this);`确认。
