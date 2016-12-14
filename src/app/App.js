import React, { Component } from 'react';
import Loading from './Loading';

class App extends Component {
	componentDidMount() {
		this.props.onLoad();
	}
	render = () => (
		<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
			{this.props.children}
			<Loading show={this.props.isLoading} />
		</div>
	)
}

export default App;
