import { fileURLToPath } from 'url';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { getMfeBaseUrl } from './scripts/utils/getMfeBaseUrl.js';
import { createPromiseRemote } from './scripts/utils/createPromiseRemote.js';
import 'dotenv/config';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_ENV = process.env.NODE_ENV ?? 'local';

console.log('APP_ENV:', APP_ENV);

const isDev = APP_ENV === 'development';

export default {
  entry: './src/index.tsx',
  mode: APP_ENV === 'production' ? 'production' : 'development',
  devtool: isDev ? 'eval-source-map' : 'source-map',
  performance: {
    hints: false,
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
    hot: true,
    open: true,
    client: {
      overlay: false,
    },
    headers: {
      'Cache-Control': 'no-store',
    },
  },
  output: {
    publicPath: '/',
    filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
    chunkFilename: isDev
      ? '[name].chunk.js'
      : '[name].[contenthash:8].chunk.js',
    clean: true,
  },
  cache: {
    type: 'filesystem',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@mui/material': path.resolve(__dirname, 'node_modules/@mui/material'),
      '@mui/system': path.resolve(__dirname, 'node_modules/@mui/system'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false, targets: 'defaults' }],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [isDev && 'react-refresh/babel'].filter(Boolean),
          },
        },
      },
    ],
  },
  optimization: {
    minimize: !isDev,
    usedExports: true,
    sideEffects: true,
    concatenateModules: true,
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters: {
        API_URL: process.env.API_URL,
      },
    }),
    isDev && new ReactRefreshWebpackPlugin(),
    new webpack.container.ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        enterprise_auth: createPromiseRemote(
          'enterprise_auth',
          getMfeBaseUrl('enterprise-scalable-practice-auth-mfe'),
        ),
        enterprise_ui: createPromiseRemote(
          'enterprise_ui',
          getMfeBaseUrl('enterprise-scalable-practice-design-mfe'),
        ),
        enterprise_data: createPromiseRemote(
          'enterprise_data',
          getMfeBaseUrl('enterprise-scalable-practice-data-mfe'),
        ),
        enterprise_dashboard: createPromiseRemote(
          'enterprise_dashboard',
          getMfeBaseUrl('enterprise-scalable-practice-dashboard-mfe'),
        ),
      },
      exposes: {},
      shared: {
        react: {
          singleton: true,
          strictVersion: true,
          requiredVersion: '19.2.x',
        },
        'react-dom': {
          singleton: true,
          strictVersion: true,
          requiredVersion: '19.2.x',
        },
        'react-router-dom': { singleton: true, requiredVersion: '7.x.x' },
        'react-redux': { singleton: true, requiredVersion: '9.x.x' },
        '@reduxjs/toolkit': { singleton: true, requiredVersion: '2.x.x' },
        '@mui/material': { singleton: true, requiredVersion: '7.x.x' },
        '@mui/system': { singleton: true, requiredVersion: '7.x.x' },
        '@emotion/react': { singleton: true, requiredVersion: '11.x.x' },
        '@emotion/styled': { singleton: true, requiredVersion: '11.x.x' },
        rxjs: { singleton: true, requiredVersion: '7.x.x' },
      },
    }),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL),
      'process.env.ENTERPRISE_ASSET_URL': JSON.stringify(
        process.env.ENTERPRISE_ASSET_URL ?? '',
      ),
    }),
  ].filter(Boolean),
};
