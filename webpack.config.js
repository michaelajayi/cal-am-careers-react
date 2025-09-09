const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/widget.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cal-am-careers-widget.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
                }
              }],
              ['@babel/preset-react', {
                runtime: 'automatic'
              }]
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: {
    // Uncomment these if you want to use external React (if it's already loaded on the page)
    // 'react': 'React',
    // 'react-dom': 'ReactDOM'
  },
  optimization: {
    minimize: true,
  },
  devtool: 'source-map'
};
