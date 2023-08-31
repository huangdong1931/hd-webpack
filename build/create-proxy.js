/**
 * 创建代理文件脚本
 * @fs 内置文件操作模块
 * @path 内置路径解析方法
 */

const fs = require('fs');
const path = require('path');

const FILE_NAME = 'proxy.js';
const proxyConfig = `module.exports = { "/api": "http://127.0.0.1/" }`;
const abPath = (filename) => {
  return path.resolve(__dirname, './', filename);
};

const hasProxyFile = () => {
  fs.existsSync(abPath(FILE_NAME)) || fs.writeFileSync(abPath(FILE_NAME), proxyConfig);
};

module.exports = {
  hasProxyFile
};