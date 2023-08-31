/**
 * 开发环境配置
 */

const path = require("path");
const { merge } = require('webpack-merge');

const COMMON = require('./webpack.base.conf');

// 为了支持模块热替换，注入代理客户端
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = merge(COMMON, {
	entry: [
    // 为了支持模块热替换，注入代理客户端
    'webpack-hot-middleware/client',
    // JS 执行入口文件
    './src/main.js'
  ],
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "bundle.js"
	},
	// 加载器
	module: {
		rules: []
	},
	// 插件
	plugins: [
		// 为了支持模块热替换，生成 .hot-update.json 文件
    new HotModuleReplacementPlugin(),
	],
	// 模式
	devtool: 'source-map',
	mode: "development"
})