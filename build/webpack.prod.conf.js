/**
 * 生产环境配置
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const { resolve } = require("path");
const COMMON = require('./webpack.base.conf');
const { merge } = require('webpack-merge');


module.exports = merge(COMMON, {
	entry: "./src/main.js",
	output: {
		path: resolve(__dirname, "../dist"),
		filename: 'static/js/bundle.js'
	},
	module: {
		rules: []
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve(__dirname, '../index.html'),
			inject: true,
			minify: true,
			chunksSortMode: 'auto'
		}),
		new miniCssExtractPlugin()
	],
	mode: "production"
})