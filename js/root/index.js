

import React, { Component } from 'react';
import * as browser from '../lib/browser';
import Store from '../lib/store'
import * as actions from './actions';
import * as reducers from './reducers';
import App from './app';

const fromBrowserData = function({token, pathname}) {
  const actions = this.actions;
  const view = {
    '/': () => actions.goTo('index'),
    '/about': () => actions.goTo('about')
  }
  view[pathname] && view[pathname]();
}

const browserData = function(state) {
  return {token: state.token, pathname: null};
}

class Root extends Component {
  constructor() {
    super();
    this.store = new Store({reducers, actions})

    browser.history.listen((location) => {
      if (location.action != "PUSH") {
        this.store::fromBrowserData(browser.getData());
      }
    })

    this.store.subscribe(::this.forceUpdate);
  }

  render() {
    const state = this.store.state;
    browser.setData(browserData(state));
    return App(state, this.store.actions);
  }
}


React.render(<Root/>, document.getElementById('root'));
