import React from 'react'
import { EventScrollerItem } from './event_scroller_item';
import { GroupScrollerItem } from './group_scroller_item';

export default class ContentScroller extends React.Component {

    componentWillMount () {
        if (this.props.contentType !== "events") {
            this.props.fetchGroups()
        }
    }

    render() {
        const contentLis = this.props.contentType === "events" ? (
            this.props.events.map(event => (
                <EventScrollerItem key={event.id} event={event}/>
            ))
        )
        :
        (
            this.props.groups.map(group => (
                <GroupScrollerItem key={group.id} group={group} />
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