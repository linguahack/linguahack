

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as browser from '../lib/browser';
import Store from '../lib/store'
import Router from './router';
import * as actions from './actions';
import * as reducers from './reducers';
import App from './app';


import * as api from '../tools/api'

const views = [
  {
    name: 'index',
    pathname: '/',
    goTo: async function(dispatch) {
      dispatch({view: this.name, pathname: this.pathname});
      const serials = await api.serials();
      return dispatch({serials});
    } 
  },
  {
    name: 'about',
    pathname: '/about'
  },
  {
    name: 'serial',
    pathname: ({id}) => `/serial/${id}`,
    regex: /^\/serial\/(.*)/,
    params: (match) => {return {id: match[1]}},
    goTo: async function(dispatch, params) {
      const serial = await api.serial(params.id);
      return dispatch({serial, view: this.name, pathname: this.pathname(params)});
    }
  }
]

class Root extends Component {
  constructor() {
    super();
    this.store = new Store({reducers, actions})
    this.router = new Router(views);

    this.router.store.subscribe(() => {
      console.log(this.router.store.state);
      this.store.dispatch({type: 'changedView', state: this.router.store.state})
    });

    browser.history.listen((location) => {
      if (location.action != "PUSH") {
        this.fromBrowserData(browser.getData());
      }
    })

    this.store.subscribe(::this.forceUpdate);
  }

  render() {
    const state = this.store.state;
    browser.setData(this.toBrowserData(state));
    return <App state={state} Link={this.router.Link} actions={this.store.actions}/>
  }

  fromBrowserData({token, pathname}) {
    this.router.fromPathname(pathname);
  }

  toBrowserData() {
    const state = this.store.state;
    return {token: state.token, pathname: state.pathname};
  }
}


ReactDOM.render(<Root/>, document.getElementById('root'));
