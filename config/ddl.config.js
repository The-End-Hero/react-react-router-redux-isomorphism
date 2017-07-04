const webpack = require('webpack');

const vendors = [
    'react',
    'react-dom',
    'react-router',
    // ...其它库
];

module.exports = {
    output: {
        path: 'build',
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'asset-manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ],
};