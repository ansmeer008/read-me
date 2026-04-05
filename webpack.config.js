const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development', // 개발 모드
    entry: './src/index.tsx', // 진입점
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true, // 빌드 시 이전 파일 삭제
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'], // 확장자 생략 가능하게 설정
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            'style-loader', 
            'css-loader', 
            'postcss-loader'
          ],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader', // TS/TSX 파일을 바벨로 처리
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        template: './public/index.html', // 템플릿 파일 연결
      }),
    ],
    devServer: {
      port: 3000,
      hot: true, // 수정 시 자동 새로고침
      open: true, // 실행 시 브라우저 열기
    },
  };