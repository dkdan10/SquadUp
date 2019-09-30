import React from 'react'
import { addMemberToGroup, removeMemberFromGroup } from '../../../actions/join_group_actions';
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { openModal } from '../../../actions/modal_actions';

class GroupNavButtons extends React.Component {
    constructor (props) {
        super(props)
        this.joinGroup = this.joinGroup.bind(this)
        this.leaveGroup = this.leaveGroup.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.state = {showExtraDropdown: false}
    }

    joinGroup (e) {
        e.preventDefault()
        if (!this.props.currentUserId) {
            this.props.history.push('/login')
            return
        }
        // const target = e.target
        // target.disabled = true
        this.props.addMemberToGroup(this.props.group.id)
        // .then(res => {
        //     target.disabled = false
        // })
    }

    leaveGroup (e) {
        e.preventDefault()
        if (!this.props.currentUserId) {
            return
        }
        // const target = e.target
        // target.disabled = true
        this.props.removeMemberFromGroup(this.props.group.id)
        // .then(res => {
        //     target.disabled = false
        // })
    }

    componentDidUpdate (prevProps) {
        if (prevProps.match.params.groupId !== this.props.match.params.groupId) {
            this.setState({showExtraDropdown: false})
        }
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false)
    }

    handleClick(e) {
        if ((this.dropdownRef && this.dropBtnRef) && this.dropdownRef.contains(e.target)) {
            if (this.dropBtnRef.contains(e.target)) {
                this.setState({ showExtraDropdown: !this.state.showExtraDropdown })
            }
            return
        }
        this.setState({ showExtraDropdown: false })
    }



    render () {
        const indexText = ["About", "Events", "Members", "Photos", "Discussion", "More"]

        const isOwner = this.props.group.ownerId === this.props.currentUserId

        const navLinkLis = indexText.map((text, idx) => {
            return <li key={`show-nav-${idx}`} className={this.props.selectedIndex === idx ? "selected" : ""} onClick={this.props.setSelectedIndex(idx)}>{text}</li>
        })

        const joinLeaveBtn = this.props.group.memberIds.includes(this.props.currentUserId) ? (
                <button onClick={this.leaveGroup} className="leave-group-btn">Leave this group</button>
            ) : (
                <button onClick={this.joinGroup} className="join-group-btn">Join this group</button>
        )


        // TRRIIIIIPLLLLLE TUUUUUUURNary
        const extraDropdown = this.state.showExtraDropdown ? (
            (isOwner) ? (
                < div className="multiple extra-drowpdown-content" >
                    <Link to={`/groups/${this.props.group.id}/new/event`}>Create Event</Link> 
                    <Link to={`/groups/${this.props.group.id}/edit`}>Edit Group</Link> 
                    <a onClick={() => {this.setState({ showExtraDropdown: false }); this.props.openModal({type: 'delete-group', groupId: this.props.group.id});}}>Delete Group</a>
                </div >
            ) : (
                < div className="single extra-drowpdown-content" >
                    <a>Report Group</a>
                </div >
            )
        ) : (
            null
        )

        return (
            <div className="group-nav-bar">
                <ul className="nav-links">
                    {navLinkLis}
                </ul>
                <ul className="nav-buttons">
                    {joinLeaveBtn}
                    <div ref={dropdownRef => this.dropdownRef = dropdownRef} className="extra-dropdown-container">
                        <button ref={dropBtnRef => this.dropBtnRef = dropBtnRef} className={isOwner ? "manage-btn" : "extra-btn"}>{isOwner ? "Manage" : "..."}</button>
                        {extraDropdown}
                    </div>
                </ul>
            </div>
            
        )
    }

} 

const mdp = dispatch => {
    return {
        openModal: (modalAction) => dispatch(openModal(modalAction)),
        addMemberToGroup: (groupId) => dispatch(addMemberToGroup(groupId)),
        removeMemberFromGroup: (groupId) => dispatch(removeMemberFromGroup(groupId))
    }
}

export default connect(null, mdp)(withRouter(GroupNavButtons))