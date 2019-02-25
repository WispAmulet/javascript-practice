# Note

## HTML

```html
<div class="player">
  <video></video>
  <div class="player__controls">
    <div class="progress">
      <div class="progress__filled"></div>
    </div>
    <button class="player__button"></button>
    <input>
    <input>
    <button class="player__button"></button>
    <button class="player__button"></button>
  </div>
</div>
```

## CSS

```css
.player {
  position: relative;
  overflow: hidden;
}
.player__controls {
  position: absolute;
  bottom: 0;
  width: 100%;
  transform: translateY(100%) translateY(-5px);
  transition: all .3s;
}
.progress {
  height: 5px;
}
.player:hover .player__controls {
  transform: translateY(0);
}
.player:hover .progress {
  height: 15px;
}
```

- 把`.player__controls`元素的位置放在了父级元素`.player`的底部，并且只有在`:hover`时才显示
- 这里的`translateY(-5px)`是为了当不显示`.player__controls`元素时，恰好显示出`.progress`元素，因为此时该元素的高度也是`5px`

```css
.player__controls {
  display: flex;
  flex-wrap: wrap;
}
.player__controls > * {
  flex: 1;
}
.progress {
  flex-basis: 100%;
  display: flex;
  cursor: ew-resize;
}
.progress__filled {
  flex-basis: 50%;
}
.player__button {
  max-width: 50px;
}
```

- `.player__controls`元素为`flexbox`，它的所有直接子元素都设置了`flex: 1`，因此这些子元素会自动填满父级元素的宽度，且宽度相等
- `.player__button`上设置了最大宽度为`50px`，因此宽度只有`50px`
- `.progress`元素上设置了`flex-basis: 100%`，且它的父级元素上`flex-wrap: wrap`，因此该元素宽度等于父级元素的宽度，且单独占用一整行。该元素自己也是一个`flexbox`
- `.progress__filled`元素表示进度条，并设置了`flex-basis: 50%`，即占用一半的宽度。这里只是为了示例，实际中值设置为 0 比较好

## JS

```js
const player = document.querySelector('.player');
const video = player.querySelector('video.viewer');
const toggle = player.querySelector('.toggle');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
```

- 首先获取`video`元素和开始/暂停的按钮，当点击视频或者按钮时，执行该函数
- `video`对象上有两个方法，`video.play()`开始播放，`video.pause()`暂停
- `video`上还有一个属性`video.paused`用来表示该视频是否处于暂停状态

```js
function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
```

- 除了播放和暂停视频，还需要更新开始/暂停按钮的状态
- 通过监测`video`上的`play`和`pause`事件，修改开始/暂停按钮的`textContent`
- 如果通过之前的`click`事件，判断视频是否播放，当使用外部插件或者直接在控制台中通过`video.play()`开始播放视频，并没有触发`click`事件，将不会更新该按钮的值

```js
const skipButtons = player.querySelectorAll('[data-skip]');

function skip() {
  const { skip: time } = this.dataset;
  video.currentTime += parseFloat(time);
}

skipButtons.forEach(button => button.addEventListener('click', skip));
```

- `video`上有一个属性`currentTime`表示视频播放的当前时间
- 直接修改这个值就可以实现快进多少秒以及倒退多少秒
- `skipButotns`元素上有一个自定义的`data-skip`属性，可以通过`dataset`对象来访问，但得到的值是字符串，需要先转为数字

```js
const ranges = player.querySelectorAll('.player__slider');

function handleRangeUpdate(e) {
  const { name, value } = e.target;
  video[name] = value;
}

let rangeFlag = false;
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range =>
  range.addEventListener('mousedown', () => {
    rangeFlag = true;
  })
);
ranges.forEach(range =>
  range.addEventListener('mouseup', () => {
    rangeFlag = false;
  })
);
ranges.forEach(range =>
  range.addEventListener('mousemove', e => {
    if (rangeFlag) {
      handleRangeUpdate(e);
    }
  })
);
```

- `video`上有一个`volume`属性表示声音大小，`playbackRate`属性表示播放速度
- `ranges`是两个`<input type="range" />`元素组成的 NodeList，并且已经设置了`name`，值恰好分别为`volume`和`playbackRate`
- 监测`<input type="range" />`元素的`change`和`mousemove`事件，直接修改`video`上`volume`和`playbackRate`属性的值，即实现了控制音量和播放速度的功能

但有一个问题在于，直接监测`mousemove`事件时，没有按下鼠标，在`<input type="range" />`元素上移动，也会触发该事件。由于`<input />`元素上`value`的值没有改变，视频的音量和播放速度也不会改变，但函数依然执行了很多次，做了很多无用功。

- 因此引入了一个`rangeFlag`变量，目的在于，只有当鼠标按下时，移动鼠标才会执行处理函数

为什么此时处理函数中传入了事件`event`，通过`e.target`而不像之前通过`this`来访问元素呢？

```js
function handleClick() {
  console.log(this);
}
video.addEventListener('click', handleClick); // 此时 handleClick 函数中的 this 是 video
video.addEventListener('click', () => {
  console.log(this); // window
  if (true) {
    handleClick(); // 此时 handleClick 函数中的 this 是 window
  }
});
```

- 因此通过`e.target`来访问我们需要的元素，可以避免遇到 this 不是该元素的情况

除此之外还可以怎么修改代码？

```js
function handleClick() {
  console.log(this);
}
video.addEventListener('click', function() {
  console.log(this); // video
  if (true) {
    handleClick(); // window
  }
}
});
```

此时`handleClick()`函数执行时，父级作用域的 this 是`video`，为什么还是得到了 window 呢？

- `handleClick`函数是定义在全局对象上的，当直接调用时，this 永远都指向 window

```js
function handleClick() {
  console.log(this);
}
video.addEventListener('click', function() {
  console.log(this); // video
  if (true) {
    handleClick.apply(this); // video
  }
}
});
```

- 此时可以获得`video`元素

```js
const handleClick = () => {
  console.log(this);
}
video.addEventListener('click', function() {
  console.log(this); // video
  if (true) {
    handleClick.apply(this); // window
  }
}
});
```

- 此时定义`handleClick`是箭头函数，无法通过`apply()`改变 this 的指向

```js
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

function handleProgress(e) {
  const { currentTime, duration } = e.target;
  const percent = (currentTime / duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);
```

- 通过`progressBar`元素的宽度来表示视频播放的进度，该元素的宽度由`flex-basis: 50%`决定
- `video`有一个事件`timeupdate`表示时间更新，也就是视频播放时，会一直触发这个事件
- 通过视频当前时间除以视频时间总长，获得百分比，然后再修改`flex-basis`的值

```js
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

let progressFlag = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => {
  progressFlag = true;
});
progress.addEventListener('mouseup', () => {
  progressFlag = false;
});
progress.addEventListener('mousemove', e => {
  if (progressFlag) {
    scrub(e);
  }
});
```

- 当在进度条上点击或者移动时，来更新视频的进度
- 当在`progress`元素上点击或移动时，执行该函数，通过`e.offsetX`的值除以该元素的宽度获得百分比，乘以视频时间总长，得到在该位置时，视频的当前时间
- 直接修改`video.currentTime`的值为之前得到的值
- 与之前类似，只希望当鼠标按下时，才监测`mousemove`事件
