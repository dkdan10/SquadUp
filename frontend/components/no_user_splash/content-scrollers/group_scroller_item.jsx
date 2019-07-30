import React from 'react'

export const GroupScrollerItem = ({ group }) => {
    return (
        <li className="card-group">
            <ul className="card-content">
                <div className="card-photo">
                    <img src="https://picsum.photos/200/200" alt="group_photo"/>
                </div>
                <div className="card-text">
                    <div className="top-card">
                        <span className="name">{group.name}</span>
                        <span className="description">{group.description}</span>
                        <span className="event-counts">{group.numberOfEvents} upcoming events</span>
                    </div>
                    <div className="bottom-card">
                        <span className="members">{group.members} members</span>
                    </div>
                </div>
            </ul>
        </li>
    )
}