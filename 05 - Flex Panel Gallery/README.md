Note
===

HTML
---

基本结构如下

```html
<div class="panels">
  <div class="panel">
    <p>...</p>
  </div>
  <div class="panel">
    <p>...</p>
  </div>
  <!-- ... -->
</div>
```

CSS
---

把`.panels`设置为`flexbox`

```css
.panels {
  display: flex;
}
.panel {
  flex: 1;
}
```

把`.panel`设置为`flexbox`

```css
.panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.panel > * {
  flex: 1 0 auto;
}
```

把`.panel > *`设置为`flexbox`

```css
.panel > * {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

设置 css 类用来实现`transition`效果

```css
.panel > *:first-child { transform: translateY(-100%); }
.panel.open--active > *:first-child { transform: translateY(0); }

.panel > *:last-child { transform: translateY(100%); }
.panel.open--active > *:last-child { transform: translateY(0); }

.panel.open {
  flex: 5;
  font-size:40px;
}
```

JS
---

```js
const panels = document.querySelectorAll('.panels .panel');

function toggleOpen() {
  this.classList.toggle('open');
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
```

除了`.open`类，还需要切换`.open--active`类

```js
function toggleActive(e) {
  console.log(e.propertyName);
  this.classList.toggle('open--active');
}

panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
```

在前一个`transition`结束后执行`toggleActive`函数。

`console.log(e.propertyName);`得到的结果是`.open`类中的内容，为`flex-grow`和`font-size`。因此`toggleActive`函数会执行两次。

为该函数添加一个判断条件

```js
function toggleActive(e) {
  // console.log(e.propertyName);
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open--active');
  }
}
```
