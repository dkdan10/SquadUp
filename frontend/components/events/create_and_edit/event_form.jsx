import React from 'react'
import { createEvent } from '../../../actions/event_actions';
import {connect} from 'react-redux'

class EventForm extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            name: "",
            start_day: "",
            start_time: "",
            // end_time: "",
            group_id: this.props.match.params.groupId,
            address: "",
            lat: "",
            lng: "",
            description: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.setNewLocation = this.setNewLocation.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state)

        this.props.createEvent(this.state)
    }

    handleInputChange(field) {
        return e => {
            this.setState({ [field]: e.target.value })
        }
    }

    componentDidMount () {
        this.locationFinder = new google.maps.places.Autocomplete(this.locationFinderNode);
        this.locationFinder.addListener('place_changed', this.setNewLocation)
    }
    componentWillUnmount () {
        this.locationFinder.removeListener('place_changed', this.setNewLocation)
    }

    setNewLocation () {
        const place = this.locationFinder.getPlace()
        this.setState({
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        })
    }

    render () {
        return (
            <div className="event-form-container">
                <form onSubmit={this.handleSubmit} action="">
                    <label htmlFor="">
                        Event Name:
                        <input type="text" onChange={this.handleInputChange("name")} value={this.state.name} />
                    </label>
                    <label htmlFor="">
                        Event Date and Time:
                        <input type="date" onChange={this.handleInputChange("start_day")} value={this.state.start_day}/>
                        <input type="time" onChange={this.handleInputChange("start_time")} value={this.state.start_time}/>
                    </label>
                    <label htmlFor="">
                        Event Description:
                        <textarea onChange={this.handleInputChange("description")} value={this.state.description} />
                    </label>
                    <label htmlFor="">
                        Location:
                        <input onChange={this.handleInputChange("address")} value={this.state.address} ref={locationFinderNode => this.locationFinderNode = locationFinderNode} type="text"/>
                    </label>
                    <input className="sign-up-btn" type="submit" value="Create Event!" />
                </form>
            </div>
        )
    }
}


const mdp = (dispatch) => {
    return {
        createEvent: (event) => dispatch(createEvent(event))
    }
}

export default connect(null, mdp)(EventForm)