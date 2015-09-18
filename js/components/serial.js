
import React, {Component} from 'react';
import api from '../tools/api';
import fsParse from '../tools/fsParse';
import getSubs from '../tools/getSubs';


function selectEpisode(number) {
  this.state.episode = this.state.season.episodes[number];
  return fsParse(this.state.serial.fsto.id, this.state.episode.fsto.files[0].file_id, this.state.episode.number)
  .then((result) => {
    this.state.episode.link = 'http://fs.to' + result.link;
    console.log(result.link);
    this.setState(this.state);
  });
}

function selectSubtitles(number) {
  var trackLink = this.state.episode.opensubtitles[number].SubDownloadLink;

  return getSubs(trackLink, api.getHost())
  .then((cues) => {

    if (this.state.textTrack) {
      this.state.textTrack.mode = "hidden";
    }

    this.state.textTrack = React.findDOMNode(this.refs.videoElement).addTextTrack("captions", "English", "en");
    this.state.textTrack.mode = "showing";
    for(var i = 0; i < cues.length; ++i) {
      this.state.textTrack.addCue(cues[i]);
    }

  })
}

function playVideo() {
  var videoElement = React.findDOMNode(this.refs.videoElement);
  videoElement.src = this.state.episode.link;
  videoElement.setAttribute("controls", "controls")
  videoElement.load();
  videoElement.play();
}


class Video extends Component {
  render() {
    return <video controls="" name="media" style={{width: '100%'}}></video>;
  }
}

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
              <div className="player-wrapper">
                <Video {...props}/>
              </div>
              <div className="subtitles-list">
              {
                episode.opensubtitles.map((subs, index) => (
                  <div key={index}>
                    <a>{subs.SubFileName}</a>
                  </div>
                ))
              }
              </div>
          </div>
      </section>
    </div>
  );
}
