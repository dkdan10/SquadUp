import React from 'react'

export default class Groups extends React.Component {

    componentWillMount() {
        this.props.fetchGroups();
    }

    render() {

        const groupsLis = this.props.groups.map(group => {
            return (
            <li key={group.id}>
                <div className="li-content">
                    <span className="name">{group.name}</span>
                    <span className="members">{group.members} Members</span>
                </div>
            </li>
            )
        })

        return (
            <div className="splash-group-container">
                <h1>YOUR GROUPS</h1>
                <ul className="group-ul">
                    {groupsLis}
                </ul>
            </div>
        )
    }
}