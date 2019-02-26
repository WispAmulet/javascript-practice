# Note

## HTML

```html
<ul class="plates">
  <li>Loading Tapas...</li>
</ul>
<form class="add-items">
  <input type="text" name="item" placeholder="Item Name" required />
  <input type="submit" value="+ Add Item" />
</form>
```

+ 用户在`form`中输入的文本将会渲染到`ul`元素内

## CSS

```css
.plates input {
  display: none;
}
.plates input + label:before {
  content: '⬜️';
  margin-right: 10px;
}
.plates input:checked + label:before {
  content: '🌮';
}
```

+ `ul.plates`内的`input`都是`checkbox`，不显示
+ 在`label`前添加伪元素，根据是否`checked`，改变内容
+ 相当于根据`content`中不同的值，自定义这些`<input type="checkbox" />`的样式

## JS

```js
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = [];

function addItem(e) {
  e.preventDefault();
  const { value: text } = e.target.querySelector('[name=item]');
  const item = {
    text,
    done: false
  };
  items.push(item);
  e.target.reset(); // 重置 <input /> 框里的值
}

addItems.addEventListener('submit', addItem);
```

+ 监测`form`上的`submit`事件，执行函数
+ 用户每次输入的内容会存储在`item`对象中，并且有一个布尔值的属性表示是否完成的状态
+ `items`数组用来保存`item`对象

```js
function addItem(e) {
  /* ... */
  items.push(item);
  populateList(items, itemsList);
  e.target.reset();
  localStorage.setItem('items', JSON.stringify(items));
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => `
    <li>
      <input type="checkbox" data-index=${i} id="item${i}" />
      <label for="item${i}">${plate.text}</label>
    </li>
  `).join('');
}
```

+ 用另一个函数把`items`数组遍历为模板字符串，再替换到`ul`元素中
+ 当数据只存储在`items`数组中时，每次刷新页面都会重置，因此引入`localStorage`来保存数据，`localStorage`是 key => value 对应的数据
+ `localStorage`中 value 保存的是字符串，但`items`是数组，通过`JSON.stringify()`方法转化为字符串

```js
const items = JSON.parse(localStorage.getItem('items')) || [];
/* ... */

populateList(items, itemsList);
```

+ 修改`items`，先从`localStorage`读取，如果是第一次加载页面，`localStorage`中没有 key 为 'items' 项时，会返回`null`，此时`items`依然是一个空数组
+ 每次刷新页面，会执行一次`populateList()`函数，然后把`localStorage`中保存的数据渲染到页面上

```js
// const checkboxes = document.querySelectorAll('input[type="checkbox"');
// checkboxes.forEach(input => input.addEventListener('click', () => {
//   console.log('hi');
// }))

function toggleDone(e) {
  if (!e.target.matches('input')) return;
  const { index } = e.target.dataset;
  items[index].done = !items[index].done;
  // populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
}

itemsList.addEventListener('click', toggleDone);
```

+ 为了保存每一项是否完成的状态，需要添加一个`click`事件，当点击每一项`<li></li>`时，修改对应`item`对象中的`done`属性的值
+ 如果把事件添加在每一项`li`元素或者每一个`input`元素上，由于每一次提交表单，`ul`元素内的内容会重新生成，添加的`click`事件监听将会失效
+ 因此，把`click`事件添加在它们的父级元素也就是`ul`元素上，因为该元素始终存在，不会改变，这种行为叫作事件委托
+ 当点击`ul`元素内的区域时，会根据不同的区域，得到不同的`e.target`，而这里只需要关注其中的`input`元素
+ 每一个`input`元素上有一个`data-index`属性，根据这个值唯一的属性，找到`items`数组中对应的对象，因为`done`属性是布尔值，每次赋值都与之前相反
+ 然后再保存到`localStorage`中
