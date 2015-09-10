
import React, {Component} from 'react';
import * as api from '../tools/api'


export default class Router {
  constructor(store) {
    this.store = store;
  }

  getPathname(view, params) {
    switch(view) {
      case 'index': return '/';
      case 'about': return '/about';
      case 'serial': return `/serial/${params.url}`;
      default: return "";
    }
  }

  fromPathname(pathname) {
    const view = {
      '/': () => this.goTo('index'),
      '/about': () => this.goTo('about')
    }
    if (view[pathname] && view[pathname]()) return;

    switch (true) {
      case /^\/serial\/(.*)/.test(pathname):
        return this.goTo('serial', {url: pathname.match(/^\/serial\/(.*)/)[1]});
    }
  }

  async goTo(view, params) {
    switch (view) {
      case 'index':
        this.dispatch({view, pathname: this.getPathname(view, params)});
        const serials = await api.serials();
        return this.dispatch({serials});
      case 'serial':
        const serial = await api.serial(params.url);
        return this.dispatch({serial, view, pathname: this.getPathname(view, params)});
      default:
        this.dispatch({view, pathname: this.getPathname(view, params)});
    }
  }

  dispatch(state) {
    this.store.dispatch({type: 'changedView', state});
  }

  getLink() {
    const router = this;
    class Link extends Component {
      render() {
        return React.createElement('a', this.getProps(), this.props.children);
      }

      onClick(e) {
        e.preventDefault();
        router.goTo(this.props.view, this.props.params);
      }

      getProps() {
        return {...this.props, children: null, onClick: ::this.onClick, href: router.getPathname(this.props.view, this.props.params)}
      }
    }
    return Link;
  }
}