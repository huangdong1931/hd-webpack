const fs = require('fs');
const path = require('path');

const FILENAME = 'proxy.js';

const abPath = (filename) => {
  return path.resolve(__dirname, './', filename);
};

const proxyConfig = `module.exports = { "/api": "http://127.0.0.1/" }`;

const hasProxyFile = () => {
  fs.existsSync(abPath(FILENAME)) || fs.writeFileSync(abPath(FILENAME), proxyConfig);
};

module.exports = {
  hasProxyFile
};