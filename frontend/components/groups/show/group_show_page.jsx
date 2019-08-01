import React from 'react'
import { fetchGroup } from '../../../actions/group_actions';
import {connect} from 'react-redux'

import {GroupHeader} from './header_show'

class GroupShowPage extends React.Component {

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

    render() {
        return (
            <div className="group-show-container">
                <GroupHeader group={this.props.group} />
            </div>
            )
    }

}

const msp = (state, ownProps) => {
    const groupId = ownProps.match.params.groupId
    const defaultGroup = {
        id: null,
        name: "",
        description: "",
        locationId: 1,
        private: false
    }
    return {
        group: state.entities.groups[groupId] || (defaultGroup)
    }
}

const mdp = (dispatch) => {
    return {
        fetchGroup: (groupId) => dispatch(fetchGroup(groupId))
    }
}

export default connect(msp, mdp)(GroupShowPage)