/**
 * 公共基础配置
 * vue、html、css、js、图片资源等资源抽离、压缩、合并
 */

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');
// const TEMPLATE = path.resolve(__dirname, '../', 'public/index.html');
const CSS_FILENAME = `static/css/[name].[contenthash].css`

module.exports = {
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			// template: TEMPLATE,
			minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
    	},
			inject: true,
			chunksSortMode: 'auto'
		}),
		new MiniCssExtractPlugin({
			filename: CSS_FILENAME,
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
		],
	},
}