/**
 * 打包入口文件
 * npm 包 ora 提供终端动画输出
 * npm 包 chalk 提供终端文字颜色输出
 * webpack 内置回调函数 webpack()
 */

require('./check-versions')();

const ora = require('ora');
const chalk = require('chalk');
const webpack = require('webpack');

const buildByEnv = function () {
  return process.env.NODE_ENV === 'development' ? require('./webpack.dev.conf') : require('./webpack.prod.conf');
}

const WEBPACK_CONFIG = buildByEnv();

const spinner = ora(chalk.green(`building ${WEBPACK_CONFIG.mode} ...`));
spinner.start();

webpack(WEBPACK_CONFIG, function (err, stats) {
  spinner.stop();
  if (err) throw err;
  if (stats.hasErrors()) {
    console.log(chalk.red('> Build failed with errors !'));
    process.exit(1);
  }

  console.log(chalk.cyan(`\n\n> Build ${WEBPACK_CONFIG.mode} complete.`));
})

