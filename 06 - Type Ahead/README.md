Note
===

> [预览效果](https://wispamulet.github.io/js-practice/javascript30.com/06%20-%20Type%20Ahead/index.html)

## html

```html
<form class="search-form">
  <input type="text" class="search" placeholder="City or State">
  <ul class="suggestions">
    <li>Filter for a city</li>
    <li>or a state</li>
  </ul>
</form>
```

## css

```css
.search-form {
  max-width: 400px;
  margin:50px auto;
}
```

设置父级元素的最大宽度并居中，宽度同时也会应用在子元素上。设置以前`ul`会占用整个页面的宽度，`input`有一个默认的宽度

```css
input {
  width: 100%;
  padding: 20px;
}
input.search {
  width: 120%;
  position: relative;
  left: -10%;
  top: 10px;
  z-index: 2;
  /* ... */
}

.suggestions {
  margin: 0;
  padding: 0;
  position: relative;
  /*perspective:20px;*/
}
```

+ 当`input`的宽度为 100% 时，宽度等于父级元素的宽度，也就是 400px，前提是页面的宽度大于 400px
+ 为了突出`input`标签，设置宽带为 120%，然后使用`position`属性使其居中，并稍微下移，与`ul.suggestions`元素重叠，可以看到，`ul`元素已经设置了`margin: 0`清除默认的外边距
+ `z-index`属性默认为`auto`，设置为 2，让`input`元素在`ul`之上显示（其实设置成 1 就行，前提是`ul`没有设置这个属性）

```css
.suggestions li {
  /* ... */
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
}
.suggestions li:nth-child(even) {
  transform: perspective(100px) rotateX(3deg) translateY(2px) scale(1.001);
  background: linear-gradient(to bottom, #ffffff 0%, #EFEFEF 100%);
}
.suggestions li:nth-child(odd) {
  transform: perspective(100px) rotateX(-3deg) translateY(3px);
  background: linear-gradient(to top, #ffffff 0%, #EFEFEF 100%);
}
```

+ 设置`li`元素的属性，这里的`justify-content`属性之后才看得到效果
+ `linear-gradient`属性可以不指定方向，默认从上到下，也可以指定超过两种颜色，更多的说明请看如下链接。唯一要说明的是，这里的 0% 和 100% 相当于指定颜色的位置，可以这样理解，当只有两种颜色时，在这个矩形中共存在三种颜色，0% 是初始颜色的位置，100% 是目标颜色的位置，余下的空间（这时是整个矩形的空间）是渐变颜色的位置。比如说都设置为 50% 时，初始颜色和目标颜色分别占用一半的位置，将不会有渐变效果。
+ `perspective`属性用来设置镜头与元素平面（xy轴）的距离，这里必须写在`rotateX`之前，否则无效。`perspective`这部分不太理解 // TODO

> [Using CSS gradients](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images/Using_CSS_gradients)

> [perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective)

> [掘金上一篇讲 transform 属性的文章](https://juejin.im/post/5ab8b5ed51882548fe4a2069)

> [另一篇讲 perspective 的文章](http://www.alloyteam.com/2012/10/the-css3-transform-perspective-property/)

## JS

```js
const prom = fetch(url);
console.log(prom); // A Promise, not data
```

> [fetch](http://javascript.ruanyifeng.com/bom/ajax.html#toc27)

+ Fetch API是一种新规范，用来取代`XMLHttpRequest`对象。

+ Fetch操作返回`Promise`对象，避免了嵌套的回调函数。

> [promise](http://es6.ruanyifeng.com/#docs/promise)

+ Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和Rejected（已失败）。

+ Promise实例具有`then`方法，它的作用是为Promise实例添加状态改变时的回调函数。`then`方法的第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态的回调函数。

```js
// 1.
fetch(endpoint).then(blob => console.log(blob)); // Response
// 2.
fetch(endpoint)
.then(blob => blob.json()) // blob.json() is a Promise
.then(data => console.log(data)); // data in json format
// 3.
fetch(endpoint)
.then(blob => blob.json())
.then(data => cities.push(data))
// 4.
fetch(endpoint)
.then(blob => blob.json())
.then(data => cities.push(...data))
```

1. 得到了一个`Response`对象实例，但它还不知道自己是什么格式(并不一定是`JSON`格式)。由于定义的`endpoint`是一个`JSON`对象，可以通过`Response`对象`__proto__`上定义的`json()`方法将其转为`JSON`对象。
2. 这时得到了一个拥有很多对象成员的数组。但还需要将它`push`到`cities`数组中。
3. 在控制台中`console.log(cities)`，却得到了一个嵌套的数组，原因是当使用`push()`时，每传入一个参数，该参数会成为`cities`数组中单独的某一项，而`data`本身就是一个数组。
4. 为此，使用扩展运算符（三个点），功能是把数组或类数组对象展开成一系列用逗号隔开的值。[妙用ES6解构和扩展运算符让你的代码更优雅](http://www.tuicool.com/articles/26bAzmm)

```js
function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}
```

+ 首先需要一个函数对数据进行匹配。
+ `cities`是一个数组，因此可以对它使用`filter()`方法，它的参数是一个函数，所有数组成员依次执行该函数，返回结果为`true`的成员组成一个新数组返回。该方法不会改变原数组。
+ 在控制台`console.log(cities)`，可知数组的每一个成员都是一个对象，拥有`city`和`state`属性，而它们都是字符串。回顾一下`match()`，它用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回null。
+ 由于需要根据输入的值来进行`match()`，使用正则表达式可以解决这个问题。[RegExp对象](http://javascript.ruanyifeng.com/stdlib/regexp.html#toc0)
  + RegExp构造函数还可以接受第二个参数，表示修饰符。
  + 修饰符（modifier）表示模式的附加规则，放在正则模式的最尾部。
  + `g`修饰符表示全局匹配（global），加上它以后，正则对象将匹配全部符合条件的结果。
  + 加上`i`修饰符以后表示忽略大小写（ignorecase）。
+ 在控制台中验证此函数是否成功

```js
findMatches('bos', cities);
```
得到了一个只有两个成员的数组，打开查看它们的属性，都符合预期的结果。

```js
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

function displayMatches() {
  console.log(this.value);
}

searchInput.addEventListener('change', displayMatches);
```

此时当在`input`输入值后，需要点击页面空白处才能在控制台看到输入的值。原因在于，`change`事件只有在离开`input`之后才生效，除此之外，还可以添加事件`keyup`。

```js
function displayMatches() {
  // console.log(this.value);
  const matchArray = findMatches(this.value, cities);
  console.log(matchArray);
}
```

+ 在`input`输入内容，在控制台中得到了想要的数据，依然是一个拥有对象成员的数组。接下来需要将它们显示在页面中。

```js
function displayMatches() {
  // console.log(this.value);
  const matchArray = findMatches(this.value, cities);
  // console.log(matchArray);
  const html = matchArray.map(place => {
    return `
      <li>
        <span class="name">${place.city}, ${place.state}</span>
        <span class="suggestions">${place.population}</span>
      </li>
    `;
  }).join('');

  suggestions.innerHTML = html;
}
```

+ `map()`方法返回的依然是一个数组，因此每一个`<li></li>`之间会有一个`,`（逗号），使用`join('')`消除它。

```
["<li>place.city, place.state</li>", "<li>place.city, place.state</li>"]
=>
<li>place.city, place.state</li><li>place.city, place.state</li>
```

+ 至此，已经基本完成了需要的功能，接下来还需要高亮显示匹配到的文本。

```js
const html = matchArray.map(place => {
  const regex = new RegExp(this.value, 'gi');
  const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
  const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
  return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="suggestions">${place.population}</span>
    </li>
  `;
}).join('');
```

+ 首先，创建正则表达式，目的是为了对输入值匹配到的结果忽略大小写。

```js
const cityName = place.city.replace(this.value, `<span class="hl">${this.value}</span>`);
```

+ 写成如上其实也可以，但由于英文的首字母为大写，如`this.value`为小写的 w 时，不会替换大写的 W 。
+ 这里实质上是用加了`<span></span>`标签的 HTML 元素替换了普通的字符串。可以在 css 中设置背景色等达成高亮效果。
