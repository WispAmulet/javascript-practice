Note
===

> [预览效果](https://wispamulet.github.io/js-practice/javascript30.com/13%20-%20Slide%20in%20on%20Scroll/index.html)

CSS
===

```css
.slide-in {
  opacity:0;
  transition:all .5s;
}
.align-left.slide-in {
  transform:translateX(-30%) scale(0.95);
}
.align-right.slide-in {
  transform:translateX(30%) scale(0.95);
}

.slide-in.active {
      opacity:1;
      transform:translateX(0%) scale(1);
    }
```

所有的图片都设置了透明度为0，位移以及缩放效果，因此只要在合适的时机为它们添加`class="active"`，让它们恢复正常就能实现滚动时的`slide`特效。

JS
===

```js
function checkSlide(e) {
  console.count(e);
}

window.addEventListener('scroll', checkSlide);
```

当滚动时，虽然获得了对应的事件，但是可以看到事件的数量太多了，既没有必要，也会影响性能。因此引入了`debounce`函数，目的在于最多每 xx 秒执行一次`checkSlide()`函数。

```js
const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
  // console.count(e);
  // console.log(window.scrollY + window.innerHeight);
  sliderImages.forEach(sliderImage => {
    // half way through the image
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
    // bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;

    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));
```

+ `window.scrollY` 窗口在 Y 轴正方向滚动的距离，初始为 0
+ `window.innerHeight` 窗口可视部分的高度，即 viewport 的高度
+ `sliderImage.height` 图片的高度
+ `sliderImage.offsetTop` 图片顶部到页面最顶端的距离

+ 当窗口底部刚好为图片一半高度时，`window.scrollY + window.innerHeight` = `sliderImage.offsetTop + sliderImage.height / 2`，继续滚动，即满足了`isHalfShown = true`
+ 当窗口顶部刚好为图片底部时，`window.scrollY` = `imageBottom`，也就是说这张图片还没有完全从窗口区域消失时，满足`isNotScrolledPast = true`
+ 最终效果为，当页面滚动超过图片一半的高度时，显示图片，继续滚动，当图片从页面消失时，隐藏图片