/**
 * 创建代理文件脚本
 * @fs 内置文件操作模块
 * @path 内置路径解析方法
 */

const fs = require('fs');
const path = require('path');

const createProxy = new class {
  FILE_NAME = 'proxy.js';
  PROXY_CONFIG = `module.exports = { "/api": "http://127.0.0.1/" }`;
  abPath(filename) {
    return path.resolve(__dirname, './', filename);
  }
  hasProxyFile() {
    fs.existsSync(this.abPath(this.FILE_NAME)) || fs.writeFileSync(this.abPath(this.FILE_NAME), this.PROXY_CONFIG);
  }
}();

module.exports = createProxy.hasProxyFile();