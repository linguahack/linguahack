

export const changedView = (state, action) => ({...state, view: action.view})

export const gotSerials = (state, action) => ({...state, serials: action.serials})

export const gotSerial = (state, action) => ({...state, serial: action.serial, season: action.serial.seasons[0]})

export const seasonSelected = (state, action) => {
  const season = state.serial.seasons[action.index];
  return {...state, season};
}


