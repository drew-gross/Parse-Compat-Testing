import React    from 'react';
import ReactDOM from 'react-dom';
import Parse    from 'parse';
import { List } from 'immutable';
import _        from 'lodash';
require('./style.scss');

class LoginButton extends React.Component {
	constructor() {
	 	super();
	 	this.state = {
	 		email: '',
	 		username: '',
	 		password: '',
	 	};
	}

	render() {
		return <div>
			Email: <input type='text' onChange={e => this.setState({email: e.nativeEvent.target.value})}/>
			Username: <input type='text' onChange={e => this.setState({username: e.nativeEvent.target.value})}/>
			Password: <input type='text' onChange={e => this.setState({password: e.nativeEvent.target.value})}/>
			<button
				onClick={() => {
					let user = new Parse.User();
					user.set('username', this.state.username);
					user.set('password', this.state.password);
					user.set('email', this.state.email);
					user.signUp()
				}}
			>
				Login!
			</button>
		</div>
	}
}

let LogoutButton = ({ onLogout }) => <button
	onClick={() => Parse.User.logOut().then(onLogout)}
>Log out</button>

class CompatApp extends React.Component {
	constructor() {
		super();
		this.state = {}
	}

	render() {
		if (Parse.User.current()) {
			return <LogoutButton onLogout={() => this.forceUpdate()}/>
		} else {
			return <LoginButton onLogin={() => this.forceUpdate()}/>
		}
	}
}

Parse.initialize("appId", "");
Parse.serverURL = 'http://localhost:5051/parse'
ReactDOM.render(
  <CompatApp />,
  document.getElementById('react')
);
