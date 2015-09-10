
import * as api from '../tools/api'


export const goTo = async function(view, params) {
  switch (view) {
    case 'index':
      this.dispatch({view, type: 'changedView'});
      const serials = await api.serials();
      return this.dispatch({view, type: 'changedView', data: {serials}});
    case 'serial':
      this.dispatch({view, type: 'changedView', data: {serial: {url: params.url}}});
      const serial = await api.serial(params.url);
      return this.dispatch({view, type: 'changedView', data: {serial}});
    default:
      this.dispatch({view, type: 'changedView'});
  }
}

export const Link = function(view, params) {
  return (e) => {
    e.preventDefault();
    this.actions.goTo(view, params);
  }
}