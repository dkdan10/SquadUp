import React from 'react'
import { connect } from 'react-redux'
import { deleteGroup } from '../../actions/group_actions';
import {withRouter} from 'react-router-dom'
import { closeModal } from '../../actions/modal_actions';


class DeleteGroupModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {confirmText: ""}
        this.updateText = this.updateText.bind(this)
        this.deleteGroup = this.deleteGroup.bind(this)
    }

    updateText (e) {
        this.setState({confirmText: e.target.value})
    }

    deleteGroup(e) {
        this.props.deleteGroup(this.props.groupId).then(() => {
            this.props.closeModal();
            this.props.history.push("/");
        })
    }

    render () {

        const deleteGroupBtn = (this.state.confirmText === "Delete Group") ? (
            <button onClick={this.deleteGroup} >Delete Group</button>
        ) : (
            <button disabled >Delete Group</button>
        )

        return (
        <div className="delete-group-modal">
            <h1>Are you sure? Type "Delete Group" to confirm.</h1>
            <div className="delete-fields">
                <input type="text" onChange={this.updateText} value={this.state.confirmText}/>
                {deleteGroupBtn}
            </div>
        </div>
        )
    }

}


const mdp = (dispatch) => {
    return {
        deleteGroup: (id) => dispatch(deleteGroup(id)),
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(null, mdp)(withRouter(DeleteGroupModal))