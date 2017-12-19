const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  devtool: 'eval',
  entry: [path.join(`${__dirname}/client/clientEntry.js`)],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      'process.env.APP_ENV': JSON.stringify('browser'),
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(es6|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /^((?!font\.svg).)*\.svg$|\.(jpg|jpeg|gif|png)$/,
        use: `url-loader?limit=20000&name=images/[name].[ext]`,
      },
      {
        test: /font\.svg$|\.(woff|woff2|eot|ttf)$/,
        use: `url-loader?limit=1&name=fonts/[name].[ext]`,
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!less-loader',
        }),
      },
    ],
    noParse: [/\/react\//g, /\/react-dom\//g, /\/react-router-dom\//g],
  },
  stats: 'minimal',
};
