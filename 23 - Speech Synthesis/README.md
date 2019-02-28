# Note

## HTML

```html
<div class="voiceinator">
  <h1>The Voiceinator 5000</h1>
  <select name="voice" id="voices">
    <option value="">Select A Voice</option>
  </select>
  <label for="rate">Rate:</label>
  <input name="rate" type="range" min="0" max="3" value="1" step="0.1">
  <label for="pitch">Pitch:</label>
  <input name="pitch" type="range" min="0" max="2" step="0.1">
  <textarea name="text">Hello! I love JavaScript 👍</textarea>
  <button id="stop">Stop!</button>
  <button id="speak">Speak</button>
</div>
```

+ `select`元素内的选项表示可供选择的语音
+ `<input name="rate" />`用来控制语音速度
+ `<input name="pitch" />`用来控制语音音调
+ `textarea`元素表示语音的内容
+ `button`用来停止/开始播放语音

## JS

```js
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;
```

+ `msg`是一个`SpeechSynthesisUtterance`对象，包含需要播放的语音的内容，音量，音调等内容
+ 通过`speechSynthesis.speak(msg)`方法可以播放语音
+ `voices`数组用来存储加载到页面上的语音，可供选择的语音根据浏览器和系统可能存在差异，并且有一个默认的语音（这个默认的语音可能和浏览器语言有关？）
+ `msg.text`的值就是播放语音的内容，也就是`textarea`框内的值

> [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)

> [SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)

```js
function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
```

+ 通过`speechSynthesis.getVoices()`方法会返回一组`SpeechSynthesisVoice`对象，此时会触发`voiceschanged`事件，把返回的这个数组保存在`voices`变量中
+ 遍历`voices`变量，渲染到`<select></select>`元素内

```js
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
}

voicesDropdown.addEventListener('change', setVoice);
```

+ `msg.voice`的值是之前提到的`SpeechSynthesisVoice`对象
+ 当选择不同的选项时，可以得到对应`<option value="something"></option>`的值，通过这个值在`voices`数组中找到对应的`SpeechSynthesisVoice`对象
+ 设置不同的语音，此时可以通过`speechSynthesis.speak(msg)`在控制台测试是否成功

```js
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}
```

+ 当一段语音没有结束时，如果切换不同的发音者，需要立即停止播放，再使用选择的发音者重新开始播放
+ `toggle()`函数用来控制取消前一段语音时，是否重新播放，默认为 true

```js
function setOption() {
  msg[this.name] = this.value;
  toggle();
}

options.forEach(option => option.addEventListener('change', setOption));

```

+ 之前提到，`msg`上的`text`属性表示语音的内容，`voice`属性表示选择的发音者
+ `options`获得的是页面上两个`input`和一个`textarea`元素，分别拥有的`name`属性是`rate`，`pitch`和`text`
+ `msg`对象上也拥有`rate`属性，表示语音速度，`pitch`属性表示音调高低
+ 因此，通过`setOption()`函数上的赋值语句可以设置语音不同的属性

```js
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

stopButton.addEventListener('click', () => toggle(false));
speakButton.addEventListener('click', toggle);
```

+ 设置开始/停止按钮的功能，可以直接把`toggle()`函数拿来用
+ 唯一的区别在于，当只需要停止播放时，传入第一个参数为`false`，就不会执行`speechSynthesis.speak(msg);`语句
