/**
 * 公共基础配置
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PublishWebpackPlugin = require('./publish-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.(le|sc|c)ss$/,
				use: [
					process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader']
			}
		],
	},
	plugins: [
		new PublishWebpackPlugin({
			replaceFlag: 'id="app"',
			htmlOutputPath: '../dist/index.html'
		})
	]
}