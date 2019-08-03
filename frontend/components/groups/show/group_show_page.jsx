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
        return (
            <div className="group-show-container">
                <GroupHeader location={this.props.location} group={this.props.group} />
                <GroupNavButtons group={this.props.group} currentUserId={this.props.currentUserId} setSelectedIndex={this.setSelectedIndex} selectedIndex={this.state.selectedIndex} />

                <div className="content-container">
                    <AboutGroup events={this.props.events} group={this.props.group} />
                </div>
            </div>
            )
    }

}

const msp = (state, ownProps) => {
    const groupId = ownProps.match.params.groupId
    const group = state.entities.groups[groupId] || {
        id: null,
        name: "",
        description: "",
        locationId: 1,
        private: false,
        memberIds: []
    }
    return {
        group: group,
        currentUserId: state.session.currentUserId,
        events: Object.values(state.entities.events),
        location: state.entities.locations[group.locationId] || {name: ""}
    }
}

const mdp = (dispatch) => {
    return {
        fetchGroup: (groupId) => dispatch(fetchGroup(groupId)),
    }
}

export default connect(msp, mdp)(GroupShowPage)