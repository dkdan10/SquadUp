import React from 'react'
import { fetchGroup } from '../../../actions/group_actions';
import {connect} from 'react-redux'

import {GroupHeader} from './header_show'
import GroupNavButtons from './group_nav_buttons'
import AboutGroup from './content/about_content'

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
        return (
            <div className="group-show-container">
                <GroupHeader owner={this.props.owner} location={this.props.location} group={this.props.group} />
                <GroupNavButtons group={this.props.group} currentUserId={this.props.currentUserId} setSelectedIndex={this.setSelectedIndex} selectedIndex={this.state.selectedIndex} />

                <div className="content-container">
                    <AboutGroup groupMembers={this.props.groupMembers} owner={this.props.owner} events={this.props.events} group={this.props.group} />
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

    return {
        group: group,
        currentUserId: state.session.currentUserId,
        events,
        location: state.entities.locations[group.locationId],
        owner: state.entities.users[group.ownerId],
        groupMembers
    }
}

const mdp = (dispatch) => {
    return {
        fetchGroup: (groupId) => dispatch(fetchGroup(groupId)),
    }
}

export default connect(msp, mdp)(GroupShowPage)