import React from "react";
import { connect } from 'react-redux';
import { createNewUser, removeErrors } from "../../actions/session_actions";
import { Link } from 'react-router-dom';
import { fetchLocations } from "../../actions/loaction_actions";

class TempSignUpComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: "", email: "", password: "", locationId: 1, selectingLocation: false, locationSearch: "" }
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSelectedLocation = this.handleSelectedLocation.bind(this)
        this.toggleSelectLocation = this.toggleSelectLocation.bind(this)
    }

    componentDidMount () {
        this.props.fetchLocations()
    }

    componentWillUnmount () {
        this.props.removeErrors()
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, email, password } = this.state;
        const location_id = this.state.locationId
        const { createNewUser } = this.props;

        createNewUser({
            username, email, password, location_id
        })
        // .then((res) => {
        //     this.setState({ username: "", email: "", password: "" });
        // })
    }

    handleSelectedLocation(locationId) {
        return e => {
            this.toggleSelectLocation()
            this.setState({locationId})
        }
    }

    handleTextChange(field) {
        return e => {
            this.setState({ [field]: e.target.value })
        }
    }

    toggleSelectLocation () {
        this.setState({selectingLocation: !this.state.selectingLocation})
    }

    render() {
        const errors = this.props.errors.map(err => {
            return <><li>{err}</li> <br /></>
        })

        const {locations} = this.props;
        const filteredLocations = Object.values(locations).filter(location => {
            if (location.name.toLowerCase().includes(this.state.locationSearch.toLowerCase()) || this.state.locationSearch.length === 0) {
                return location
            }
        })

        const locationLis = filteredLocations.map(location => {
            return <li onClick={this.handleSelectedLocation(location.id)} className="location-list-item" key={location.id}>{location.name}</li>
        })

        const userLocation = locations[this.state.locationId] ? locations[this.state.locationId].name : "New York, NY"

        const signInComp = this.state.selectingLocation ? (
            <div className="auth-comp">
                <div className="auth-form">
                    <div className="auth-container">
                        <label>Location
                            <input type="text" onChange={this.handleTextChange("locationSearch")} value={this.state.locationSearch}/>
                        </label>
                        <ul className="location-list">
                            {locationLis}
                        </ul>
                    </div>
                </div>
            </div>
        )
        :
        (
        <div className="auth-comp">
            <form className="auth-form" onSubmit={this.handleSubmit}>
                <div className="auth-container">
                    <h1 className="sign-up-header">Sign Up</h1>
                    <label htmlFor="username"> Username
                        <input onChange={this.handleTextChange("username")} type="text" value={this.state.username} />
                    </label>
                    <br />
                    <label htmlFor="email"> Email
                        <input onChange={this.handleTextChange("email")} type="text" value={this.state.email} />
                    </label>
                    <br />
                    <label htmlFor="password"> Password
                        <input onChange={this.handleTextChange("password")} type="password" value={this.state.password} />
                    </label>
                    <br />
                    <div className="location">
                                <i className="fas fa-map-marker-alt"> <span className="location-text"> {userLocation} <a onClick={this.toggleSelectLocation}>(change)</a></span> </i>                        
                    </div>
                    <br/>
                    <div className="disclaimer1">
                        <p>Your name is public. We'll use your email address to send you updates, and your location to find Squadups near you.</p>
                    </div>
                    <br/>
                    <ul>
                        {errors}
                    </ul>
                    <br />
                    <input className="sign-up-btn" type="submit" value="Continue" />
                    <br/>
                    <div className="disclaimer2">
                        <p>When you "Continue", you agree to Squadup's Terms of Service. We will manage information about you as described in our Privacy Policy, and Cookie Policy.</p>
                    </div>
                    <hr/>
                    <p className="already-member">Already a member? <Link to="/login">Log in</Link>.</p>
                </div>
            </form>
        </div>
        )
        return (
            signInComp
        )
    }

}

const mSP = state => {
    return {
        errors: state.errors.session,
        locations: state.entities.locations
    }
}

const mDP = dispatch => {
    return {
        createNewUser: user => dispatch(createNewUser(user)),
        logInUser: user => dispatch(logInUser(user)),
        removeErrors: () => dispatch(removeErrors()),
        fetchLocations: () => dispatch(fetchLocations()) 
    }
}

export default connect(mSP, mDP)(TempSignUpComponent)