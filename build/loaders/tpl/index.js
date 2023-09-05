/**
 * 
 * @param {loader 匹配到的资源文件} source 
 * @returns 
 */

const { replaceTpl } = require('./utils');

const tplLoader = (source) => {
  source = source.replace(/\s+/g, '');
  return `export default (options) => {
    ${replaceTpl.toString()}
    return replaceTpl('${source}', options)
  }`
};

module.exports = tplLoader;