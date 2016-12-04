import React, { Component } from 'react';

import AppBar from './AppBar';

export default class App extends Component {
	render() {
		return (
			<div>
				<AppBar />
				{this.props.children}
			</div>
		);
	}
}
