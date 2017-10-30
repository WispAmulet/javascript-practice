Note
===

> [预览效果]()

JS
---

对于`Number`、`String`或`Boolean`型数据，可以直接得到一个想要的 copy。

```js
let age = 100;
let age2 = age;
age2 = 200;
console.log(age, age2); // 100, 200
```

对于`Array`或`Object`型数据，直接`B = A;`得到的是 reference 而不是 copy。

```js
let arr = ['a', 'b', 'c'];
let arr2 = arr;
arr2[1] = 'd';
console.log(arr[1], arr2[1]); // 'd', 'd'

let obj = {
  name: 'yly',
  age: 100
};
let obj2 = obj;
obj2.age = 200;
console.log(obj.age, obj2.age); // 200, 200
```

如何获得`Array`的 copy

```js
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

const team = players; // ✖
const team2 = players.slice(); // ✔
const team3 = [].concat(players); // ✔
const team4 = [...players]; // ✔
const team5 = Array.from(players); // ✔
```

如何获得`Object`的 copy

```js
const person = {
  name: 'Wes Bos',
  age: 80
};

// const captain = person; // ✖
const cap2 = Object.assign({}, person, { number: 99 }); // ✔
const cap3 = {...person}; // ✔
```

然而，对于嵌套的`Array`或`Object`，以上做法并不起作用

*check clonedeep method for more*

如果`Object`不是特别复杂，可以使用

```js
const person = {
  name: 'yly',
  age: 100,
  social: {
    twitter: 'yly',
    facebook: 'yly.dev'
  }
};

const person2 = JSON.parse(JSON.stringify(person));
```
