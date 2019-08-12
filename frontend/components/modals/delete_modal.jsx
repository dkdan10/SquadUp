import React from 'react'
import { connect } from 'react-redux'
import { deleteGroup } from '../../actions/group_actions';
import {withRouter} from 'react-router-dom'
import { closeModal } from '../../actions/modal_actions';
import { deleteEvent } from '../../actions/event_actions';


class DeleteModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {confirmText: ""}
        this.updateText = this.updateText.bind(this)
        this.delete = this.delete.bind(this)
    }

    updateText (e) {
        this.setState({confirmText: e.target.value})
    }

    delete(e) {
        this.props.delete(this.props.idToDelete).then(() => {
            this.props.closeModal();
            this.props.history.push("/");
        })
    }

    render () {
        const {deleteType} = this.props
        const deleteBtn = (this.state.confirmText === `Delete ${deleteType}`) ? (
            <button onClick={this.delete} >Delete {deleteType}</button>
        ) : (
            <button disabled >Delete {deleteType}</button>
        )

        return (
        <div className="delete-group-modal">
            <h1>Are you sure? Type "Delete {deleteType}" to confirm.</h1>
            <div className="delete-fields">
                <input type="text" onChange={this.updateText} value={this.state.confirmText}/>
                {deleteBtn}
            </div>
        </div>
        )
    }

}


const mdp = (dispatch, ownProps) => {
    let deleteMethod = null
    let idToDelete = null
    let deleteType = ""
    if (ownProps.eventId) {
        deleteMethod = (id) => dispatch(deleteEvent(id))
        idToDelete = ownProps.eventId
        deleteType = "Event"
    } else {
        deleteMethod = (id) => dispatch(deleteGroup(id))
        idToDelete = ownProps.groupId
        deleteType = "Group"
    }
    return {
        delete: deleteMethod,
        idToDelete,
        deleteType,
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(null, mdp)(withRouter(DeleteModal))