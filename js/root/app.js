
import React from 'react';

import Home from '../components/home';
import About from '../components/about';
import Serial from '../components/serial';
import Header from '../components/header';
import Footer from '../components/footer';

function Handler(state, actions) {
  switch(state.view) {
    case 'index':
      return Home(state, actions);
    case 'about':
      return About(state, actions);
    case 'serial':
      return Serial(state, actions);
  }
}

export default function App(state, actions) {
  console.log(`state: `, state)
  const handler = Handler(state, actions);
  if (handler) {
    return <div>
      { Header(state, actions) }
      { Handler(state, actions) }
      { Footer(state, actions) }
    </div>
  } else {
    return <div>404</div>
  }
}