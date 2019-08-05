import React from 'react'
import { createEvent } from '../../../actions/event_actions';
import {connect} from 'react-redux';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

// import TimePicker from 'rc-time-picker';
// import 'rc-time-picker/assets/index.css';


import { SingleDatePicker } from 'react-dates';
import moment from 'moment';


class EventForm extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            name: "",
            start_day: null,
            start_time: "",
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

        if (this.eventValid()) {
            debugger
            const {name, start_time, start_day, group_id, address, lng, lat, description} = this.state
            this.props.createEvent({
                name,
                start_day: moment(start_day).format("YYYY/MM/DD"),
                start_time,
                group_id,
                address,
                lng,
                lat,
                description
            }).then(() => this.props.history.push(`/groups/${this.state.group_id}`))
        }
    }

    eventValid() {
        return (this.state.name.length 
            && 
            this.state.start_time !== "" 
            && 
            this.state.start_day 
            && 
            this.state.group_id 
            && 
            this.state.address !== "" 
            &&
            this.state.lng !== ""
            &&
            this.state.lat !== ""
            &&
            this.state.description.length)
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
            <>
            <div className="event-form-header">
                <h1>Create a New Group Event!</h1>
            </div>
            <div className="event-form-container">
                <form className="event-form" onSubmit={this.handleSubmit}>

                    <div className="event-form-section event-name">
                        <img src="https://secure.meetupstatic.com/s/img/545971442246927/start_v2/tag.svg" alt="" />
                        <div className="section-content">
                            <span className="step-count">STEP 1 OF 5</span>
                            <label htmlFor="">
                                What is the name of your event?
                            </label>
                            <input type="text" onChange={this.handleInputChange("name")} value={this.state.name} />
                        </div>
                    </div>

                    <div className="event-form-section event-time">
                        <i className="far fa-calendar-alt"></i>
                        <div className="section-content">
                            <span className="step-count">STEP 2 OF 5</span>
                            <label htmlFor="">
                                What is the date of your event?
                            </label>
                            <SingleDatePicker 
                                id="event_date_picker" 
                                onDateChange={(date) => this.setState({start_day: date})} 
                                focused={this.state.focused}
                                onFocusChange={({ focused }) => this.setState({ focused })} 
                                date={this.state.start_day} 
                            />
                        </div>
                    </div>

                    <div className="event-form-section event-time">
                        <i className="far fa-clock"></i>
                        <div className="section-content">
                            <span className="step-count">STEP 3 OF 5</span>
                            <label htmlFor="">
                                What time will your event start?
                                {/* <TimePicker
                                    value={this.state.start_time}
                                    onChange={this.handleInputChange("start_time")}
                                /> */}
                            </label>
                            <input type="time" onChange={this.handleInputChange("start_time")} value={this.state.start_time} />
                        </div>
                    </div>

                    <div className="event-form-section event-description">
                        <img src="https://secure.meetupstatic.com/s/img/322408653975454564695/start_v2/textBubbles.svg" alt=""/>
                        <div className="section-content">
                            <span className="step-count">STEP 4 OF 5</span>
                            <label htmlFor="">
                                What is going to happen at the event?
                            </label>
                            <textarea onChange={this.handleInputChange("description")} value={this.state.description} />
                        </div>
                    </div>

                    <div className="event-form-section event-location">
                        <img src="https://secure.meetupstatic.com/s/img/5771697722992842330638/start_v2/globe.svg" alt=""/>
                        <div className="section-content">
                            <span className="step-count">STEP 5 OF 5</span>
                            <label htmlFor="">
                                Where is your event?
                            </label>
                            <input onChange={this.handleInputChange("address")} value={this.state.address} ref={locationFinderNode => this.locationFinderNode = locationFinderNode} type="text"/>
                        </div>
                    </div>
                    
                    <input className="sign-up-btn" type="submit" value="Create Event!" />
                </form>
            </div>
            </>
        )
    }
}


const mdp = (dispatch) => {
    return {
        createEvent: (event) => dispatch(createEvent(event))
    }
}

export default connect(null, mdp)(EventForm)