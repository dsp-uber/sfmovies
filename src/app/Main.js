import React, { Component } from 'react';

export default class Main extends Component {
	render() {
		return (
			<main className="mdl-layout__content">
				<div className="page-content">
					{this.props.children}
				</div>
			</main>
		);
	}
}
