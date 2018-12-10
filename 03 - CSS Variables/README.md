# Note

## HTML

> [HTML <label> 标签](http://www.w3school.com.cn/tags/tag_label.asp)

```html
<label for="spacing">Spacing:</label>
<input id="spacing" type="range" name="spacing" min="10" max="200" value="10" data-sizing="px">
```

for 属性规定 label 与对应 id 属性的表单元素`绑定`。

## CSS

> [:root](https://developer.mozilla.org/en-US/docs/Web/CSS/:root)

```css
:root {
  --base: #ffc600;
  --spacing: 10px;
  --blur: 10px;
}
```

声明全局CSS变量时`:root`很有用。

> [使用CSS变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables)

```css
img {
  padding: var(--spacing);
  background: var(--base);
  filter: blur(var(--blur));
}
.hl {
  color: var(--base);
}
```

像这样使用CSS变量。

> [CSS3 filter(滤镜) 属性](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)

`filter: blur(px)`给图像设置高斯模糊。

## JS

```js
const inputs = document.querySelectorAll('.controls input'); // NodeList, not Array

function handleUpdate() {
	// console.log(this);
	// console.log(this.dataset);
	const suffix = this.dataset.sizing || '';
	// console.log(suffix);
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
input.forEach(...);
```

+ NodeList不是数组，但是也可以使用`forEach()`方法。

+ `this.dataset`指的是包含自定义的`data-*`属性的Obeject，本例在`<input>`中只设置了`data-sizing="px"`，也可以设置多个`data-*`属性。

+ 通过`this.dataset.sizing`访问`data-sizing`的值，这里为`px`。如果某一个`this`中没有`data-sizing`会得到`undefined`，因此最好写为`this.dataset.sizing || ''`。

+ `this.name`为NodeList中某一项对应的`name="..."`的值。具体为`spacing` `blur` `base`。

+ `document.documentElement`属性返回当前文档的根节点(root)，这里为`<html>`节点。把`this.value`获得的值`+`上`suffix`的值(即`px`)赋给对应的`--${this.name}`。等同于在根节点改变了`--spacing` `--blur` `--base`的值。

>[document节点](http://javascript.ruanyifeng.com/dom/document.html#toc2)

>[CSS操作](http://javascript.ruanyifeng.com/dom/css.html#toc3)
