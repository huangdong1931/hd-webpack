/**
 * 公共基础配置
 */

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
    	},
			inject: true,
			chunksSortMode: 'auto'
		})
	],
	module: {
		rules: [],
	},
}