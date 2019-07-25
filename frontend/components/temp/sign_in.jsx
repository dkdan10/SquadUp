import React from "react";
import { connect } from 'react-redux';
import { createNewSession } from "../../actions/users_actions";

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
            <>
                <h1>Sign In</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email"> Email:
                        <input onChange={this.handleTextChange("email")} type="text" value={this.state.email} />
                    </label>
                    <br />
                    <label htmlFor="password"> Password:
                        <input onChange={this.handleTextChange("password")} type="text" value={this.state.password} />
                    </label>
                    <br />
                    <input type="submit" value="Sign In" />
                </form>
            </>
        )
    }

}

const mDP = dispatch => {
    return {
        createNewSession: credentials => dispatch(createNewSession(credentials))
    }
}

export default connect(null, mDP)(TempSignInComponent)