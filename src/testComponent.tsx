import * as React from 'react';
import useAuth from './useAuth';

export default () => {
	const [authState] = useAuth();
	return (
		<div
			style={{
				position: 'absolute',
				right: 0,
				top: 0
}}>
			{authState.loggedIn ? 'logged in' : 'logged out'}
		</div>
	);
};
