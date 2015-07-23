
import React from 'react';

import aboutTemplate from '../../views/about.html';

export default class About extends React.Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: aboutTemplate}}/>
    );
  }
}