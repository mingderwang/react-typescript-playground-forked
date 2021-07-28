import * as React from 'react';
import { render } from 'react-dom';

import TestComponent from './testComponent';

import useAuth from './useAuth';

const App = () => {
	// can directly use 'setState' or optionally use actions if defined
	const [state, setState, actions] = useAuth();

	async function login() {
		await actions.login({
			username: 'jdough',
			firstName: 'John Dough',
			token: '12312312'
		});
	}

	function logout() {
		setState({
			loggedIn: false,
			user: undefined
		});
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100vw',
				height: '100vh'
}}>
			<TestComponent />
			<p>
				{state.loggedIn ? (
					<button onClick={logout}>logout</button>
				) : (
					<button onClick={login}>login</button>
				)}
			</p>
			{state.loggedIn ? <p>hello {state.user !== undefined ? state.user.firstName : null}</p> : null}
		</div>
	);
};

render(<App />, document.getElementById('root'));
