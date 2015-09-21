

export const changedView = (state, action) => ({...state, view: action.view})

export const gotSerials = (state, action) => ({...state, serials: action.serials})

export const gotSerial = (state, action) => {
  const serial = action.serial;
  const season = action.serial.seasons[0];
  const episode = season.episodes[0];
  return { ...state, serial, season, episode };
}

export const seasonSelected = (state, action) => {
  const season = state.serial.seasons[action.index];
  return {...state, season};
}

export const episodeSelected = (state, action) => {
  const episode = state.season.episodes[action.index];
  return {...state, episode: {...episode, link: action.link}};
}


