Note
===

> [预览效果](https://wispamulet.github.io/js-practice/javascript30.com/12%20-%20Key%20Sequence%20Detection/index.html)

JS
===

添加一个`EventListener`将按键保存至一个数组

```js
const pressed = [];
const secretCode = 'wesbos';

window.addEventListener('keyup', (e) => {
  console.log(e.key);
  pressed.push(e.key);
  console.log(pressed);
});
```

得到了想要的数据，但没有必要保存所有的按键信息，只需要保留`secretCode`长度的数据进行对比就可以了

> [splice](http://javascript.ruanyifeng.com/stdlib/array.html#toc12)

```js
...
pressed.splice(-secrectCode.length - 1, pressed.length - secretCode.length);
/*
当 splice() 参数第一位为负数时，从后往前计算起始位置
这里的 secretCode 长度为 6，需要从倒数第 7 个位置开始删除
当 pressed.length 为 7 时，删除 pressed 数组的第一个数据，仅保留最新的 6 个值
pressed.length - secrectCode.length = 7 - 6 = 1，但如果直接改为 1，splice() 会从一开始就生效，数组会一直存入一个值然后马上删除它
尽管当 pressed.length 小于 secretCode.length 时，-7 超过了 pressed 本身的长度，数组的第一位会成为起始位置
只有当 pressed.length 超过 secretCode.length 时，才需要开始删除 “多余” 的数据
*/
console.log(pressed);
```

将`pressed`和`secretCode`进行对比

```js
if (pressed.join('').includes(secretCode)) {
  console.log('BANG!');
  cornify_add();
}
```

打开页面查看`cornify_add()`做了什么，它来自头部引入的`<script type="text/javascript" src="http://www.cornify.com/js/cornify.js"></script>`😍（如果看不到效果请看 Chrome DevTool 的说明）
