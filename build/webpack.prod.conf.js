/**
 * 生产环境配置
 */

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const { resolve } = require("path");
const COMMON = require('./webpack.base.conf');
const { merge } = require('webpack-merge');


module.exports = merge(COMMON, {
	entry: "./src/main.js",
	output: {
		path: resolve(__dirname, "../dist"),
		filename: 'static/js/bundle.js'
	},
	optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: resolve(__dirname, '../index.html'),
			inject: true,
			minify: false,
			chunksSortMode: 'auto'
		}),
		new MiniCssExtractPlugin({
			filename: 'static/css/[name].[hash].css'
		})
	],
	mode: "production"
})