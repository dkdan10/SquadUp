import React from "react";
import { connect } from 'react-redux';
import { createNewSession, removeErrors } from "../../actions/session_actions";
import { Link } from 'react-router-dom'


class LogInComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: "", email: "", password: ""}
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.loginDemoUser = this.loginDemoUser.bind(this)
    }

    componentWillUnmount() {
        this.props.removeErrors()
    }

    loginDemoUser (e) {
        e.preventDefault()
        const { createNewSession } = this.props;
        createNewSession({
            email: "demo@user.com",
            password: "password"
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        const { createNewSession } = this.props;
        let errors = {password: false, email: false}
        if (!email.length) {
            this.setState({
                emailErrors: "Please enter your email address."
            })
            errors.email = true
        }

        if (!password.length) {
            this.setState({
                passwordErrors: "Please enter your password."
            })
            errors.password = true
        }

        if (!errors.password && !errors.email) {
            this.setState({ passwordErrors: "", emailErrors: ""})
            createNewSession({
                email, password
            })
        } else {
            this.setState({password: ""})
            if (!errors.password) {
                this.setState({ passwordErrors: ""})
            }
            if (!errors.email) {
                this.setState({ emailErrors: "" })
            }
        }

    }

    handleTextChange(field) {
        return e => {
            this.setState({ [field]: e.target.value })
        }
    }

    render() {
        let errorsBox = null;
        if (this.state.emailErrors || this.state.passwordErrors) {
            errorsBox = (
                <div className="errors-box">
                    <h1 className="errors-header">Sorry, there was a problem.</h1>
                    <p>You'll find more details highlighted below.</p>
                </div>
            )
        } else if (this.props.errors.length) {
            errorsBox = (
                <div className="errors-box">
                    <h1 className="errors-header">Your email or password was entered incorrectly.</h1>
                </div>
            )
        }

        return (
            <div className="auth-comp">
                {errorsBox}
                <form className="auth-form" onSubmit={this.handleSubmit}>
                    <div className="auth-container">
                        <div className="login-header">
                            <h1>Log in</h1>
                            <img src="https://secure.meetupstatic.com/s/img/09300654065624139187/icon/icon_padlock.gif" alt="login lock"/>
                            <p>Not registered with us yet? <Link to="/signUp">Sign up</Link></p>
                        </div>
                        <label htmlFor="email"> Email:
                            <input onChange={this.handleTextChange("email")} type="text" value={this.state.email} />
                            <p className="login-error-text">{this.state.emailErrors}</p>
                        </label>
                        <br />
                        <label htmlFor="password"> Password:
                            <input onChange={this.handleTextChange("password")} type="password" value={this.state.password} />
                            <p className="login-error-text">{this.state.passwordErrors}</p>
                        </label>
                        <br />
                        <input className="login-btn" type="submit" value="Log in" />

                        <div className="background">
                            <hr className="or-hr" />
                            <span className="or-span">OR</span>
                            <button onClick={this.loginDemoUser} className="demo-login-btn">Demo Login</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}


const mSP = state => {
    return {
        errors: state.errors.session
    }
}

const mDP = dispatch => {
    return {
        createNewSession: credentials => dispatch(createNewSession(credentials)),
        removeErrors: () => dispatch(removeErrors())
    }
}

export default connect(mSP, mDP)(LogInComponent)