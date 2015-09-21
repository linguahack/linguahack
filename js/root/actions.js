
import * as api from '../tools/api'
import fsParse from '../tools/fsParse';

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

export const selectEpisode = async function(index, state) {
  const episode = state.season.episodes[index];
  const fsto = await fsParse(state.serial.fsto.id, episode.fsto.files[0].file_id, episode.number);
  const link = `http://fs.to${fsto.link}`;
  this.dispatch({type: 'episodeSelected', index, link});
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