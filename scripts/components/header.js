
import React from 'react';

import headerTemplate from '../../views/header.html';

export default class Header extends React.Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: headerTemplate}}/>
    );
  }
}