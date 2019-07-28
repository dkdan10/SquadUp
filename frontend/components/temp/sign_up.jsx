import React from "react";
import { connect } from 'react-redux';
import { createNewUser } from "../../actions/session_actions";
import { Link } from 'react-router-dom';

class TempSignUpComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: "", email: "", password: "" }
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, email, password } = this.state;
        const { createNewUser } = this.props;

        createNewUser({
            username, email, password
        }).then((res) => {
            this.props.logInUser(res.user.id)
            this.setState({ username: "", email: "", password: "" });
        })
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
                        <h1 className="sign-up-header">Sign Up</h1>
                        <label htmlFor="username"> Username
                            <input onChange={this.handleTextChange("username")} type="text" value={this.state.username} />
                        </label>
                        <br />
                        <label htmlFor="email"> Email
                            <input onChange={this.handleTextChange("email")} type="text" value={this.state.email} />
                        </label>
                        <br />
                        <label htmlFor="password"> Password
                            <input onChange={this.handleTextChange("password")} type="text" value={this.state.password} />
                        </label>
                        <br />
                        <div className="location">
                            <i className="fas fa-map-marker-alt"> <span className="location-text">New York, NY <Link to="/signup">(change)</Link></span> </i>                        
                        </div>
                        <br/>
                        <div className="disclaimer1">
                            <p>Your name is public. We'll use your email address to send you updates, and your location to find Squadups near you.</p>
                        </div>
                        <br/>
                        <p>{this.props.errors}</p>
                        <br />
                        <input className="sign-up-btn" type="submit" value="Continue" />
                        <br/>
                        <div className="disclaimer2">
                            <p>When you "Continue", you agree to Squadup's Terms of Service. We will manage information about you as described in our Privacy Policy, and Cookie Policy.</p>
                        </div>
                        <hr/>
                        <p className="already-member">Already a member? <Link to="/login">Log in</Link>.</p>
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
        createNewUser: user => dispatch(createNewUser(user)),
        logInUser: user => dispatch(logInUser(user))
    }
}

export default connect(mSP, mDP)(TempSignUpComponent)