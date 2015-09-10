
import React from 'react';

import Home from '../components/home';
import About from '../components/about';
import Serial from '../components/serial';
import Header from '../components/header';
import Footer from '../components/footer';

function Handler(props) {
  switch(props.state.view) {
    case 'index':
      return Home(props);
    case 'about':
      return About(props);
    case 'serial':
      return Serial(props);
  }
}

export default function App(props) {
  console.log(`state: `, props.state)
  const handler = Handler(props);
  if (handler) {
    return <div>
      { Header(props) }
      { Handler(props) }
      { Footer(props) }
    </div>
  } else {
    return <div>404</div>
  }
}