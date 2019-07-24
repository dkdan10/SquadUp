import { createNewUser, fetchUsers } from "../../actions/users_actions";
import { connect } from 'react-redux';
import React from "react";


class TempUserComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: "", email: "", password: ""}
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        const {username, email, password} = this.state;
        const { createNewUser } = this.props;

        createNewUser({
            username, email, password
        }).then(() => {
            this.setState({ username: "", email: "", password: "" });
        })
    }

    componentDidMount() {
        this.props.fetchUsers()
    }

    handleTextChange(field) {
        return e => {
            this.setState({[field]: e.target.value })
        }
    }

    render() {
        const userLis = this.props.users.map(user => <li key={user.id}><p>Username: {user.username}</p><p>Email: {user.email}</p></li>)
        return (
            <>
                <h1>Temp User Index and Sign Up</h1>
                <ul>
                    {userLis}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username"> Username:
                        <input onChange={this.handleTextChange("username")} type="text" value={this.state.username}/>
                    </label> 
                    <br/>
                    <label htmlFor="email"> Email: 
                        <input onChange={this.handleTextChange("email")} type="text" value={this.state.email} />
                    </label>
                    <br/>
                    <label htmlFor="password"> Password:
                        <input onChange={this.handleTextChange("password")} type="text" value={this.state.password} />
                    </label>
                    <br/>
                    <input type="submit" value="Create New User"/>
                </form>
            </>
        )
    }

}

const mSP = state => {
    return {
        users: Object.values(state.users)
    }
}


const mDP = dispatch => {
    return {
        createNewUser: user => dispatch(createNewUser(user)),
        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mSP, mDP)(TempUserComponent)