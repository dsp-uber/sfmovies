import React from 'react';
import classNames from 'classnames';

import './loading.css';

const Loading = ({show}) => (
	<div
		className={classNames('loading-overlay',
			show ? 'loading-overlay--show' : null
		)}
	>
		<div
			className="loading-overlay__spinner mdl-spinner mdl-js-spinner is-active"
		></div>
	</div>
);

export default Loading;
