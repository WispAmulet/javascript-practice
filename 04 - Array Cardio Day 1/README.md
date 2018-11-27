Note
===

> [预览效果](https://wispamulet.github.io/js-practice/javascript30.com/04%20-%20Array%20Cardio%20Day%201/index.html)

JS
===

> [filter()](http://javascript.ruanyifeng.com/stdlib/array.html#toc16)

+ `filter`方法的参数是一个函数，所有数组成员依次执行该函数，返回结果为`true`的成员组成一个新数组返回。该方法不会改变原数组。

+ `filter`方法的参数函数可以接受三个参数，第一个参数是当前数组成员的值，这是必需的，后两个参数是可选的，分别是当前数组成员的位置和整个数组。

+ `filter`方法还可以接受第二个参数，指定测试函数所在的上下文对象（即`this`对象）。

> [map()](http://javascript.ruanyifeng.com/stdlib/array.html#toc14)

+ `map`方法对数组的所有成员依次调用一个函数，根据函数结果返回一个新数组。该方法不会改变原数组。

+ `map`方法接受一个函数作为参数。该函数调用时，`map`方法会将其传入三个参数，分别是当前成员、当前位置和数组本身。

+ `map`方法还可以接受第二个参数，表示回调函数执行时`this`所指向的对象。

> [sort()](http://javascript.ruanyifeng.com/stdlib/array.html#toc13)

+ `sort`方法对数组成员进行排序，默认是按照字典顺序排序。排序后，`原数组将被改变`。

+ `sort`方法不是按照大小排序，数值会被先转成字符串，再按照字典顺序进行比较。

> [reduce()，reduceRight()](http://javascript.ruanyifeng.com/stdlib/array.html#toc18)

+ `reduce`方法和`reduceRight`方法依次处理数组的每个成员，最终累计为一个值。

+ `reduce`是从左到右处理（从第一个成员到最后一个成员），`reduceRight`则是从右到左（从最后一个成员到第一个成员），其他完全一样。

+ 这两个方法的第一个参数都是一个函数。该函数接受以下四个参数。

  - 累积变量，默认为数组的第一个成员
  - 当前变量，默认为数组的第二个成员
  - 当前位置（从0开始）
  - 原数组

+ 第二个参数相当于设定了默认值，处理空数组时尤其有用。
