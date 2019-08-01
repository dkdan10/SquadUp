import React from 'react'
import { Link } from 'react-router-dom'

export const GroupHeader = (props) => {
    const group = props.group
    return (
        <div className="group-show-header">
            <img className="header-image" src="https://picsum.photos/800/300" alt="group-header-photo"></img>
            <div className="header-group-info">
                <h1>{group.name}</h1>
                <div className="header-details">
                    <h2>{group.location}</h2>
                    <h2>{group.members} members * {group.private ? "Private Group" : "Public Group"}</h2>
                    <h2>Organized by {group.owner}</h2>
                </div>
            </div>
        </div>
    )
}