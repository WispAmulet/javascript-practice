Note
===

> [预览效果](https://wispamulet.github.io/js-practice/javascript30.com/07%20-%20Array%20Cardio%20Day%202/index.html)

JS
===

> [some(), every()](http://javascript.ruanyifeng.com/stdlib/array.html#toc17)

用来判断数组成员是否符合某种条件。

`some`方法是只要有一个数组成员的返回值是`true`，则整个`some`方法的返回值就是`true`，否则`false`。

```js
const isAdult = people.some(person => (new Date()).getFullYear() - person.year >= 19);

console.log(isAdult); // false
console.log({isAdult}); // show the name of the variable as well as the value.
```

> find(), findIndex()

`find()`类似于`filter()`

```js
const comment = comments.find(comment => comment.id === 823423);
const comment2 = comments.filter(comment => comment.id === 823423);

console.log(comment); // 返回符合条件的第一项
console.log(comment2); // 返回符合条件所有项的一个数组


const index = comments.findIndex(comment => comment.id === 823423);

console.log(index); // 返回符合条件的第一项的 index
```

> splice(), slice()

找到`id === 823423`之后，如果要删除它

```js
// 1. 改变原数组
comments.splice(index, 1);

// 2. 不改变原数组
const newComments = [
  ...comments.slice(0, index),
  ...comments.slice(index + 1)
];

```

