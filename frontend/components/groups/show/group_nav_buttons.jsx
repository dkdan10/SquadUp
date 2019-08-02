import React from 'react'
import { addMemberToGroup, removeMemberFromGroup } from '../../../actions/join_group_actions';


export default class GroupNavButtons extends React.Component {
    constructor (props) {
        super(props)
        this.joinGroup = this.joinGroup.bind(this)
        this.leaveGroup = this.leaveGroup.bind(this)
    }

    joinGroup (e) {
        e.preventDefault()
        if (!this.props.currentUserId) {
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

        return (
            <div className="group-nav-bar">
                <ul className="nav-links">
                    {navLinkLis}
                </ul>
                <ul className="nav-buttons">
                    {joinLeaveBtn}
                    <button className="extra-btn">...</button>
                </ul>
            </div>
            
        )
    }

} 