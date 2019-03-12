# Note

## JS

```js
let countdown;

function timer(seconds) {
  const now = Date.now(); // 当前时间
  const then = now + seconds * 1000; // 10 秒之后的时间
  console.log(seconds); // 10

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); // 9, 8, 7, ..., 0, -1, ...
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    console.log(secondsLeft); // 9, 8, 7, ..., 0
  }, 1000);
}
```

+ `timer()`函数用来计算倒计时，接受一个参数，单位为秒。比如运行`timer(10)`，输出 10 ~ 0 的倒计时
+ `Date.now()`可以获得当前时间距离 1970 年 1 月 1 号 0 点的时间，单位为毫秒
+ 由于`setInterval()`在一秒后才开始运行，所以不会输出初始值 10。当`secondsLeft`小于 0 时，需要停止该函数
+ 虽然停止了函数，但`setInterval()`还是需要手动清除，把它保存在`countdown`变量中，然后用`clearInterval(countdown)`清除

```js
const timeLeft = document.querySelector('.display__time-left');

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;

  timeLeft.textContent = display;
  document.title = display;
}

function timer(seconds) {
  /* ... */
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    /* ... */
    displayTimeLeft(secondsLeft);
  }, 1000);
}
```

+ 有了倒计时的函数，接下来把该函数计算的结果插入到 DOM 中
+ `displayTimeLeft()`函数接受的参数为秒数，按需求转为`分钟:秒数`的形式，它会在`timer()`函数运行时首先运行一次，然后每秒运行一次更新数值

```js
const endTime = document.querySelector('.display__end-time');

function displayEndTime(seconds) {
  const time = new Date(seconds);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const display = `Be back at ${hours > 12 ? hours - 12 : hours}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${hours > 12 ? 'PM' : 'AM'}`;

  endTime.textContent = display;
}

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  displayEndTime(then);
  /* ... */
```

+ 前面提到，`Date.now()`可以获得当前时间距离 1970 年 1 月 1 号 0 点的时间，单位为毫秒。`new Date()`同理
+ 除此之外`new Date(milliseconds)`也可以把特定的毫秒数转为 Date 对象，该对象上还有很多可用的方法比如`getHours()`等
+ `displayEndTime()`函数只需要运行一次

```js
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown);
  /* ... */
}

buttons.forEach(button =>
  button.addEventListener('click', function() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
  })
);
```

+ 页面顶部的几个按钮上分别有自定义属性`data-time`，点击它们获得`data-time`的值，然后运行`timer()`函数
+ 如果点击其中的按钮，再点击另一个按钮，页面上显示的效果会有点错乱，先显示上一次的倒计时，再显示第二次的倒计时。原因在于，`timer()`函数第一次运行时，设置了一个`setInterval()`但是没有清除，所以和第二次的`setInterval()`同时都在运行
+ 解决办法：每一次运行`timer()`函数时，首先清除掉之前保存在`countdown`变量中的计时器

```js
// document.customForm === <form name="customForm" id="custom"></form>
// document.forms.customForm 也可以
// document.forms.custom 也可以
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const seconds = this.minutes.value * 60;

  timer(seconds);
  this.reset();
});
```

+ 对于`<form name="customForm" id="custom"></form>`元素，可以通过`document.querySelector()`获得，也可以通过其上定义的`name`属性获得，但只有`form`元素可以这样
+ 除此之外，也可以通过`document.forms`获得页面上所有的`form`元素的一个集合，然后再通过`name`或`id`属性选择想要的`form`元素
