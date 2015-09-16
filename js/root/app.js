
import React from 'react';

import Home from '../components/home';
import About from '../components/about';
import Serial from '../components/serial';
import Header from '../components/header';
import Footer from '../components/footer';

const wrap = (Handler, props) => (
  <div>
    <Header {...props}/>
    <Handler {...props}/>
    <Footer {...props}/>
  </div>
)

const App = (props) => {
  switch(props.state.view) {
    case 'index':
      return wrap(Home, props)
    case 'about':
      return wrap(About, props);
    case 'serial':
      return wrap(Serial, props);
  }
  return <div>404</div>
}

export default App;