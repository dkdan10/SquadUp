import React from 'react'
import { fetchGroup } from '../../../actions/group_actions';
import {connect} from 'react-redux'

import {GroupHeader} from './header_show'
import GroupNavButtons from './group_nav_buttons'
import AboutGroup from './content/about_content'
import EventGroup from './content/event_content'
import { createChannel } from '../../../actions/messaging_actions';

class GroupShowPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {selectedIndex: 0}
        this.setSelectedIndex = this.setSelectedIndex.bind(this)
    }

    componentDidMount () {
        const groupId = this.props.match.params.groupId
        this.props.fetchGroup(groupId)
        window.scrollTo(0, 0)
    }

    componentDidUpdate (prevProps) {
        if (prevProps.match.params.groupId !== this.props.match.params.groupId) {
            const groupId = this.props.match.params.groupId
            this.props.fetchGroup(groupId)
        }
    }

    setSelectedIndex (idx) {
        return (e) => {
            this.setState({selectedIndex: idx})
        }
    }

    render() {
        if (!this.props.group || !this.props.location || !this.props.owner) return null

        let contentToShow = null
        
        switch (this.state.selectedIndex) {
            case 0:
                contentToShow = <AboutGroup createChannel={this.props.createChannel} groupMembers={this.props.groupMembers} owner={this.props.owner} events={this.props.events} group={this.props.group} currentUserId={this.props.currentUserId} />
                break;
            case 1:
                contentToShow = <EventGroup group={this.props.group} events={this.props.events} owner={this.props.owner} currentUserId={this.props.currentUserId} />
                break;
            default:
                contentToShow = null
        }

        return (
            <div className="group-show-container">
                <GroupHeader owner={this.props.owner} location={this.props.location} group={this.props.group} />
                <GroupNavButtons group={this.props.group} currentUserId={this.props.currentUserId} setSelectedIndex={this.setSelectedIndex} selectedIndex={this.state.selectedIndex} />

                <div className="content-container">
                    {contentToShow}
                </div>
            </div>
            )
    }

}

const msp = (state, ownProps) => {
    const groupId = ownProps.match.params.groupId
    const group = state.entities.groups[groupId]
    if (!group) return {}
    const groupMembers = [];
    group.memberIds.forEach(memberId => {
        const userToAdd = state.entities.users[memberId]
        if (userToAdd) groupMembers.push(userToAdd)
    })
    const events = [];
    group.event_ids.forEach(eventId => {
        const eventToAdd = state.entities.events[eventId]
        if (eventToAdd) events.push(eventToAdd)
    })

    const comparator = (a, b) => {
        const dateA = new Date(`${a.start_day} ${a.start_time}`)
        const dateB = new Date(`${b.start_day} ${b.start_time}`)
        return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
    }

    return {
        group: group,
        currentUserId: state.session.currentUserId,
        events: events.sort((a,b) => comparator(a,b)),
        location: state.entities.locations[group.locationId],
        owner: state.entities.users[group.ownerId],
        groupMembers
    }
}

const mdp = (dispatch) => {
    return {
        fetchGroup: (groupId) => dispatch(fetchGroup(groupId)),
        createChannel: (otherUserId) => dispatch(createChannel(otherUserId))
    }
}

export default connect(msp, mdp)(GroupShowPage)