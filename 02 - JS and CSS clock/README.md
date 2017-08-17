Note
===

> [预览效果](https://wispamulet.github.io/js-practice/javascript30.com/02%20-%20JS%20and%20CSS%20clock/index.html)

CSS
---

```css
.clock {
  ...
  margin:50px auto; /* 居中 */
  position: relative;
  padding:2rem;
  box-shadow: /* 多重阴影，用逗号隔开 */
    0 0 0 4px rgba(0,0,0,0.1),
    inset 0 0 0 3px #EFEFEF,
    inset 0 0 10px black,
    0 0 10px rgba(0,0,0,0.2);
}

.clock-face {
  ...
  transform: translateY(-3px); /* 指针初始为横向，指向9点，高度（厚度）为6px，需要向下3px来居中对齐 */
}
```

> [CSS3 transform-origin 属性](http://www.w3school.com.cn/cssref/pr_transform-origin.asp)

```css
.hand {
  ...
  transform-origin: 100%;
  transform: rotate(90deg);
  transition: all 0.05s;
  transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
}
```

`transform-origin: ...;`改变被转换元素的位置。默认为50%。
`transform: rotate(90deg);`将指针旋转90度指向12点位置，即时刻的起始位置。
`transition: all 0.5s;`让指针的旋转看上去更自然。
`transition-timing-function: ...;`允许过渡效果随着时间来改变其速度。可以在chrome开发者工具中预览。


JS
---

> [HTML DOM setInterval() 方法](http://www.w3school.com.cn/jsref/met_win_setinterval.asp)

```js
setInterval(setDate, 1000);
```

setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。

```js
const now = new Date();

const seconds = now.getSeconds();
const mins = now.getMinutes();
const hours = now.getHours();
```

先获得需要的小时，分钟和秒数。

```js
const secondsDegrees = (seconds / 60) * 360 + 90;
const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;
const hoursDegrees = (hours / 12) * 360 + (mins / 60) * 30 + 90;
```

将秒数转换为度数，在css中事先旋转了90度，因此还要加上90。分钟和小时同理。

```js
const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
minHand.style.transform = `rotate(${minsDegrees}deg)`;
hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
```

然后再应用在对应的元素上。

```js
if (secondsDegrees === 90) {
  secondHand.style.transition = 'all 0s';
} else {
  secondHand.style.transition = 'all 0.05s';
  secondHand.style.transitionTimingFunction = 'cubic-bezier(0.1, 2.7, 0.58, 1)';
}
```

当指针从59到0时，度数会突然发生变化，因为`transition: all 0.05s;`的原因，指针会突然回弹然后恢复正常。
为了避免这样可以添加以上代码，在指针回到初始位置时把`transition`的时间设置为0。

**更好的办法**

> [预览效果](https://wispamulet.github.io/js30-practice/02%20-%20JS%20and%20CSS%20clock/index02.html)

将获取初始时间和更新时间分离，在更新函数中自增对应的度数。

```js
var secondsDegrees = 0;

function initDate() {
  const now = new Date();

  const seconds = now.getSeconds(); // 获取秒数
  // console.log(seconds);
  secondsDegrees = (seconds / 60) * 360 + 90; // 转换为度数
  ...
}

function updateDate() {
  const secondHand = document.querySelector('.second-hand'); // 获取秒针对应的元素
  ...

  // console.log(secondsDegrees);
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`; // 将实时的度数应用与秒针的指向
  secondsDegrees += (1 / 60) * 360; // 秒针每秒增加6度

 ...
}

setInterval(updateDate, 1000);
```
