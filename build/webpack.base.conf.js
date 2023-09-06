/**
 * 公共基础配置
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');

module.exports = {
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
				test: /\.(le|sc|c)ss$/,
				use: [
					process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader']
			},
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
		],
	}
}