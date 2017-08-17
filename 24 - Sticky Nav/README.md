Note
===

> [预览效果](https://wispamulet.github.io/js-practice/javascript30.com/24%20-%20Sticky%20Nav/index.html)

CSS
===

```css
nav {
  position: relative;
}
body.fixed-nav nav {
  position: fixed;
  box-shadow:0 5px 0 rgba(0,0,0,0.1);
}

li.logo {
  max-width: 0;
  /*width: 0;*/
}
.fixed-nav li.logo {
  max-width: 500px;
  /*width: 500px;*/
}

.site-wrap {
  transform: scale(0.98);
}
.fixed-nav .site-wrap {
  transform: scale(1);
}
```

+ 当页面滚动到导航栏时，为导航栏添加`class="fixed-nav"`
+ `nav`的`position`由`relative`变为`fixed`
+ 导航栏中的`<li></li>`最大宽度由 0 变为 500。为什么用`max-width`而不是`width`呢？
  + 列表中的`<li></li>`设置`width: 0;`并不会起作用
  + 就算把初始`max-width`设置为0达到隐藏的效果，后续改为`width: auto`或是一个具体的值，也不会起作用
+ 除此之外，文章区域也改变了`scale`的值

JS
===

```js
const nav = document.querySelector('#main');
const topOfNav = nav.offsetTop;

function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-nav');
  }
}

window.addEventListener('scroll', fixNav);
```

+ `topOfNav`是导航栏顶部到页面顶部的距离
+ 当滚动的距离 > `topOfNav`时，为`body`添加`class="fixed-nav"`，css 文件中的一系列设置都起作用了
+ 当某一个元素的`position`设置为`fixed`时，它不会占用底部页面的空间，因此，额外设置`padding-top`的值来弥补之前占用的空间