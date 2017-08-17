Note
===

> [预览效果](https://wispamulet.github.io/js-practice/javascript30.com/10%20-%20Hold%20Shift%20and%20Check%20Checkboxes/index.html)

> [预览效果2](https://wispamulet.github.io/js-practice/javascript30.com/10%20-%20Hold%20Shift%20and%20Check%20Checkboxes/index2.html)

CSS
===

```css
input:checked + p {
  background:#F9F9F9;
  text-decoration: line-through;
}
```

当点击`checkbox`时，添加如上属性。

JS
===

```js
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
// console.log(checkboxes);

const handleCheck = (e) => {
  return console.log(e);
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
```

点击某一项`checkbox`时，获得对应的事件。

```js
// const handleCheck = (e) => {
//   // return console.log(e);
//   console.log(this); // window
// }
function handleCheck(e) {
  console.log(this); // checkbox element
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
```

当使用箭头函数时，无法获得需要的`this`，将它改为普通函数。

> [箭头函数](http://es6.ruanyifeng.com/#docs/function#箭头函数)

箭头函数中：

  + 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。

  + `this`对象的指向是可变的，但是在箭头函数中，它是固定的。

  + 箭头函数根本没有自己的`this`，导致内部的`this`就是外层代码块的`this`。


```js
let lastChecked;

function handleCheck(e) {
  ...
  if (e.shiftKey && this.checked) { // 当按住 shift 时 click，并且仅当是 checking 时
    checkboxes.forEach(checkbox => {
      console.log(checkbox); // 会显示所有的 <input type="checkbox">
      if (checkbox === this || checkbox === lastChecked) {
        console.log('!!!'); // 为第一次`click`的那一项和第二次`shift` + `click`的那一项做上“标记”
      }
    });
  }

  lastChecked = this; // 第一次点击时的那一项
}
```

操作的流程是，点击某一项，然后再`shift`点击另一项，选中其中的所有项。

当第二次点击时，遍历`checkboxes`，对每一项执行判断条件。

```js
function handleCheck(e) {
  let inBetween = false;
  if (...) {
    ...
    if (...) {
      inBetween = !inBetween;
      console.log('!!!');
    }
    if (inBetween) {
      checkbox.checked = true;
    }
  }
  ...
}
```

当遍历到第一次点击的那一项时，`inBetween`变为`true`，直到遍历到第二次点击的那一项，变回`false`，而在这范围之内的`checkbox`全部变为`checked`。

问题：如果直接`shift` + `click`点击，会发生什么？

如何没有第一次普通的`click`，也就是说没有`lastChecked`，

`if (checkbox === this || checkbox === lastChecked)`中的`this`和`lastChecked`将会是同一项，`inBetween`变为`true`后将会持续到最后一项。因此，点击的那一项直到最后一项都会被选中。

更好的做法：
===

Still working on it...

