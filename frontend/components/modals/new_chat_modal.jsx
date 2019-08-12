import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../actions/modal_actions';
import {fetchUsers} from '../../actions/session_actions';
import {createChannel} from '../../actions/messaging_actions';


class NewChatModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = { userSearch: "" }
        this.updateText = this.updateText.bind(this)
    }

    componentDidMount () {
        this.props.fetchUsers()
    }

    updateText(e) {
        this.setState({ userSearch: e.target.value })
    }

    handleSelecetedUser(user) {
        return (e) => {
            this.props.createChannel(user.id)
                .then((res) => {
                    this.props.closeModal();
                    this.props.history.push({
                        pathname: `/messages/${res.channelData.channel.id}`,
                        newChannel: "newChannel",
                        modalCreated: "modalCreated"
                    });
                })
        }
    }

    render() {
        let compToShow
        const filteredLocations = Object.values(this.props.users).filter(user => {
            if (user.username.toLowerCase().includes(this.state.userSearch.toLowerCase()) || this.state.userSearch.length === 0) {
                return user
            }
        })

        const filteredLis = filteredLocations.map(user => {
            if (user.id === this.props.currendUserId ) return
            return (
                <li onClick={this.handleSelecetedUser(user)} className="user-list-item" key={user.id}><span>{user.username}</span></li>
            )
        })

        compToShow = (
            <div className="user-picker">
                <input placeholder="Search for a user" className="user-search" type="text" onChange={this.updateText} value={this.state.userSearch} />
                <ul className="users-list">
                    {filteredLis}
                </ul>
            </div>
        )

        return (
            <div className="choose-user-container">
                <h1>Search for a User</h1>
                {compToShow}
            </div>
        )
    }

}

const msp = (state) => {
    return {
        users: state.entities.users,
        currendUserId: state.session.currentUserId
    }
}

const mdp = (dispatch) => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        closeModal: () => dispatch(closeModal()),
        createChannel: (userId) => dispatch(createChannel(userId))
    }
}

export default connect(msp, mdp)(withRouter(NewChatModal))