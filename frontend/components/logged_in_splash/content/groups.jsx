import React from 'react'
import {Link} from 'react-router-dom'

export default class Groups extends React.Component {

    render() {

        const myGroups = this.props.myGroups.map(group => {
            return (
                <Link key={group.id} to={`/groups/${group.id}`}>
                    <li >
                        <div className="li-content">
                            <span className="name">{group.name}</span>
                            <span className="members">{group.memberIds.length} Members</span>
                        </div>
                    </li>
                </Link>
            )
        })
        const otherGroups= this.props.otherGroups.map(group => {
            return (
                <Link key={group.id} to={`/groups/${group.id}`}>
                    <li >
                        <div className="li-content">
                            <span className="name">{group.name}</span>
                            <span className="members">{group.memberIds.length} Members</span>
                        </div>
                    </li>
                </Link>
            )
        })

        return (
            <div className="splash-group-container">
                <h1>YOUR GROUPS</h1>
                <ul className="group-ul">
                    {myGroups}
                </ul>
                <h1>ALL GROUPS</h1>
                <ul className="group-ul">
                    {otherGroups}
                </ul>
            </div>
        )
    }
}