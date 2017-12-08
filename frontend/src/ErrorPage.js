import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ErrorPage extends Component {

	render() {

		return <div className="error-message">{this.props.error} Click <Link to="/">here</Link> to return to Home page</div>
	}
}

export default ErrorPage;