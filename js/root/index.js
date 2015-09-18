

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Store from '../lib/store'
import * as actions from './actions';
import * as reducers from './reducers';
import App from './app';

import {saveState} from '../lib/browser';

class Root extends Component {
  constructor() {
    super();
    this.store = new Store({reducers, actions, initialState: localStorage.state ? JSON.parse(localStorage.state) : {view: 'index'}});

    this.store.subscribe(::this.forceUpdate);
  }


  render() {
    const state = this.store.state;
    localStorage.state = JSON.stringify(state); //development only
    return <App state={state} actions={this.store.actions}/>
  }

}


ReactDOM.render(<Root/>, document.getElementById('root'));
