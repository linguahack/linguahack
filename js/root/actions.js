
import * as api from '../tools/api'

export const goToHome = async function() {
  this.dispatch({view: 'index', type: 'changedView'});
  const serials = await api.serials();
  return this.dispatch({serials, type: 'gotSerials'});
}

export const goToAbout = function() {
  this.dispatch({view: 'about', type: 'changedView'});
}

export const goToSerial = async function(url) {
  const serial = await api.serial(url);
  this.dispatch({serial, type: 'gotSerial'});
  this.dispatch({view: 'serial', type: 'changedView'});
}

export const selectSeason = function(index) {
  this.dispatch({type: 'seasonSelected', index});
}

export const selectEpisode = function(index, state) {
  
}


export const linkClick = function(view) {
  return (e) => {
    e.preventDefault();
    switch (view.view) {
      case 'index':
        return this.actions.goToHome();
      case 'serial':
        return this.actions.goToSerial(view.url);
      case 'about':
        return this.actions.goToAbout();
    }
  }
}