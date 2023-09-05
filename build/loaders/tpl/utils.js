/**
 * 
 * @param {loader 匹配到的资源文件} source 
 * @param {调用传入的参数} options 
 * @returns 
 */
function replaceTpl(source, options) {
  return source.replace(/\{\{(.*?)\}\}/g, (node, key) => {
    return options[key];
  });
};
module.exports = { replaceTpl };