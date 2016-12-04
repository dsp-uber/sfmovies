import React, { Component } from 'react';

export default class Header extends Component {
	render() {
		return (
			<header className="mdl-layout__header">
				<div className="mdl-layout__header-row">
					<span className="mdl-layout-title">SF Movies</span>

					<div className="mdl-layout-spacer"></div>
				</div>
			</header>
		);
	}
}
