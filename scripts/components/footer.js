
import React from 'react';

import footerTemplate from '../../views/footer.html';

export default class Footer extends React.Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: footerTemplate}}/>
    );
  }
}