const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};

module.exports = {
  externals: {
    paths: PATHS,
  },

  entry: {
    // main: PATHS.src,  //Заменяет ./src/index.js Webpack сам понимает, что ему нужно взять
    main: `${PATHS.src}/main.js`,
    innerPage: `${PATHS.src}/inner-page.js`,
    forPageWithChangeMenuColor: `${PATHS.src}/forPageWithChangeMenuColor.js`,
    forPageWithExpandedUl: `${PATHS.src}/forPageWithExpandedUl.js`,
  },

  output: {
    filename: `${PATHS.assets}js/[name].js`, // При использованиии [name] название берется из ключа объекта точки входа. Заменяет [name].js
    path: PATHS.dist, //Заменяет path.resolve(__dirname, './dist')
    publicPath: '/', //С этим параметром девсервер будет работать только при наличии файлов в папке dist
  },
  optimization: {
    //Для того, чтобы кешировать js библиотеки
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/, //Библиотеки из node_modules, а также стандартный код webpack
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },

      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },

      {
        test: /\.scss$/,

        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }, //Зачем?
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: `./postcss.config.js`,
              },
            }, //Зачем? Было path: `${PATHS.src}/js/config/postcss.config.js`
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }, //Зачем?
          },
        ],
      },
      {
        test: /\.css$/,

        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }, //Зачем?
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: `./postcss.config.js`,
              },
            }, //Зачем? Было path: `${PATHS.src}/js/config/postcss.config.js`
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '~': 'src', //Помогает сильно сократить запись пути в компонентах Vue, например
    },
  },
  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`, //style.css
      //chankFilename: "[id].css"
    }),
    new CopyWebpackPlugin([
      {
        from: `${PATHS.src}/${PATHS.assets}img`,
        to: `${PATHS.assets}img`,
      },
      {
        from: `${PATHS.src}/${PATHS.assets}fonts`,
        to: `${PATHS.assets}fonts`,
      },
      {
        from: `${PATHS.src}/static`,
        to: '',
      },
    ]),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/pug/pages/main-page.pug`,
      filename: './index.html',
      inject: false, //Отключает автоматическую вставку тега link с css и тега script в главный html файл, который собирается в dist
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/pug/pages/barbershop.pug`,
      filename: './barbershop.html',
      inject: false, //Отключает автоматическую вставку тега link с css и тега script в главный html файл, который собирается в dist
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/pug/pages/device.pug`,
      filename: './device.html',
      inject: false, //Отключает автоматическую вставку тега link с css и тега script в главный html файл, который собирается в dist
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/pug/pages/mishka.pug`,
      filename: './mishka.html',
      inject: false, //Отключает автоматическую вставку тега link с css и тега script в главный html файл, который собирается в dist
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/pug/pages/portfolio.pug`,
      filename: './portfolio.html',
      inject: false, //Отключает автоматическую вставку тега link с css и тега script в главный html файл, который собирается в dist
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/pug/pages/code-and-magic.pug`,
      filename: './code-and-magic.html',
      inject: false, //Отключает автоматическую вставку тега link с css и тега script в главный html файл, который собирается в dist
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/pug/pages/kekstagram.pug`,
      filename: './kekstagram.html',
      inject: false, //Отключает автоматическую вставку тега link с css и тега script в главный html файл, который собирается в dist
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/pug/pages/toxin.pug`,
      filename: './toxin.html',
      inject: false, //Отключает автоматическую вставку тега link с css и тега script в главный html файл, который собирается в dist
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/pug/pages/pixel-hunter.pug`,
      filename: './pixel-hunter.html',
      inject: false, //Отключает автоматическую вставку тега link с css и тега script в главный html файл, который собирается в dist
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/pug/pages/eightball.pug`,
      filename: './eightball.html',
      inject: false, //Отключает автоматическую вставку тега link с css и тега script в главный html файл, который собирается в dist
    }),
  ],
};
