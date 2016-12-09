import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moviesActions from '../ducks/movies';

class App extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(moviesActions.loadGenres());
		dispatch(moviesActions.loadMovies());
	}
	render() {
		return (
			<div className="mdl-layout mdl-js-layout">
				{this.props.children}
			</div>
		);
	}
}

export default connect()(App);
