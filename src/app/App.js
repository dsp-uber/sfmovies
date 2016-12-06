import React, {Component} from 'react';

export default class App extends Component {
	render() {
		return (
			<div className="mdl-layout mdl-js-layout">
				{this.props.children}
			</div>
		);
	}
}
