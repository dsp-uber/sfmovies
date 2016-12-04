import React, { Component } from 'react';

export default class Drawer extends Component {
	render() {
		return (
			<div className="mdl-layout__drawer">
				<span className="mdl-layout-title">SF Movies</span>
				<nav className="mdl-navigation mdl-layout--large-screen-only">
					<a className="mdl-navigation__link" href="">Link</a>
					<a className="mdl-navigation__link" href="">Link</a>
					<a className="mdl-navigation__link" href="">Link</a>
					<a className="mdl-navigation__link" href="">Link</a>
				</nav>
			</div>
		);
	}
}
