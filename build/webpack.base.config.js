const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
  pugPages: path.join(__dirname, '../src/pug/pages'),
};

const pugPages = fs.readdirSync(PATHS.pugPages);

const htmlPages = pugPages.map((item) => {
  if (item == 'main-page.pug') {
    return item.replace('main-page.pug', 'index.html');
  } else {
    return item.replace('.pug', '.html');
  }
});

module.exports = {
  externals: {
    paths: PATHS,
  },

  entry: {
    main: `${PATHS.src}/main.js`,
    innerPage: `${PATHS.src}/inner-page.js`,
    forPageWithChangeMenuColor: `${PATHS.src}/forPageWithChangeMenuColor.js`,
    forPageWithExpandedUl: `${PATHS.src}/forPageWithExpandedUl.js`,
  },

  output: {
    filename: `${PATHS.assets}js/[name].js`, // При использованиии [name] название берется из ключа объекта точки входа
    path: PATHS.dist,
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
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: `./postcss.config.js`,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
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
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: `./postcss.config.js`,
              },
            },
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
      filename: `${PATHS.assets}css/[name].css`,
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

    ...pugPages.map(
      (page, index) =>
        new HtmlWebpackPlugin({
          template: `${PATHS.pugPages}/${page}`,
          filename: `./${htmlPages[index]}`,
          inject: false, //Отключает автоматическую вставку тега link с css и тега script в главный html файл, который собирается в dist
        })
    ),
  ],
};
