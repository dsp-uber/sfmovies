import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moviesActions from '../ducks/movies';

class App extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(moviesActions.fetchGenres());
		dispatch(moviesActions.fetchAllMovies());
	}
	render() {
		return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
				{this.props.children}
			</div>
		);
	}
}

export default connect()(App);
