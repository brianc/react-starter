var path = require('path')
var node_modules = path.resolve(__dirname, 'node_modules')
var config = require('./lib/config')

const extension = process.env.NODE_ENV == 'production' ? '.min.js' : '.js'
var pathToReact = path.resolve(node_modules, `react/dist/react${extension}`)
var pathToReactDom = path.resolve(node_modules, `react-dom/dist/react-dom${extension}`)
var LessPluginAutoPrefix = require('less-plugin-autoprefix')

var ExtractTextPlugin = require('extract-text-webpack-plugin')

var entry = {
  client: ['babel-polyfill', './client.js']
}
var loaders = ['babel-loader']
var webpack = require('webpack')
var alias = {
  'react': pathToReact,
  'react-dom': pathToReactDom
}

var lessLoader = ExtractTextPlugin.extract('css!less')

var plugins =[
  new ExtractTextPlugin('style.css'),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(config.dev ? 'development' : 'production')
    }
  })
]

if(config.dev) {
  entry = {
    client: ['babel-polyfill', './client.js', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true']
  }

  loaders = ['react-hot'].concat(loaders)
  alias =  { }

  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ])

  lessLoader = 'style!css!less'
} else {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }))
}

var config = {
  entry: entry,
  resolve: {
    alias: alias
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: loaders
    }, {
      test: /\.less$/,
      loader: lessLoader
    }, {
      test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)$/,
      loader: 'url-loader?limit=8192'
    }],
    noParse: [pathToReact]
  },
  plugins: plugins,
  lessLoader: {
    lessPlugins: [new LessPluginAutoPrefix({ browsers: ['last 1 version']})]
  }
}

module.exports = config
