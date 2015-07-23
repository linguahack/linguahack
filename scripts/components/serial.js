
import React from 'react';
import api from '../tools/api';
import fsParse from '../tools/fsParse';
import getSubs from '../tools/getSubs';

export default class Serial extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      serial: {
        imdb: {},
        tmdb: {},
        seasons: []
      },
      season: {
        episodes: []
      },
      episode: {
        opensubtitles: []
      }
    };
  }

  componentDidMount() {
    api.serial(this.props.params.url)
    .then((result) => {
      this.state.serial = result;
      this.selectSeason(0);
      this.setState(this.state);
    })
  }

  selectSeason(number) {
    this.state.serial.seasons[number].episodes.sort(function(first, second) {
      return first.number - second.number;
    });
    this.state.season = this.state.serial.seasons[number];
    this.setState(this.state);
    this.selectEpisode(0);
  }

  selectEpisode(number) {
    this.state.episode = this.state.season.episodes[number];
    return fsParse(this.state.serial.fsto.id, this.state.episode.fsto.files[0].file_id, this.state.episode.number)
    .then((result) => {
      this.state.episode.link = 'http://fs.to' + result.link;
      console.log(result.link);
      this.setState(this.state);
    });
  }

  selectSubtitles(number) {
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

  playVideo() {
    var videoElement = React.findDOMNode(this.refs.videoElement);
    videoElement.src = this.state.episode.link;
    videoElement.setAttribute("controls", "controls")
    videoElement.load();
    videoElement.play();
  }

  handleEpisodeClick(number) {
    this.selectEpisode(number)
    .then(() => this.playVideo());
  }

  render() {
    var {serial, season, episode} = this.state;
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
                      <li role="presentation">
                        <a role="menuitem" tabIndex="-1" onClick={this.selectSeason.bind(this, index)}>Season {season.number}</a>
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
                    <div onClick={this.handleEpisodeClick.bind(this, index)}>{episode.name}</div>
                  ))
                }
                </div>
                <div className="player-wrapper">
                  <video ref="videoElement" controls="" name="media" style={{width: '100%'}}></video>
                </div>
                <div className="subtitles-list">
                {
                  episode.opensubtitles.map((subs, index) => (
                    <div>
                      <a onClick={this.selectSubtitles.bind(this, index)}>{subs.SubFileName}</a>
                    </div>
                  ))
                }
                </div>
            </div>
        </section>
      </div>
    );
  }
}