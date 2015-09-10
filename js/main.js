
import React from 'react';
import Router from 'react-router';
var {Route, RouteHandler} = Router;

import Home from './components/home';
import About from './components/about';
import Serial from './components/serial';
import Header from './components/header';
import Footer from './components/footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <RouteHandler/>
        <Footer/>
      </div>
    );
  }
}

var routes = (
  <Route handler={App}>
    <Route name="home" path="/" handler={Home}/>
    <Route name="about" handler={About}/>
    <Route name="serial" path="serial/:url" handler={Serial}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
})