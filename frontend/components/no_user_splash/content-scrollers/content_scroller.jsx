import React from 'react'
import { EventScrollerItem } from './event_scroller_item';
import { GroupScrollerItem } from './group_scroller_item';

import {Link} from 'react-router-dom'

export default class ContentScroller extends React.Component {

    componentWillMount () {
        if (this.props.contentType !== "events") {
            this.props.fetchGroups()
        } else {
            this.props.fetchAllEvents()
        }
    }

    render() {
        const contentLis = this.props.contentType === "events" ? (
            this.props.events.map(event => (
                <Link to={`/events/${event.id}`} key={`event-scroller-${event.id}`}>
                    <EventScrollerItem event={event}/>
                </Link>
            ))
        )
        :
        (
            this.props.groups.map(group => (
                <Link to={`/groups/${group.id}`} key={`group-scroller-${group.id}`}>
                    <GroupScrollerItem group={group} />
                </Link>
            ))
        )

        const title = this.props.contentType === "events" ? "Events near you" : "Groups near you"
        const description = this.props.contentType === "events" ? "See what's happening soon in your area" : "Find groups that get together to do the things they love."

        return (
            <div className="splash-content-scroller" >
                <h1 className="splash-content-header">{title}</h1>
                <h2 className="splash-content-description">{description}</h2>
                <ul className="scrolling-wrapper">
                    {contentLis}
                </ul>
            </div>
        )
    }

}