'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/intellmanagerV3.0': {
                // target: 'http://192.168.0.245:8082/intellmanagerV3.0',
                target: 'http://192.168.0.110:8081/intellmanagerV3.0',
                // target: 'http://192.168.0.143:8081/intellmanagerV3.0',
                // target: 'http://192.168.0.194:8081/intellmanagerV3.0',
                // target: 'http://117.78.42.182:8080/intellmanagerV3.0',
                // target: 'http://www.ubicell.cn:8080/intellmanagerV3.0',
                // target: 'http://www.ubicell.com:8080',
                // target: 'http://117.78.42.182:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/intellmanagerV3.0': '/'
                }
            }
        },

        // Various Dev Server settings
        host: '192.168.0.196', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../intellmanagerV3.0/index.html'),
        // Paths
        assetsRoot: path.resolve(__dirname, '../intellmanagerV3.0'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}