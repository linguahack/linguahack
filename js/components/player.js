
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import getSubs from '../tools/getSubs';


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


export default class Player extends Component {

  playVideo() {
    var videoElement = ReactDOM.findDOMNode(this.refs.videoElement);
    videoElement.src = this.props.state.episode.link;
    videoElement.setAttribute("controls", "controls")
    videoElement.load();
    videoElement.play();
  }

  componentDidUpdate() {
    if (this.props.state.episode.link) {
      this.playVideo();
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
            <a>{subs.SubFileName}</a>
          </div>
        ))
      }
      </div>
    </div>;
  }
}