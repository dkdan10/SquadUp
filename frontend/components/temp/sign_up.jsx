import React from "react";
import { connect } from 'react-redux';
import { createNewUser, logInUser } from "../../actions/users_actions";
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
                        <input className="sign-up-btn" type="submit" value="Continue" />
                        <hr/>
                        <p className="already-member">Already a member? <Link to="/signIn">Log in</Link>.</p>
                    </div>
                </form>
            </div>
        )
    }

}


const mDP = dispatch => {
    return {
        createNewUser: user => dispatch(createNewUser(user)),
        logInUser: user => dispatch(logInUser(user))
    }
}

export default connect(null, mDP)(TempSignUpComponent)