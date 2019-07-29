import React from 'react';
import {Link} from 'react-router-dom'
import { destroySession } from '../../actions/session_actions';
import { connect } from 'react-redux';

class NavBar extends React.Component {
    constructor (props) {
        super(props)
        this.state = {showDrop: false}
        this.toggleDropdown = this.toggleDropdown.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    toggleDropdown () {
        this.setState({showDrop: !this.state.showDrop})
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false)
    }

    componentWillUnmount () {
        document.removeEventListener('mousedown', this.handleClick, false)
    }

    handleClick (e) {
        if (this.dropdownRef && this.dropdownRef.contains(e.target)) {
            return
        }

        this.setState({ showDrop: false })
    }

    componentDidUpdate () {
        if (this.props.currentUser == null && this.state.showDrop === true) {
            this.setState({ showDrop: false })
        }
    }

    render( ) {
        const { currentUser, logout } = this.props
        const dropDown =  this.state.showDrop ?  ( 
            < div className = "nav-profile-dropdown-content" >
            <a className="logout-btn" href="#" onClick={logout}>Log out</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
        </div >
        ) : null
        const navHeaderEl = currentUser ? (
            <header className="nav-bar">
                <h1>Squad Up</h1>
                <div>
                    <Link to="/explore" className="nav-link">Expolore</Link>
                    <Link to="/messages" className="nav-link">Messages</Link>

                    <div ref={dropdownRef => this.dropdownRef = dropdownRef} className="nav-dropdown">
                        <a className="nav-profile-drop dropbtn" onClick={this.toggleDropdown}>
                            <i className="far fa-user-circle"></i>
                            <i className="fa fa-caret-down"></i>
                        </a>
                        {dropDown}
                    </div>
                </div>
            </header >
        )
            :
            (
                <header className="nav-bar">
                    <h1>Squad Up</h1>
                    <div>
                        <Link className="nav-link" to="login">Log in</Link>
                        <Link className="nav-link" to="signup">Sign up</Link>
                    </div>
                </header >
            )
        return (
            navHeaderEl
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)