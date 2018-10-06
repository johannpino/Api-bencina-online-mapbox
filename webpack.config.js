const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000

    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'}
                ]
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: 'file-loader'
              }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    optimization:{
        splitChunks:{
            cacheGroups: {
                commons: {
                    test: /[\\/]node_module[\\/]/,
                    name: 'common',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
}