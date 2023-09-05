import './assets/css/common.css';
import './assets/css/index.css';
import tpl from './assets/tpl/index.tpl';

const app = document.getElementById('app');
app.innerHTML = tpl({
  name: '张三',
  age: '18',
  sex: '男'
});

const add = (a, b) => a + b;
console.log(add);
console.log(add(1, 2));
console.log('测试webpack')

// 热更新
if (module.hot) {
  module.hot.accept();
}