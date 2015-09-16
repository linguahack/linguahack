

var fs = require('fs');
var path = require('path');
var express = require('express');


var webpack = require('webpack');
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
  output: {filename: 'bundle.js', path: '.'}
});

var app = express();

app.use(express.static("."));

var html = fs.readFileSync('index.html', 'utf8');
app.use((req, res) => res.send(html));


var PORT = 80;

compiler.run(function(e, data){
  if(e) {
    return console.log(e);
  }
  app.listen(PORT, function() {
    console.log('App is now running on http://localhost:' + PORT);
  });
});