import React from 'react'

export const GroupHeader = (props) => {
    const group = props.group
    return (
        <div className="group-show-header">
            <img className="header-image" src="https://picsum.photos/800/300" alt="group-header-photo"></img>
            <div className="header-group-info">
                <h1>{group.name}</h1>
                <div className="header-details">
                    <h2>{props.location.name}</h2>
                    <h2>{group.memberIds.length} members * {group.private ? "Private Group" : "Public Group"}</h2>
                    <h2>Organized by {group.owner}</h2>
                </div>
            </div>
        </div>
    )
}