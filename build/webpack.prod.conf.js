/**
 * 生产环境配置
 * @CleanWebpackPlugin 打包前移除之前的包内容
 * @PublishWebpackPlugin 为生成的dist包添加打包信息
 * @HtmlWebpackPlugin 自动生成HTML并引入打包的js文件
 * @MiniCssExtractPlugin 将css代码从js中提取出来
 * @CssMinimizerPlugin 压缩、去除重复css代码
 * @TerserWebpackPlugin 压缩、混淆js代码<原生webpack5压缩 与 CssMinimizerPlugin 冲突>
 */

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PublishWebpackPlugin = require('./plugins/publish-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

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
			new TerserWebpackPlugin({
				terserOptions: {
					mangle: true,
				}
			})
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
		}),
		new PublishWebpackPlugin({
			replaceFlag: 'id="app"',
			htmlOutputPath: resolve(__dirname, '../dist/index.html')
		})
	],
	mode: "production"
})