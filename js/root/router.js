
import React, {Component} from 'react';
import Store from '../lib/store'

function getLink(router) {
  class Link extends Component {
    render() {
      return React.createElement('a', this.getProps(), this.props.children);
    }

    onClick(e) {
      e.preventDefault();
      router.goTo(this.props.view, this.props);
    }

    getProps() {
      return {...this.props, children: null, onClick: ::this.onClick, href: router.getPathname(this.props.view, this.props)}
    }
  }
  return Link;
}

export default class Router {
  constructor(views) {
    const changedView = (state, action) => ({...state, ...action.state});
    this.store = new Store({reducers: {changedView}, actions: {}});

    this._viewsByName = {};
    views.forEach((view) => {this._viewsByName[view.name] = view})

    this._viewsByPath = {};
    this._viewsRegex = [];
    views.forEach((view) => {
      if ((typeof view.pathname) == 'string') {
        this._viewsByPath[view.pathname] = view;
      } else {
        this._viewsRegex.push(view);
      }
    })

    this.Link = getLink(this);
  }

  getPathname(viewName, params) {
    const view = this._viewsByName[viewName];
    if (view) {
      if ((typeof view.pathname) == 'string') {
        return view.pathname;
      } else {
        return view.pathname(params);
      }
    }
    return '';
  }

  fromPathname(pathname) {
    if (this._viewsByPath[pathname]) return this.goTo(this._viewsByPath[pathname].name);

    const view = this._viewsRegex.filter((view) => view.regex.test(pathname))[0];
    return this.goTo(view.name, view.params(pathname.match(view.regex)));
  }

  async goTo(viewName, params) {
    const view = this._viewsByName[viewName];
    if (view && view.goTo) {
      view.goTo(::this.dispatch, params);
    } else {
      this.dispatch({view: viewName, pathname: this.getPathname(viewName, params)});
    }
  }

  dispatch(state) {
    this.store.dispatch({type: 'changedView', state});
  }
}