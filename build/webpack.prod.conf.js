/**
 * 生产环境配置
 */

const { merge } = require('webpack-merge');
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const path = require("path");
const COMMON = require('./webpack.base.conf');
const dayjs = require('dayjs')
const ENTRY = "./src/main.js";
const OUTPUT = path.resolve(__dirname, "../dist");
const FILENAME = `static/js/${dayjs().format('YYYY-MM-DD-HH-mm-ss')}-bundle.js`;

module.exports = merge(COMMON, {
	// 单入口
	entry: ENTRY, // 相对路径
	// 出口
	output: {
		path: OUTPUT, // 绝对路径
		filename: FILENAME
	},
	// 加载器
	module: {
		rules: []
	},
	// 插件
	plugins: [
		// new OptimizeCSSAssetsPlugin({
		// 	assetNameRegExp: /\.optimize\.css$/g,
		// 	cssProcessor: require('cssnano'),
		// 	cssProcessorPluginOptions: {
		// 		preset: ['default', { discardComments: { removeAll: true } }],
		// 	},
		// 	canPrint: true
		// })
	],
	// 模式
	mode: "production"
})