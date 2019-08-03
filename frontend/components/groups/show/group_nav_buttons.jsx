import React from 'react'
import { addMemberToGroup, removeMemberFromGroup } from '../../../actions/join_group_actions';
import {withRouter, Link} from 'react-router-dom'

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
        const target = e.target
        target.disabled = true
        addMemberToGroup(this.props.group.id).then(res => {
            target.disabled = false
        })
    }

    leaveGroup (e) {
        e.preventDefault()
        if (!this.props.currentUserId) {
            return
        }
        const target = e.target
        target.disabled = true
        removeMemberFromGroup(this.props.group.id).then(res => {
            target.disabled = false
        })
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

        const navLinkLis = indexText.map((text, idx) => {
            return <li key={`show-nav-${idx}`} className={this.props.selectedIndex === idx ? "selected" : ""} onClick={this.props.setSelectedIndex(idx)}>{text}</li>
        })

        const joinLeaveBtn = this.props.group.memberIds.includes(this.props.currentUserId) ? (
                <button onClick={this.leaveGroup} className="leave-group-btn">Leave this group</button>
            ) : (
                <button onClick={this.joinGroup} className="join-group-btn">Join this group</button>
        )

        const extraDropdown = this.state.showExtraDropdown ? (
            < div className="extra-drowpdown-content" >
                <Link to={`/groups/${this.props.group.id}/edit`}>Edit Group</Link> 
                <a >Delete Group</a>
            </div >
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
                        <button ref={dropBtnRef => this.dropBtnRef = dropBtnRef} className="extra-btn">...</button>
                        {extraDropdown}
                    </div>
                </ul>
            </div>
            
        )
    }

} 

export default withRouter(GroupNavButtons)