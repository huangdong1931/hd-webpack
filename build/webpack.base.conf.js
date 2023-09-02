/**
 * 公共基础配置
 */

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	plugins: [
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {}
				},
					'style-loader',
					'css-loader']
			}
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			
		})
	]
}