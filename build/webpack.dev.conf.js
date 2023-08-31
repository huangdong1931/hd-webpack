/**
 * 开发环境配置
 */

const path = require("path");
const { merge } = require('webpack-merge');

const COMMON = require('./webpack.base.conf');

const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = merge(COMMON, {
	entry: [
    'webpack-hot-middleware/client',
    './src/main.js'
  ],
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "bundle.js"
	},
	module: {
		rules: []
	},
	plugins: [
    new HotModuleReplacementPlugin(),
	],
	devtool: 'source-map',
	mode: "development"
})