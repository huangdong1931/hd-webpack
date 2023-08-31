/**
 * 生产环境配置
 */

const path = require("path");
const COMMON = require('./webpack.base.conf');
const { merge } = require('webpack-merge');

// const 

const ENTRY = "./src/main.js";
const OUTPUT = path.resolve(__dirname, "../dist");
const FILENAME = `static/js/bundle.js`;

module.exports = merge(COMMON, {
	entry: ENTRY,
	output: {
		path: OUTPUT,
		filename: FILENAME
	},
	module: {
		rules: []
	},
	plugins: [],
	mode: "production"
})