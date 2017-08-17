Note
===

> [预览效果](https://wispamulet.github.io/js-practice/javascript30.com/26%20-%20Stripe%20Follow%20Along%20Nav/index.html)

HTML
===

```html
<nav class="top">

  <div class="dropdownBackground">
    <span class="arrow"></span>
  </div> <!-- 1. -->

  <ul class="cool">
    <li>
      ...
      <div class="dropdown"></div> <!-- 2. -->
    </li>
    <li>
      ...
      <div class="dropdown"></div> <!-- 2. -->
    </li>
    <li>
      ...
      <div class="dropdown"></div> <!-- 2. -->
    </li>
  </ul>
</nav>
```

导航栏的基本结构如上。

当鼠标移动到某一个`<li></li>`上时，弹出对应的`2.`中的内容。

1. 目的是为了给弹出的`2.`添加背景，默认`opacity: 0;`，当触发`mouseenter`事件时，`opacity: 1`，并且需要自适应宽度，高度以及位置
2. 默认`opacity: 0; display: none;`，当触发`mouseenter`事件时，`opacity: 1; display: block;`

CSS
===

```css
.dropdownBackground {
  opacity:0;
}
.dropdownBackground.open {
  opacity: 1;
}

.dropdown {
  opacity: 0;
  display: none;
}
.trigger-enter .dropdown {
  display: block;
}
.trigger-enter-active .dropdown {
  opacity: 1;
}
```

通过为元素添加或移除`class`改变属性的值。

```css
.dropdownBackground {
  width: 100px;
  height: 100px;
  ...
  display: flex;
  justify-content: center;
  position: absolute;
}
.arrow {
  position: absolute;
  width:20px;
  height:20px;
  display: block;
  background:white;
  transform: translateY(-50%) rotate(45deg);
}
```

给背景做出类似箭头的效果。

需要注意的是，背景的宽高只设置为`100px`，然而由于设置了`display: flex;`，占用了整行的高度，额外设置`position: absolute;`。

JS
===

```js
const triggers = document.querySelectorAll('.cool > li');

function handleEnter() {
  console.log('Enter');
}

function handleLeave() {
  console.log('Leave');
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
```

当鼠标移到`<li></li>`上时控制台显示`Enter`，移开时显示`Leave`。

```js
const background = document.querySelector('.dropdownBackground');

function handleEnter() {
  // console.log(this);
  // this.classList.add('trigger-enter', 'trigger-enter-active');
  this.classList.add('trigger-enter');
  setTimeout(() => this.classList.add('trigger-enter-active'), 150);
  background.classList.add('open');
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');
}
```

当鼠标移到`<li></li>`上时显示列表中额外的内容，以及显示背景色，移开时再隐藏。

然而，由于同时将`opacity`由 0 设置为 1 和`display`由 none 设置为 block，设置的`transition`属性并没有生效。为止分开写成两个`class`，并设置了`setTimeout()`函数。

注意：`setTimeout()`中的`this`指向的是`window`或`global`，需要用 ES6 的箭头函数。

```js
function handleEnter() {
  ...
  const dropdown = this.querySelector('.dropdown');
  const dropdownCoords = dropdown.getBoundingClientRect();

  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width
  };

  background.style.setProperty('height', `${coords.height}px`);
  background.style.setProperty('width', `${coords.width}px`);
}
```

尽管实现了渐变效果，还需要设置背景的大小和位置。

> [Element.getBoundingClientRect()](http://javascript.ruanyifeng.com/dom/element.html#toc31)

该方法返回一个对象，该对象提供当前元素节点的大小、位置等信息，基本上就是CSS盒状模型提供的所有信息。

首先获得列表需要弹出的元素，它们有一个共同的`class="dropdown"`，获得对应的宽高，再赋值给背景元素`class="background"`。

到这一步可以看到背景的大小已经随`class="dropdown"`自动改变大小了，还需要改变位置。

```js
const coords = {
  height: dropdownCoords.height,
  width: dropdownCoords.width,
  top: dropdownCoords.top,
  left: dropdownCoords.left
};

...
background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
```

不同的是，设置位置使用的是`transform: translate(left, top);`。注意两个值的顺序。

但是，高度看上去有点不对劲。。。

重新看一下 HTML 的结构，`<nav></nav>`元素的前面还有标题`<h2>Something here</h2>`。如果移除标题，让`<nav></nav>`处于页面最顶端，背景的位置就正常了。为什么会这样呢？

当`<nav></nav>`处于最顶部时，`<nav></nav>`本身的`top`和`left`值都为 0 ，但在页面中，无法保证导航栏一定在整个页面的顶部。因此还需要减去导航栏自身的`top`和`left`的值。

```js
const nav = document.querySelector('.top');

function handleEnter() {
  ...
  const navCoords = nav.getBoundingClientRect();
  const coords = {
    ...
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left
  };
}
```

修改如上，位置正常了。

但是如果快速在不同的列表项上来回移动，效果却看上去有些奇怪。当鼠标还未到某个列表上时，却提前看到了应该显示的元素。

```js
this.classList.add('trigger-enter');
setTimeout(() => this.classList.add('trigger-enter-active'), 150);
```

由于添加的两个`class`之间有时差，如果快速移动鼠标，当`trigger-enter-active`还未生效时，却已经移开了鼠标要移除这个`class`，当鼠标移回时`class`可能才生效。效果看上去有些混乱。

```js
// 1.
setTimeout(() => {
  if (this.classList.contains('trigger-enter')) {
    this.classList.add('trigger-enter-active')
  }
}, 150);

// 2.
setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
```

添加一个判断条件，只有当`trigger-enter`生效时，才添加`trigger-enter-active`。





