var webpack = require('webpack');
module.exports = {
    entry: "./src/doDraw.ts",
    output: {
        filename: "./bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            }
            ,
            {
                //IMAGE LOADER
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            }
            ,
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },

    // Other options...
};