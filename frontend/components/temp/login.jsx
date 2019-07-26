import React from "react";
import { connect } from 'react-redux';
import { createNewSession } from "../../actions/session_actions";
import { Link } from 'react-router-dom'


class TempLogInComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: "", email: "", password: "" }
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        const { createNewSession } = this.props;

        createNewSession({
            email, password
        })
        // .then(() => {
        //     this.setState({ email: "", password: "" });
        // })
    }

    handleTextChange(field) {
        return e => {
            this.setState({ [field]: e.target.value })
        }
    }

    render() {
        return (
            <div className="auth-comp">
                <form className="auth-form" onSubmit={this.handleSubmit}>
                    <div className="auth-container">
                        <div className="login-header">
                            <h1>Log in</h1>
                            <img src="https://secure.meetupstatic.com/s/img/09300654065624139187/icon/icon_padlock.gif" alt="login lock"/>
                            <p>Not registered with us yet? <Link to="/signUp">Sign up</Link></p>
                        </div>
                        <label htmlFor="email"> Email:
                            <input onChange={this.handleTextChange("email")} type="text" value={this.state.email} />
                        </label>
                        <br />
                        <label htmlFor="password"> Password:
                            <input onChange={this.handleTextChange("password")} type="text" value={this.state.password} />
                        </label>
                        <br />
                        <input className="login-btn" type="submit" value="Log in" />
                    </div>
                </form>
            </div>
        )
    }

}

const mDP = dispatch => {
    return {
        createNewSession: credentials => dispatch(createNewSession(credentials))
    }
}

export default connect(null, mDP)(TempLogInComponent)