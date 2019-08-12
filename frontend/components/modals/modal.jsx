import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import DeleteModal from './delete_modal';
import NewChatModal from './new_chat_modal'

const Modal = ({modal, closeModal}) => {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal.type) {
    case 'delete-group':
      component = <DeleteModal groupId={modal.groupId}/>;
      break;
    case 'delete-event':
      component = <DeleteModal eventId={modal.eventId} />;
      break;
    case 'new-chat':
      component = <NewChatModal />
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
