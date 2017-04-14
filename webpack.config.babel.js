import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config = {
  entry: './src/js/app.js',
  output: {
    filename: './dist/js/script.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'url-loader?mimetype=image/svg+xml',
        },
      },
      {
        test: /\.woff$/,
        use: 'url-loader?mimetype=application/font-woff',
      },
      {
        test: /\.woff2$/,
        use: 'url-loader?mimetype=application/font-woff',
      },
      {
        test: /\.eot$/,
        use: 'url-loader?mimetype=application/font-woff',
      },
      {
        test: /\.ttf$/,
        use: 'url-loader?mimetype=application/font-woff',
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new ExtractTextPlugin({
      filename: './dist/css/style.css',
      disable: false,
      allChunks: true,
    }),
  ],
};

export default config;
