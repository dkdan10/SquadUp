import React from "react";
import { connect } from 'react-redux';
import { createNewSession } from "../../actions/users_actions";
import { Link } from 'react-router-dom'


class TempSignInComponent extends React.Component {
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
        }).then(() => {
            this.setState({ email: "", password: "" });
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
                        <div className="login-header">
                            <h1>Log in</h1>
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
                        <input type="submit" value="Log in" />
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

export default connect(null, mDP)(TempSignInComponent)