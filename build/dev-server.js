
// 初始化代理
const { hasProxyFile } = require('./createProxy');
hasProxyFile();
// 检查npm node版本号
require('./check-versions')();

// 配置常量
// const PORT = process.env.PORT || process.argv[2] || 3000;
// const LOCAL_URL = `http://localhost:${PORT}`;
// const PROXY = require('./proxy.js');
// const DEV_CONFIG = require('./webpack.dev.conf');

// 搭建本地服务
// const express = require('express');
// const app = express();
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// })





// var c = require('child_process');
// 使用默认浏览器打开
// c.exec('http://www.baidu.com');
// console.log(c.exec('npm -v'));
