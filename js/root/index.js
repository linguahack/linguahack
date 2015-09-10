

import React, { Component } from 'react';
import * as browser from '../lib/browser';
import Store from '../lib/store'
import Router from './router';
import * as actions from './actions';
import * as reducers from './reducers';
import App from './app';



class Root extends Component {
  constructor() {
    super();
    this.store = new Store({reducers, actions})
    this.router = new Router(this.store);

    browser.history.listen((location) => {
      if (location.action != "PUSH") {
        this.fromBrowserData(browser.getData());
      }
    })

    this.store.subscribe(::this.forceUpdate);
    this.Link = this.router.getLink();
  }

  render() {
    const state = this.store.state;
    browser.setData(this.toBrowserData(state));
    return App({state, actions: this.store.actions, Link: this.Link});
  }

  fromBrowserData({token, pathname}) {
    this.router.fromPathname(pathname);
  }

  toBrowserData() {
    const state = this.store.state;
    return {token: state.token, pathname: state.pathname};
  }
}


React.render(<Root/>, document.getElementById('root'));
