
import React from 'react';
import Player from './player';

const episodeClick = ({index, actions, state}) => {
  actions.selectEpisode(index, state);
}

const seasonClick = ({index, actions}, e) => {
  e.preventDefault();
  actions.selectSeason(index)
}

export default function Serial(props) {
  const {state, actions} = props;
  const serial = state.serial;
  const season = state.season;
  const episode = state.episode || season.episodes[0];
  return (
    <div>
      <div className="screen" style={{backgroundImage: 'url(' + "http://image.tmdb.org/t/p/original" + serial.tmdb.backdrop_path + ')'}}>
        <div className="serial_description">
          <div className="clearfix">
            <h4>{serial.name}</h4>
            <a href={serial.imdb.full_url}><h4>{serial.imdb.rating}</h4></a>
          </div>
          <p>{serial.imdb.description}</p>
        </div>
      </div>
      <div className="serial_title">
        <h2 className="serial-name">{serial.name}</h2>
          <div className="dropdown choose_season">
                <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
                  Season <span>{season.number}</span>
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                {
                  serial.seasons.map((season, index) => (
                    <li role="presentation" key={season.number}>
                      <a role="menuitem" tabIndex="-1" onClick={seasonClick.bind(null, {index, actions})}>Season {season.number}</a>
                    </li>
                  )) 
                }
                </ul>
          </div>
      </div>
      <section className="playerSection">
          <div className="main-wrapper clearfix">
              <div className="episodes">
              {
                season.episodes.map((episode, index) => (
                  <div key={index} onClick={episodeClick.bind(null, {index, actions, state})}>{episode.name}</div>
                ))
              }
              </div>
              <Player {...props}/>
          </div>
      </section>
    </div>
  );
}
