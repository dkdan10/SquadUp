import React from 'react';
import { connect } from 'react-redux';

class Footer extends React.Component {
    
    render () {
        return (
            <div className="footer-container">

            </div>
        )
    }
}

const mapStateToProps = state => {
    const currentUser = state.session.currentUserId ? state.entities.users[state.session.currentUserId] : null;
    return {
        currentUser
    }
};

export default connect(mapStateToProps)(Footer)