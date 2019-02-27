# Note

# JS

```js
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

const sortBands = bands.sort((a, b) => a > b ? 1 : -1);

const ul = document.querySelector('#bands');
ul.innerHTML = sortBands.map(band => `<li>${band}</li>`).join('');
```

+ 对`bands`数组重新排序，这里要用到`sort`方法

```js
function strip(band) {
  return band.replace(/^(a |an |the )/i, '').trim();
}

const sortBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);
```

+ 为了消除数组元素中以 a，an，the 开头的句子在排序时造成的影响，使用了正则表达式
+ 这里把`strip()`函数放在`sort()`函数中判断`a > b`时使用，这样不会改变数组元素本身的值
