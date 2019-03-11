# Note

## HTML

```html
<div class="wrapper">
  <video class="flex" width="765" height="430" src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" loop controls></video>
  <div class="speed">
    <div class="speed-bar">1×</div>
  </div>
</div>
```

## CSS

```css
.speed {
  /* ... */
  border-radius: 50px;
  overflow: hidden;
}
.speed-bar {
  /* ... */
  width: 100%;
  height: 16.3%;
  user-select: none;
}
```

+ `.speed-bar`元素在`.speed`元素内部，宽度相等，外部元素设置了`border-radius`但内部元素没有，可以通过`overflow: hidden;`隐藏内部元素多余显示的部分
+ `.speed-bar`元素有一个默认高度
+ 可以通过`user-select`设置文字是否可选择

## JS

```js
const video = document.querySelector('video.flex');
const speed = document.querySelector('.speed');
const bar = document.querySelector('.speed-bar');
let flag = false;

function speedControl(e) {
  console.log(this);
}

speed.addEventListener('mousedown', function (e) {
  flag = true;
  speedControl.bind(this)(e);
});
speed.addEventListener('mouseup', () => {
  flag = false;
});
speed.addEventListener('mouseleave', () => {
  flag = false;
});
speed.addEventListener('mousemove', function (e) {
  if (flag) {
    speedControl.bind(this)(e);
  };
});
```

+ 通过设置`flag`，当鼠标在`.speed`元素上按下或者按下后移动时，才运行函数，当松开鼠标或离开此区域时，函数不会运行
+ `mouseleave`和`mouseout`事件的区别在于，在这里事件绑定在`.speed`元素上，但该元素还有子元素，如果鼠标依然在`.speed`元素内，但移动到了内部的子元素上，依然会触发`mouseout`事件，会产生意料之外的结果，`mouseleave`事件则是，只有当鼠标完全移动到该元素外部时，才触发事件
+ `mousedown`和`mousemove`事件的回调函数，需要写成普通函数的形式，因为`speedControl()`函数并不是直接绑定在`.speed`上，而函数内部后续会通过`this`来访问该元素，同时要使用`bind()`函数手动绑定

```js
function speedControl(e) {
  const y = e.pageY - this.offsetTop;
  const percent = y / this.offsetHeight;
  const [min, max] = [0.4, 4];
  const height = Math.round(percent * 100) + '%';
  const playbackRate = (max - min) * percent + min;
  bar.style.height = height;
  bar.textContent = playbackRate.toFixed(2) + 'x';
  video.playbackRate = playbackRate;
}
```

+ 当鼠标在`.speed`元素内点击并移动时，需要设置它内部元素的高度到该位置，这个高度默认是百分比
+ `y`等于鼠标事件到页面顶部的距离减去`.speed`元素顶部到页面顶部的距离，也就是事件发生的位置到该元素顶部的距离，这一段距离除以`.speed`元素的高度，也就是`.speed-bar`元素的高度的百分比，但得到的会是一个小数，需要先转换为百分比形式
+ 求出的`height`会是一个介于 0% ~ 100% 的值，而想要设置的视频速度介于 0.4 ~ 4 之间，先通过公式转换
+ 根据求出的值设置`.speed-bar`元素的高度与文本，以及视频的播放速度
