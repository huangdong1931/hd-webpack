/**
 * 开发环境配置
 */

const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { resolve } = require("path");
const { merge } = require('webpack-merge');
const COMMON = require('./webpack.base.conf');

module.exports = merge(COMMON, {
	entry: [
		'webpack-hot-middleware/client',
		'./src/main.js'
	],
	output: {
		path: resolve(__dirname, "../dist"),
		filename: "bundle.js"
	},
	/**
	 * 为自己编写的 loader 取一个别名 
	 * 路径是编写 loader 的绝对路径
	 */
	resolveLoader: {
		alias: {
			'tpl-loader': resolve(__dirname, './loaders/tpl/index.js')
		}
	},
	module: {
		rules: [
			{
				test: /\.tpl$/,
				use: [
					{
						loader: 'tpl-loader',
						options: {
							log: true
						}
					}
				]
			}
		]

	},
	plugins: [
		new HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: resolve(__dirname, '../index.html'),
			inject: true,
			minify: false,
			chunksSortMode: 'auto'
		})
	],
	mode: "development",
	devtool: 'source-map',
})