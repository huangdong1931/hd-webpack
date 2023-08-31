/**
 * 启动本地服务
 */

require('./create-proxy');
require('./check-versions')();

const PORT = process.env.PORT || process.argv[2] || 3000;
const LOCAL_URL = `http://localhost:${PORT}`;
const PROXY = require('./proxy.js');
const DEV_CONFIG = require('./webpack.dev.conf');
const opn = require('opn');
const webpack = require('webpack');

// 1. 实例化服务
const express = require('express');
const app = express();

// 2. 导入各种本地优化中间件
const compiler = webpack(DEV_CONFIG);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// 3. 注册各种本地优化中间件
app.use(webpackDevMiddleware(compiler, {
  publicPath: DEV_CONFIG.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

// 4. 挂载静态资源到服务上
app.use(express.static('.'));

// 5. 监听启动本地服务
app.listen(PORT, () => {
  console.log(`Server is running at ${LOCAL_URL}`);
  opn(LOCAL_URL);
});

