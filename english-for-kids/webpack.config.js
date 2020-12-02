const path = require('path')
const HTMLWebpackPlugin = require ('html-webpack-plugin')
const {CleanWebpackPlugin} = require ('clean-webpack-plugin')
const CopyWebpackPlugin = require ('copy-webpack-plugin')
const MiniCssExtractPlugin = require ('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require ('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require ('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if(isProd){
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader, 
      options: {
        publicPath: ''
      }
    },
    'css-loader'
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

module.exports = {
  context: path.resolve (__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './scripts/main.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  output: {
    filename: filename('js'),
    path: path.resolve (__dirname, 'dist')
  },
  optimization: optimization(),
  devtool: (isDev) ? 'source-map' : '',
  plugins: [
    new HTMLWebpackPlugin( {
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin ({ 
      patterns: [
        {from: path.resolve(__dirname, 'src/assets/favicon.ico'),
        to: path.resolve(__dirname, 'dist/assets/favicon.ico')},
        {from: path.resolve(__dirname, 'src/assets/'),
        to: path.resolve(__dirname, 'dist/assets/')}
      ]
      }
    ),
    new MiniCssExtractPlugin ({
      filename: filename('css')
    })
  ], 
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.{png|jpg|svg|gif|ico}$/,
        use: ['file-loader']
      }
    ]
  }
}