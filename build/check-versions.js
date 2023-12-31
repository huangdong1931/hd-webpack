
/**
 * 版本检测脚本
 * @semver 版本范围的解析、计算、比较
 * @shelljs Unix shell 命令执行
 */

const chalk = require('chalk');
const packageConfig = require('../package.json');
const semver = require('semver');
const shell = require('shelljs');
const { execSync } = require('child_process');

const version = new class {
  getLocalVersion() {
    let info = Object.create(null);
    info.node = semver.clean(process.version);
    if (shell.which('npm')) {
      info.npm = execSync('npm -v').toString().trim();
    } else {
      console.log(chalk.red('Error: '));
      console.log(chalk.yellow('npm found not'));
      console.log();
      process.exit(1);
    }
    return info;
  }
  getVersionAsk() {
    return {
      node: packageConfig.engines.node,
      npm: packageConfig.engines.npm
    }
  }
  collectWarning() {
    let cur = this.getLocalVersion();
    let ask = this.getVersionAsk();
    let warning = [];
    if (!semver.satisfies(cur.node, ask.node)) {
      let msg = `node: ${cur.node} should be ${ask.node}`;
      warning.push(msg);
    }
    if (!semver.satisfies(cur.npm, ask.npm)) {
      let msg = `npm: ${cur.npm} should be ${ask.npm}`;
      warning.push(msg);
    }
    return warning;
  }
  compareVersion() {
    let cur = this.getLocalVersion();
    let ask = this.getVersionAsk();
    return semver.satisfies(cur.node, ask.node) && semver.satisfies(cur.npm, ask.npm);
  }
}()

module.exports = function () {
  const pass = version.compareVersion();
  if (!pass) {
    let warning = version.collectWarning();
    console.log();
    console.log(chalk.red('Error:'))
    while (warning.length) {
      console.log(chalk.yellow(warning.pop()));
    }
    console.log('');
    console.log('');
    process.exit(1);
  }
};




















// 检测版本号是否合法
// console.log('valid:', semver.valid('1.2.30'));

// 提取版本号
// console.log('clean:', semver.clean('  =v1.2.3   '));
// console.log('major:', semver.major('1.2.3'));
// console.log('minor:', semver.minor('1.2.3'));
// console.log('patch:', semver.patch('1.2.3'));

// 检测版本号是否满足条件
// console.log('satisfies:', semver.satisfies('1.2.3', '2.x'));


// 检测版本号当前版本号是否大于指定的版本号
// console.log(semver.gt('10.2.3', '9.8.7'));
// 小于
// console.log(semver.lt('10.2.3', '9.8.7'));
// console.log('---', semver.minVersion('>=1.2.3'));
