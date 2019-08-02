import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { destroySession } from '../../actions/session_actions';

class Footer extends React.Component {
    
    goTo (url) {
        return e => {
            this.props.history.push(url)
        }
    }

    render () {
        const login_logout = this.props.currentUser ? (
            <>
            <span onClick={() => this.props.logout()}>Log out</span>
            <span>Profile</span>
            <span onClick={this.goTo("/groups/new")}>Create a Group</span>
            </>
        ) : (
            <span onClick={this.goTo("/login")}>Log in</span >
        )

        return (
            <div className="footer-container">
                <div className="left-side">
                    <div className="logo">SquadUp</div>
                    <div className="links-info">    
                        <span className="stay-connected">STAY CONNECTED</span>
                        <div className="the-links">
                            <a href="https://www.linkedin.com/in/daniel-keinan-ab9a5a148/"><i className="fab fa-linkedin-in"></i></a>
                            <a href="https://github.com/dkdan10/SquadUp"><i className="fab fa-github"></i></a>
                        </div>
                        <div className="email">danielkeinan@icloud.com</div>
                    </div>
                </div>

                <div className="right-side">
                    <div className="explore">Explore</div>
                    <div className="explore-links">
                        {login_logout}
                    </div>

                </div>
                
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

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(destroySession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Footer))