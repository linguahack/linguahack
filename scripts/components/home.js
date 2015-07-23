
import React from 'react';
import {Link} from 'react-router';
import api from '../tools/api';

import subHeaderTemplate from '../../views/homeSubheader.html';

class SubHeader extends React.Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: subHeaderTemplate}}/>
    );
  }
}

class Serial extends React.Component {
  render() {
    return (
      <div className="show col-md-3">
        <Link to="serial" params={{url: this.props.data.url}}>
          <img src={"http://image.tmdb.org/t/p/w342/" + this.props.data.tmdb.poster_path}/>
        </Link>
        <Link to="serial" params={{url: this.props.data.url}}>
          {this.props.data.name}
        </Link>
      </div>
    );
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {serials: []};
  }

  componentDidMount() {
    api.serials()
    .then((result) => {
      this.setState({serials: result});
    })
  }

  render() {
    return (
      <div>
        <SubHeader/>
        <div>
          <div className="row container show-list">
            { this.state.serials.map((serial) => <Serial data={serial} key={serial.url}/>)}
          </div>
        </div>
      </div>
    );
  }
}
