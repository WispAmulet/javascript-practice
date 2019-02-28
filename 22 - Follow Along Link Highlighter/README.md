# Note

## CSS

```css
.highlight {
  /* ... */
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
```

+ `.highlight`样式将会应用在后续创建的`span`元素上，这里定义了它的起始位置
+ 该元素会插入到`body`的最后一个节点，因此它的起始位置在`body`的左上角

## JS

```js
const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');

highlight.classList.add('highlight');
document.body.append(highlight);
```

+ 首先创建`span`元素

```js
function highlightLink() {
  const linkCoords = this.getBoundingClientRect();
  // console.log(linkCoords);

  highlight.style.width = `${linkCoords.width}px`;
  highlight.style.height = `${linkCoords.height}px`;
  highlight.style.transform = `translate(${linkCoords.left}px, ${linkCoords.top}px)`;
}

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
```

+ 为每一个`a`元素添加事件，当鼠标移动到该元素上时触发
+ 通过`getBoundingClientRect()`方法得到该元素的宽度和高度，距离当前页面最上和最左距离的值
+ 事件触发时，把`a`元素的宽度和高度赋值给`span`元素
+ 然后，通过`transform`移动`span`元素的位置到对应的`a`元素

现在的问题是，如果页面向下滚动之后，通过`getBoundingClientRect()`方法得到的`top`的值会改变

`span`元素的起始位置是整个`body`的左上角，而不是当前页面的左上角，将不会刚好出现在`a`元素上

```js
function highlightLink() {
  // console.log('highlight!!!');
  const linkCoords = this.getBoundingClientRect();
  console.log(linkCoords);
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
  }

  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}
```

+ 为了修正`top`的值，需要在它的基础上加上页面向下滚动的距离
+ X 轴同理
