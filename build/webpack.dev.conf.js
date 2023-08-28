const path = require("path");
const { merge } = require('webpack-merge');

const COMMON = require('./webpack.base.conf');

module.exports = merge(COMMON, {
	// 单入口
	entry: "./src/main.js", // 相对路径
	// 出口
	output: {
		path: path.resolve(__dirname, "../dist"), // 绝对路径
		filename: "bundle.js"
	},
	// 加载器
	module: {
		rules: []
	},
	// 插件
	plugins: [],
	// 模式
	mode: "development"
})