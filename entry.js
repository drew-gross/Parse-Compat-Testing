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
				Login
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
		this.state = {

		}
	}

	render() {
		if (Parse.User.current()) {
			return <LogoutButton onLogout={() => this.forceUpdate()}/>
		} else {
			return <LoginButton onLogin={() => this.forceUpdate()}/>
		}
	}
}

var hitParseCom = true;
Parse.initialize("dThScpTAst1imdlIFtdAb0CzCUVFfN5QjYMmRz4L", "cT4yojEkhdBBJCBF4LUhxSrtMLDFsNkzuAAxUoxv");
Parse.serverURL = 'http://localhost:3000/1'
Parse.serverURL = 'http://localhost:1337/parse'
if (hitParseCom) {
	Parse.initialize('X0XkawM50PCgT89l1zvTcPtbzx0UDGvHmMQB8XZ2', 'OTultb2CmAnC62twLa475BALg523FEIYos3nJvfY');
	Parse.serverURL = 'https://api.parse.com/1';
}
ReactDOM.render(
  <CompatApp />,
  document.getElementById('react')
);
