import React from 'react'

export const GroupScrollerItem = ({ group }) => {
    if (!group.memberIds) return null
    return (
        <li className="card-group">
            <ul className="card-content">
                <div className="card-photo">
                    <img src="https://picsum.photos/200/200" alt="group_photo"/>
                </div>
                <div className="card-text">
                    <div className="top-card">
                        <span className="name">{group.name}</span>
                        <div className="description-container">
                            <span className="description">{group.description}</span>
                        </div>
                        <span className="event-counts">{group.numberOfEvents} upcoming events</span>
                    </div>
                    <div className="bottom-card">
                        <span className="members">{group.memberIds.length} members</span>
                    </div>
                </div>
            </ul>
        </li>
    )
}