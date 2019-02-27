# Note

## JS

```js
const timeNodes = Array.from(document.querySelectorAll('.videos li'));

const seconds = timeNodes
  .map(node => node.dataset.time);
console.log(seconds);
```

+ 首先获得每一个`li`元素上`data-time`上的值

```js
const seconds = timeNodes
  .map(node => node.dataset.time)
  .map(timeCode => {
    const [min, sec] = timeCode.split(':').map(parseFloat);
    return (min * 60) + sec;
  })
  .reduce((total, vidSeconds) => total + vidSeconds, 0);
console.log(seconds); // 17938
```

+ 数组中的每一个元素都是诸如`"6:30"`的字符串，首先通过`split()`方法转化为`["6", "30"]`的形式
+ 然后再使用`parseFloat()`方法把字符串转为数字
+ 再把分钟数和秒数相加
+ 最后使用`reduce()`方法求和

```js
let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);

secondsLeft %= 3600;
const mins = Math.floor(secondsLeft / 60);

secondsLeft %= 60;

console.log(hours, mins, secondsLeft);
```

+ `17938`是所有视频时间长度的秒数形式，转化为小时，分钟，秒数
