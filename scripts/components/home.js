
import React from 'react';

import subHeaderTemplate from '../../views/homeSubheader.html';

export var SubHeader = React.createClass({
  render: function () {
    return (
			<div dangerouslySetInnerHTML={{__html: subHeaderTemplate}}/>
    );
  }
});

export var Home = React.createClass({
  render: function () {
    return (
				<div>
					<SubHeader/>
					<div>
						<div className="row container show-list">
					        <div className="show col-md-3" ng-repeat="serial in serials">
					        	<a ui-sref="serial({url: serial.url})"><img ng-src="{{serial.poster}}"/></a>
					            <a ui-sref="serial({url: serial.url})" ng-bind="serial.name"></a>
					        </div>
					    </div>
					</div>
				</div>
    );
  }
});

export default Home;