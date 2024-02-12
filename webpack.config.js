/* eslint-disable @typescript-eslint/no-var-requires */

// const path = require('path');
// const __dirname = path.dirname('');

module.exports = {
  mode: 'development',

  entry: './server.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    // alias: {
    //   '@controllers': path.resolve(__dirname, './controllers/'),
    //   '@routes': path.resolve(__dirname, './routes/'),
    //   '@customTypes': path.resolve(__dirname, './types/'),
    //   '@utils': path.resolve(__dirname, './utils/'),
    // },
  },
};
