
var fs = require('fs');
var path = require('path');
var express = require('express');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');


var compiler = webpack({
  entry: path.resolve(__dirname, 'js', 'index.js'),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {stage: 0},
        exclude: /node_modules/,
      },
      { test: /\.scss$/, loader: "style!css!sass" },
      { test: /\.html$/, loader: 'raw' }
    ]
  },
  output: {filename: 'bundle.js', path: '/'}
});

var app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  stats: {colors: true}
});

app.use(express.static("."));

var html = fs.readFileSync('index.html', 'utf8');
app.use((req, res) => res.send(html));

var PORT = 3000;
app.listen(PORT, function() {
  console.log('App is now running on http://localhost:' + PORT);
});