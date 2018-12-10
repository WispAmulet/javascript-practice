# Note

## HTML

基本结构如下

```html
<div class="panels">
  <div class="panel panel1">
    <p>...</p>
  </div>
  <div class="panel panel2">
    <p>...</p>
  </div>
  <!-- ... -->
</div>
```

## CSS

把父级元素`.panels`设置为`flexbox`，子元素平分所有的空间

```css
.panels {
  display: flex;
}

.panel {
  flex: 1;
}
```

+ 把所有的`.panel`设置为`flexbox`，`.panel`的子元素是三个`p`元素。由于`flexbox`默认会把所有的子元素水平排列，可以使用`flex-direction`属性改变方向为垂直
+ 为了让子元素`p`填充满整个父级元素，为其设置`flex`属性为`1 0 auto`，当有额外的空间时，会占用多余的空间，当没有额外的空间时，不会缩小。有一点要说明的是，由于第二个`p`元素的字体比其它两个大，`flex-grow`属性会让它占用稍多一点的空间
+ 补充：`flex`默认值`0 1 auto`，有三种特殊情况，`flex: auto`等同于`1 1 auto`，`flex: none`等同于`0 0 auto`，`flex: <positive-number>`等同于`<positive-number> 1 0`
+ 注意：改变`flexbox`的方向也会改变主轴的方向。这里的`align-items`其实可以省略，因为子元素只是普通的文本，已经设置了`text-align: center;`
+ 注意：在子元素设置`flex`属性之前，由于改变了主轴方向，`justify-content: center`让所有的子元素垂直居中。但设置了`flex: 1 0 auto`之后，子元素占用了所有的空间，这里的`justify-content`属性也可以省略掉

```css
.panel {
  text-align: center;
  /* ... */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
}

.panel > * {
  flex: 1 0 auto;
}

.panel p {
  font-size: 2rem;
  /* ... */
}

.panel p:nth-child(2) {
  font-size: 4em;
}
```

到这一步为止，子元素`p`已经占用了全部父级元素的空间，为了让文本完全居中，把`.panel > *`设置为`flexbox`并设置相关属性

```css
.panel > * {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

+ 通过 css 类用来实现`transition`效果，这里一共设置了两个 css 类。
+ 通过`transform: translateY()`把第一个和最后一个`p`元素隐藏（移出可视范围）
+ 当通过 js 添加`.open` 类时，改变`flex`属性的值为 5，也就是占用了更多的空间。子元素的`font-size`单位为`em`，改变`font-size`的值，也改变了子元素的`font-size`
+ 当通过 js 添加`.open--active`类时，将`transform: translateY()`归零

```css
.panel {
  flex: 1;
  font-size: 20px;
  /* ... */
}

.panel > *:first-child { transform: translateY(-100%); }
.panel.open--active > *:first-child { transform: translateY(0); }

.panel > *:last-child { transform: translateY(100%); }
.panel.open--active > *:last-child { transform: translateY(0); }

.panel.open {
  flex: 5;
  font-size:40px;
}
```

## JS

```js
const panels = document.querySelectorAll('.panels .panel');

function toggleOpen() {
  this.classList.toggle('open');
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
```

```js
function toggleActive(e) {
  // console.log(e.propertyName);
  this.classList.toggle('open--active');
}

panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
```

在前一个`transition`结束时执行`toggleActive`函数。

`console.log(e.propertyName);`得到的结果是`transition`的类型，也就是`flex-grow`和`font-size`。因此`toggleActive`函数会执行两次。

为该函数添加一个判断条件

```js
function toggleActive(e) {
  // console.log(e.propertyName);
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open--active');
  }
}
```
