

export const selectSeason = (state, index) => {
  const season = state.serial.seasons[index];
  console.log(this);
  this.dispatch({type: 'seasonSelected', season});
}