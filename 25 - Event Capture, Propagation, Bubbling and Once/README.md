# Note

## HTML

```html
<div class="one">
  <div class="two">
    <div class="three">
    </div>
  </div>
</div>
```

## JS

```js
const divs = document.querySelectorAll('div');

function logText() {
  console.log(this.classList.value);
}

// document.body.addEventListener('click', logText);
divs.forEach(div => div.addEventListener('click', logText));
```

When someone click on element `<div class="three"></div>`.

The browser will first do something called `capture`, which means when you click on the element, it's going to ripple down. It's going to say, 'Okay, you clicked on the body, you clicked on one, you clicked on two and you clicked on three.' It goes from the top down, and then it captures all of these events.

It just captures where you clicked and storing them before the events have been fired.

After the browser figuring out what you've clicked on all the way down, it will start firing off those click events on three, then two, then one then body and anything else you're listening for.

It starts at the bottom, and this is something called a `bubble`. It will ripple all the way up to the top of the document and trigger click on those elements as well.

So, we will get `three -> two -> one` in that console.

```js
function logText() {
  console.log(this.classList.value);
}

divs.forEach(div => div.addEventListener('click', logText, {
  capture: true // By default it's false
}));
```

After we passed a third argument which is an `options object` to `addEventListener()` method, and say `capture` is going to be equal to true. The result in that `console.log()` would be `one -> two -> three`.

Why?

The reason is at this moment the function `logText` is not going to get run on the bubble up, it's going to get run on the capture down.

```js
function logText(e) {
  e.stopPropagation();
  console.log(this.classList.value);
}

divs.forEach(div => div.addEventListener('click', logText, {
  capture: false
}));
```

Let's set `capture` to false again and run `stopPropagation()` method on the event. What that will do is it will say, 'Stop bubbling this event up. I clicked the one that I actually wanted.'

Click on element `<div class="three"></div>` again And it will only get `three`.

If we use them in conjunction, run `e.stopPropagation()` and also set `capture` to true, what will we get now?

No matter where you click on `three` or `two` or `one`, the result will only be `one`. Because if we set capture to true, the function will run on the capture down and stop bubbling the event.

```js
function logText(e) {
  console.log(this.classList.value);
}

divs.forEach(div => div.addEventListener('click', logText, {
  capture: false,
  once: true
}));
```

And there is another property in that `options object` which is `once`. If we set it to true, it will listen for a click once and then unbind itself. Unbinding itself is just like `removeEventListener()`.

This might be very helpful if you only wanted somebody to click a button or checkout box once.
