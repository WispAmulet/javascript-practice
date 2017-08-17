Note
===

> [预览效果](https://wispamulet.github.io/js-practice/javascript30.com/09%20-%20Dev%20Tools%20Domination/index.html)

JS
===

1. attribute modification

   + 点击文本，字体颜色改变，大小改变
   + 刷新页面，打开控制台，找到对应的元素，右键 => break on => attribute modification
   + 再次点击文本，页面上显示 Paused in debugger，控制台也自动跳转到正在执行的 Javascript 脚本

2. console.log();

   ```js
   // 普通用法
   console.log('Hello!'); // Hello!

   // 插入字符串
   console.log('Hello I am %s!', 'WORLD');
     // 或者用 ES6 的 ``
     var str = 'WORLD'
     console.log(`Hello I am ${str}!`);

   // 添加样式
   console.log('%c Hello!', 'font-size: 50px; background-color: red;');

   // warning!
   console.warn('Oh nooo!');

   // Error :|
   console.error('Shit!');

   // Info
   console.info('Crocodiles eat 3-4 people per year.');

   // Testing 当表达式为 false 时，才起作用
   console.assert(1 === 2, 'That is wrong!');
     // 比如说用来检测 p 是否有对应的 class，如果有，什么都不会发生，如果没有，会显示 Assertion failed
     const p = document.querySelector('p');
     console.assert(p.classList.contains('ouch'), 'There is no such a class!');

   // clearing 清除信息
   console.clear();

   // Viewing DOM Elements
   const p = document.querySelector('p');
   console.log(p); // 会显示 p 元素本身
   console.dir(p); // 可以查看 p 上所有的方法和属性

   // Grouping together 如果有很多行 console.log()，可以用 console.group() 把它们划为组
   dogs.forEach(dog => {
     console.groupCollapsed(`${dog.name}`);
     console.log(`This is ${dog.name}`);
     console.log(`${dog.name} is ${dog.age} years old`);
     console.groupEnd(`${dog.name}`);
   })

   // counting 可以用来计数
   console.count('Wes');
   console.count('Bos');
   console.count('Wes');
   console.count('Bos');
   console.count('Wes');
   console.count('Bos');
   console.count('Wes');
   console.count('Bos');
   console.count('Wes');
   console.count('Wes');
   console.count('Bos');

   // timing 可以用来计时某一个操作用了多久
   console.time('fetch data');
   fetch('https://api.github.com/users/wesbos')
     .then(blob => blob.json())
     .then(data => {
       console.timeEnd('fetch data');
       console.log(data);
     });

   // table
   console.table(dogs);
   ```