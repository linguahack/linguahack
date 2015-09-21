
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as api from '../tools/api';


function selectSubtitles(number) {
  var trackLink = this.state.episode.opensubtitles[number].SubDownloadLink;

  return api.getSubs(trackLink)
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


export default class Player extends Component {

  componentDidMount() {
    this.videoElement = ReactDOM.findDOMNode(this.refs.videoElement);
  }

  componentDidUpdate() {
    if (this.props.state.episode.link) {
      this.playVideo();
    }
  }

  playVideo() {
    this.videoElement.src = this.props.state.episode.link;
    this.videoElement.setAttribute("controls", "controls")
    this.videoElement.load();
    this.videoElement.play();
  }

  async selectSubtitles(number) {
    const trackLink = this.props.state.episode.opensubtitles[number].SubDownloadLink;
    const cues = await api.getSubs(trackLink);

    if (this.textTrack) {
      this.textTrack.mode = "hidden";
    }

    this.textTrack = this.videoElement.addTextTrack("captions", "English", "en");
    this.textTrack.mode = "showing";
    for(var i = 0; i < cues.length; ++i) {
      this.textTrack.addCue(cues[i]);
    }
  }

  render() {
    const episode = this.props.state.episode;
    return <div>
      <div className="player-wrapper">
        <video controls="" name="media" style={{width: '100%'}} ref="videoElement"></video>
      </div>
      <div className="subtitles-list">
      {
        episode.opensubtitles.map((subs, index) => (
          <div key={index}>
            <a onClick={this.selectSubtitles.bind(this, index)}>{subs.SubFileName}</a>
          </div>
        ))
      }
      </div>
    </div>;
  }
}