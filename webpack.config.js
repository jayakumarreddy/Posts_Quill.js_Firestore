const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlplugin = new HtmlWebPackPlugin({
    template:"./src/index.html",
    filename:"./index.html"
});

module.exports ={
    module:{
        rules :[{
            test :/\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }]
    },
    plugins : [htmlplugin]
};