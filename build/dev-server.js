
// 初始化代理
const { hasProxyFile } = require('./createProxy');
hasProxyFile();
// 检查npm node版本号
require('./check-versions')();

// 配置常量
const PORT = process.env.PORT || process.argv[2] || 3000;
const LOCAL_URL = `http://localhost:${PORT}`;
const PROXY = require('./proxy.js');
const DEV_CONFIG = require('./webpack.dev.conf');
const opn = require('opn');
const webpack = require('webpack');

// 创建 express 服务 挂载资源并启动本地服务
const express = require('express');

/**
 * 配置中间件
 * webpack-dev-middleware 
 * 1. 不写入磁盘在内存中处理文件
 * 2. 监听变更，延迟请求，直至编译完成
 * 3. 支持模块HMR
 */
// 实例化 express 服务
const app = express();
// 用读取到的 Webpack 配置实例化一个 Compiler
const compiler = webpack(DEV_CONFIG);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
// 给 app 注册 webpackMiddleware 中间件 将编译资源写入内存
app.use(webpackDevMiddleware(compiler, {
  publicPath: DEV_CONFIG.output.publicPath
}));
// 为了支持模块热替换，响应用于替换老模块的资源
app.use(webpackHotMiddleware(compiler));

// 把项目根目录作为静态资源目录，用于服务 HTML 文件
app.use(express.static('.'));

// 启动本地服务
app.listen(PORT, () => {
  console.log(`Server is running at ${LOCAL_URL}`);
  opn(LOCAL_URL);
});

