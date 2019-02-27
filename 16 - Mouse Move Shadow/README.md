# Note

## HTML

```html
<div class="hero">
  <h1 contenteditable>🔥WOAH!</h1>
</div>
```

## CSS

```css
.hero {
  /* ... */
  min-height: 100vh;
}
```

+ `.hero`元素占用整个页面的高度

## JS

```js
const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');

function shadow(e) {
  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = e;

  if (e.target !== this) {
    x += e.target.offsetLeft;
    y += e.target.offsetTop;
  }
  console.log(x, y);
}

hero.addEventListener('mousemove', shadow);
```

+ 需要获得鼠标移动时`offsetX`和`offsetY`的值
+ 但是`mousemove`事件添加在`.hero`元素上，当鼠标移动到`h1`上时，这两个值会根据`h1`的位置重新计算
+ 因此当`e.target`不是`.hero`元素时，`x`和`y`的大小需要加上`h1`元素上`offsetLeft`和`offsetTop`的值

```js
const walk = 100;

function shadow(e) {
  /* ... */

  const xWalk = Math.round((x / width * walk) - (walk / 2));
  const yWalk = Math.round((y / height * walk) - (walk / 2));

  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255, 0, 255, .7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(255, 255, 0, .7),
    ${yWalk}px ${xWalk * -1}px 0 rgba(0, 255, 255, .7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(0, 255, 0, .7)
  `;
}
```

+ `walk`变量用来控制`text-shadow`的大小
+ `x`的范围是 0 到页面宽度的大小，这里`width`的值等于页面宽度，`x / width * walk`的范围就是 0 ~ 100，因此`xWalk`的范围是 -50 ~ 50，然后取整
+ `y`同理
+ 设置不同的`text-shadow`
+ 如果需要改变`text-shadow`的距离，直接修改`walk`变量的大小即可
