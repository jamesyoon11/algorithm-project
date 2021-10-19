var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'client/public');
var APP_DIR = path.resolve(__dirname, 'client/src');

const plugins = [
    
];

var config = {
    context: __dirname,
    entry: ["./client/src/index.js"],
    plugins: plugins,
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    output: {
        path: BUILD_DIR,
        filename: "bundle.js"
    },
    devServer: {
        contentBase: BUILD_DIR,
        hot: true,
        compress: true,
        // host: '192.168.1.77',
        port: 8080,
        historyApiFallback: true,
    },
    devtool: 'eval-cheap-module-source-map',
    module: {
        rules: [
          {
            test: /\.(jsx|js|ts|tsx)$/,
            include: APP_DIR,
            exclude: /node_modules/,
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: "defaults",
                                },
                            ],
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            ],
          },
          {
            test: /\.css$/,
            include: APP_DIR,
            exclude: /node_modules/,
            use: [
                'style-loader',
                { 
                    loader: 'css-loader',
                    options: {
                        url: false
                    }
                },
                
            ]
          },
        ],
    },
};

module.exports = config;
