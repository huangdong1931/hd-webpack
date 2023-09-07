/**
 * 为dist下的html添加打包信息
 */

const shell = require('shelljs');
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { execSync } = require('child_process');
const moment = require('dayjs');

const getCurrentBranch = () => {
  if (shell.which('git')) {
    return execSync('git rev-parse --abbrev-ref HEAD').toString();
  } else {
    console.log(chalk.red('Error: '));
    console.log(chalk.yellow('git found not'));
    console.log();
    process.exit(1);
  }
};
const getCurrentTime = () => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}
const setPublishInfo = ({ outPath }) => {
  let htmlStr = readFileSync(resolve(__dirname, outPath), 'utf-8');
  let el = `<meta data-publish-time="${getCurrentTime()}" data-publish-branch="${getCurrentBranch()}"><title>`
  writeFileSync(resolve(__dirname, outPath), htmlStr.replace('<title>', el));
}
const plugin = 'publish-webpack-plugin';

class PublishWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    // 在dist输出后调用
    compiler.hooks.afterEmit.tap(plugin, (compilation) => {
      setPublishInfo(this.options);
    });
  }
}

module.exports = PublishWebpackPlugin;