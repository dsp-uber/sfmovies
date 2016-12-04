import React, { Component } from 'react';
import { Link } from 'react-router';

export default class MovieMap extends Component {
	render() {
		return (
			<div>
				movie map
				<Link to="/">list</Link>
			</div>
		);
	}
}
