import { fetchUsers, destroySession } from "../../actions/session_actions";
import { connect } from 'react-redux';
import React from "react";


class TempUserIndex extends React.Component {

    constructor (props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount () {
        this.props.fetchUsers();
    }

    handleLogout (e) {
        e.preventDefault();
        this.props.destroySession();
    }

    render() {
        const userLis = this.props.users.map(user => <li key={user.id}><p>Username: {user.username}</p><p>Email: {user.email}</p></li>)
        let currentUser 
        let logout = ""
        if (this.props.currentUser) {
            currentUser = this.props.currentUser.username
            logout = <button onClick={this.handleLogout}>Logout</button>
        } else {
            currentUser = "No Current User"
        }
        return (
            <>
                <h1>Current User: {currentUser}</h1>
                {logout}
                <h3>User Index</h3>
                <ul>
                    {userLis}
                </ul>
            </>
        )
    }

}

const mSP = state => {
    return {
        currentUser: state.entities.users[state.session.currentUserId],
        users: Object.values(state.entities.users)
    }
}

const mDP = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        destroySession: () => dispatch(destroySession())
    }
}

export default connect(mSP, mDP)(TempUserIndex)