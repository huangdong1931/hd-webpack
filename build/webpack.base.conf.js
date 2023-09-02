/**
 * 公共基础配置
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
	}
}