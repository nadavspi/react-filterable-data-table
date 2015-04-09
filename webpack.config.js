module.exports = {
    devtool: "eval",
    entry: "./app/App.js",
    output: {
        filename: "public/bundle.js"
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader'}
        ]
    }
};
