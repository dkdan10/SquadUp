import { updateGroup, fetchGroup } from "../../../actions/group_actions";
import { connect } from 'react-redux'
import React from 'react'
import GroupForm from './group_form'
import {withRouter} from 'react-router-dom'


const msp = (state, ownProps) => {
    const groupId = ownProps.match.params.groupId
    return {
        group: state.entities.groups[groupId],
        currentUserId: state.session.currentUserId,
        editForm: true
    }
}

const mdp = (dispatch) => {
    return {
        action: (group) => dispatch(updateGroup(group)),
        fetchGroup: (id) => dispatch(fetchGroup(id)),
    }
}

class EditGroupForm extends React.Component {
    
    componentDidMount () {
        const currentUserId = this.props.currentUserId
        this.props.fetchGroup(this.props.match.params.groupId)
            .then((res) => {
                if (res.groupData.group.ownerId !== currentUserId) {
                    this.props.history.push(`/groups/${res.groupData.group.id}`)
                }
            })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.groupId !== this.props.match.params.groupId) {
            const groupId = this.props.match.params.groupId
            this.props.fetchGroup(groupId).then((res) => {
                if (res.groupData.group.ownerId !== currentUserId) {
                    this.props.history.push(`/groups/${res.groupData.group.id}`)
                }
            })
        }
    }

    render () {
        if (!this.props.group) return null
        return (
            <GroupForm editForm={this.props.editForm} action={this.props.action} group={this.props.group} />
        )
    }
}

export default connect(msp, mdp)(withRouter(EditGroupForm))