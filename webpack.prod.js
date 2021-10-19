const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var path = require('path');

var APP_DIR = path.resolve(__dirname, 'client/src');

const common = require('./webpack.config.js');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        usedExports: true, // <- remove unused function
        minimizer: [
            new CssMinimizerPlugin(),
            new UglifyJsPlugin({
              extractComments: true
            })
        ],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: "styles",
                    type: "css/mini-extract",
                    // For webpack@4
                    // test: /\.css$/,
                    chunks: "all",
                    enforce: true,
                },
            },
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
            ignoreOrder: false, 
        }),
        // new BundleAnalyzerPlugin()
        // new UnusedFilesWebpackPlugin({
        //     failOnUnused: true,
        //     patterns: ["**/*.*"]
        // })
    ],
    stats: 'normal',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.css$/,
                include: APP_DIR,
                use: [
                    MiniCssExtractPlugin.loader,
                    { 
                        loader: 'css-loader',
                        options: {
                            url: false,
                            // esModule: true,
                            // import: false,
                            // importLoaders: 1,
                            // modules: true,
                            // sourceMap: false,
                        },
                    }
                ]
            },
            {
                test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                // exclude: /client/public,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ],
    }
});