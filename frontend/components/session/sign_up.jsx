import React from "react";
import { connect } from 'react-redux';
import { createNewUser, removeErrors } from "../../actions/session_actions";
import { Link } from 'react-router-dom';
import { fetchLocations } from "../../actions/loaction_actions";

class SignUpComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            username: "", 
            email: "", 
            password: "", 
            locationId: 1, 
            selectingLocation: false, 
            locationSearch: "", 
            usernameErrors: "", 
            emailErrors: "",
            passwordErrors: ""  
        }
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSelectedLocation = this.handleSelectedLocation.bind(this)
        this.toggleSelectLocation = this.toggleSelectLocation.bind(this)
        this.checkInput = this.checkInput.bind(this)
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

        if (this.validForm()) {
            createNewUser({
                username, email, password, location_id
            })
        } else {

        }
    }

    validForm() {
        // TRIPLE!
        let submitForm = true 

        if (!this.state.username.length) {
            submitForm = false
            this.setState({ usernameErrors: "Can't be empty" })
        }
        if (!this.state.email.length) {
            submitForm = false
            this.setState({ emailErrors: "Can't be empty" })
        } 
        if (!this.state.password.length)  {
            submitForm = false
            this.setState({ passwordErrors: "Can't be empty" })
        }
        return submitForm ? (
            /\S+@\S+\.\S+/.test(this.state.email) ? (
                this.state.password.length > 5 ? 
                (
                    true
                ) : false
            ) : (
                false
            )
        ) : (
            false
        )
    }

    checkInput (field) {
        return e => {
            const inputValue = e.target.value
            if (inputValue.length) {
                switch (field) {
                    case "usernameErrors":
                        this.setState({[field]: ""})
                        break;
                    case "emailErrors":
                        if (/\S+@\S+\.\S+/.test(inputValue)) {
                            this.setState({ [field]: "" })
                        } else {
                            this.setState({[field]: "Doesn't look like an email address"})
                        }
                        break;
                    case "passwordErrors":
                        if (inputValue.length > 5) {
                            this.setState({ [field]: "" })
                        } else {
                            this.setState({ [field]: "Should be at least 6 characters" })
                        }
                        break;
                    default:
                        return
                }
            } else {
                this.setState({[field]: "Can't be empty"})
            }
        }
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
        const emailAlreadyExist = this.props.errors.length ?  (
            <p className="signup-error-text">This email is already in use. Would you rather <Link to="/login">log in</Link>?</p>
        ) : null

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
                        <input 
                            onBlur={this.checkInput("usernameErrors")} 
                            onChange={this.handleTextChange("username")} 
                            type="text" 
                            value={this.state.username} 
                            className={ this.state.usernameErrors.length ? "yellow-border" : "" }
                        />
                        <p className="signup-error-text">{this.state.usernameErrors}</p>
                    </label>
                    <br />
                    <label htmlFor="email"> Email
                        <input 
                            onBlur={this.checkInput("emailErrors")} 
                            onChange={this.handleTextChange("email")} 
                            type="text" 
                            value={this.state.email} 
                            className={(this.state.emailErrors.length || emailAlreadyExist) ? "yellow-border" : ""}
                        />
                        <p className="signup-error-text">{this.state.emailErrors}</p>
                        {emailAlreadyExist}
                    </label>
                    <br />
                    <label htmlFor="password"> Password
                        <input 
                            onBlur={this.checkInput("passwordErrors")} 
                            onChange={this.handleTextChange("password")} 
                            type="password" 
                            value={this.state.password} 
                            className={this.state.passwordErrors.length ? "yellow-border" : ""}
                        />
                        <p className="signup-error-text">{this.state.passwordErrors}</p>
                    </label>
                    <br />
                    <div className="location">
                        <i className="fas fa-map-marker-alt"> <span className="location-text"> {userLocation} <a onClick={this.toggleSelectLocation}>(change)</a></span> </i>                        
                    </div>
                    <br/>
                    <div className="disclaimer1">
                        <p>Your name is public. We'll use your email address to send you updates, and your location to find Squadups near you.</p>
                    </div>
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

export default connect(mSP, mDP)(SignUpComponent)