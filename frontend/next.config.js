const path = require('path');
const Dotenv = require('dotenv-webpack');
const withCSS = require('@zeit/next-css');

module.exports = withCSS();

module.exports = {
	webpack: config => {
		config.resolve.alias['@'] = path.resolve(__dirname);
		config.plugins.push(new Dotenv({ silent: true }));
		return config;
	},
};
