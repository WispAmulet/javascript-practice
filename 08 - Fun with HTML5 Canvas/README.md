# Note

## html

```html
<canvas id="draw" width="800" height="800"></canvas>
```

一个带有初始宽度和高度的`canvas`标签

## js

```js
const canvas = document.querySelector('#draw'); // 获取元素
const ctx = canvas.getContext('2d'); // 获取元素的 context
canvas.width = window.innerWidth; // 设置元素的宽度
canvas.height = window.innerHeight; // 设置元素的高度
ctx.strokeStyle = '#BADA55'; // 笔划描边的颜色
ctx.lineJoin = 'round'; // 线条相交的方式
ctx.lineCap = 'round'; // 笔划的形状
ctx.lineWidth = 100; // 笔划的宽度
```

+ 首先获取元素
+ 当使用`canvas`绘图时，并不是直接画在该元素上，需要先获得该`canvas`元素的`context`，`context`分为`2d`和`webgl`
+ 设置颜色有两种，`ctx.fillStyle`和`ctx.strokeStyle`，前者是填充的颜色，后者是描边的颜色
+ 笔划形状可以设置为`round`，`butt`，`square`
+ 笔划相交的方式可以设置为`round`，`bevel`，`miter`

```js
let isDrawing = false;

function draw(e) {
  if (!isDrawing) return;
  console.log(e);
}

canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
```
+ 只有在`isDrawing`为`true`时，`draw`函数才会运行
+ 也就是说，只有当鼠标在`canvas`元素上保持按下并移动时，才会作图。松开鼠标或移出页面都会停止作图
+ 这里的变量`isDrawing`通常称作 flag，可以通过设置 flag 控制函数在满足某条件时才运行

```js
let lastX = 0;
let lastY = 0;

function draw(e) {
  if (!isDrawing) return;
  console.log(e);

  // begin
  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  // done
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
```

+ `lastX`和`lastY`变量用来记录笔划的起点，初始值都为 0，也就是`canvas`元素的左上角
+ 修改`mousedown`的事件函数，将这两个变量的初始值修正为鼠标按下时的坐标。然后当鼠标移动时，`draw`函数内以这个坐标为起点，鼠标移动的坐标为终点完成一次笔划，然后再把当前的坐标赋值给`lastX`和`lastY`变量

```js
ctx.strokeStyle = '#BADA55';
ctx.lineWidth = 100;

let hue = 0;
let direction = true;

function draw(e) {
  // ...
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  // ...
  hue += 1;
  if (hue >= 360) {
    hue = 0;
  }

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth += 1;
  } else {
    ctx.lineWidth -= 1;
  }
}
```

+ 可以看到，之前设置的笔划颜色和宽度都是固定的
+ `hsl`是一种表示颜色的方式，在 css 中这样表示`color: hsl(100, 100%, 50%)`
+ [可以在这里查看 hsl 颜色](http://mothereffinghsl.com/)
+ 其中，`h`代表色调，取值从 0 到 360，大于 360 会重新从 0 开始计算，相当于一个循环。0 代表红色为初始色
+ `s`代表饱和度，取值为 0 到 1，或者也可以用百分比表示。饱和度越大，颜色越鲜艳，饱和度为 0 时，会变成灰色
+ `l`代表亮度，取值为 0 到 1，与饱和度类似。亮度取 50% 固定就好，亮度为 1 时，会变成白色，亮度为 0 时，会变成黑色
+ `ctx.strokeStyle`只是一个普通的代表颜色的字符串，因此，在`draw`函数类，重新对它以`hsl(${hue}, 100%, 50%)`的形式赋值，当函数重复运行时，改变`hsl`中`h`的值，也就改变了笔划的颜色
+ 除此之外，还需要自动改变笔划的宽度，已知初始值为`100`
+ 设置了另一个变量`direction`用来增大或缩小笔划的宽度，它是一个布尔值，默认为`true`
+ 当笔划宽度大于等于`100`时（初始为`100`），该变量变为`false`，执行`ctx.lineWidth -= 1`，笔划缩小
+ 笔划宽度缩小到`1`时，`direction`变量重新回到`true`，执行`ctx.lineWidth += 1`，笔划宽度增大
+ 笔划的宽度会重复这个循环
