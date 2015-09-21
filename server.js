
const fs = require('fs');
const path = require('path');
const express = require('express');

const webpack = require('webpack');

const isProduction = process.env.NODE_ENV == 'production';
const enviroment = process.env.NODE_ENV;

const compiler = webpack({
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
  output: {filename: 'bundle.js', path: isProduction ? '.' : '/'}
});

if (isProduction) {
  var app = express();
} else {
  const WebpackDevServer = require('webpack-dev-server');
  var app = new WebpackDevServer(compiler, {
    contentBase: '/public/',
    stats: {colors: true}
  });
}


app.use(express.static("."));

const html = `
  <head>
      <meta charset="UTF-8">
      <title>LinguaHack</title>
      <base href="/">
      <link rel="shortcut icon" href="/img/favicon.ico">

      <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="/css/style.css">
      <script src="/node_modules/jquery/dist/jquery.min.js"></script>
      <script src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>

  <!-- 
      <link href='http://fonts.googleapis.com/css?family=Amatic+SC:700' rel='stylesheet' type='text/css'>
      <link href='http://fonts.googleapis.com/css?family=Oswald:400,300' rel='stylesheet' type='text/css'> -->
  </head>
  <body>
      <div id="root"></div>
      ${!isProduction ? "<script src='/webpack-dev-server.js'></script>" : ""}
      <script>window.ENV = "${enviroment || ""}"</script>
      <script src="/bundle.js"></script>
  </body>
`

app.use((req, res) => res.send(html));

function run(app, port) {
  app.listen(process.env.PORT || port, function() {
    console.log('App is now running on http://localhost:' + (process.env.PORT || port));
  });
}

if (isProduction) {
  compiler.run(function(e, data){
    if(e) {
      return console.log(e);
    }
    run(app, 80);
  });
} else {
  run(app, 3000);
}
