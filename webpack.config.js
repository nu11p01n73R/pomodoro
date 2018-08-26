var path = require('path')
var VueLoaderPlugin = require('vue-loader/lib/plugin')

const isProd = process.env.NODE_ENV == 'production'

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(
            __dirname, 
            isProd ? './dist' : './src'),
        filename: 'main.js'
    },
    mode: process.env.NODE_ENV,
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}