import './assets/css/common.css';
import './assets/css/index.css';

const add = (a, b) => a + b;
console.log(add);
console.log(add(1, 2));
console.log('测试webpack')

// 热更新
if (module.hot) {
  module.hot.accept();
}