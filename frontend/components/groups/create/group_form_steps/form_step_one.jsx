import React from 'react'
import { connect } from 'react-redux';
import { fetchLocations } from '../../../../actions/loaction_actions';

class FormStepOne extends React.Component {
    constructor (props) {
        super (props)
        this.state = {locationSearch: "", selectingLocation: false}
        this.toggleSelectLocation = this.toggleSelectLocation.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSelectedLocation = this.handleSelectedLocation.bind(this)
    }

    componentDidMount() {
        this.props.fetchLocations()
    }

    handleTextChange(field) {
        return e => {
            this.setState({ [field]: e.target.value })
        }
    }

    handleSelectedLocation (locationId) {
        return e => {
            this.toggleSelectLocation()
            this.props.setLocation(locationId)
            
        }
    }

    toggleSelectLocation() {
        this.setState({ selectingLocation: !this.state.selectingLocation })
    }

    render () {

        let compToShow;
        const { locations } = this.props
        if (this.state.selectingLocation) {
            const filteredLocations = Object.values(locations).filter(location => {
                if (location.name.toLowerCase().includes(this.state.locationSearch.toLowerCase()) || this.state.locationSearch.length === 0) {
                    return location
                }
            })

            const filteredLis = filteredLocations.map(location => {
                return (
                    <li onClick={this.handleSelectedLocation(location.id)} className="location-list-item" key={location.id}><span>{location.name}</span></li>
                )
            })

            compToShow = (
                <div className="location-picker">
                    <input placeholder="Search for a city" className="search" type="text" onChange={this.handleTextChange("locationSearch")} value={this.state.locationSearch} />
                    <ul className="location-list">
                        {filteredLis}
                    </ul>
                </div>
            )
        } else {
            const selectedLocationId = this.props.getSelectedLocationId()
            
            const locationName = locations[selectedLocationId] ? locations[selectedLocationId].name : null
            compToShow = (
                <div className="selected-location-info">
                    <span className="location-name">{locationName}</span>
                    <span onClick={this.toggleSelectLocation} className="change-location"> Change location</span>
                </div>
            )
        }

        

        return (
            <div className="choose-location">
                <h1>First, set your group's location.</h1>
                <p>Squadup groups meet locally and in person. We’ll connect you with people who live in and around your area.</p>
                {compToShow}
            </div>
        )
    }
}

const msp = (state) => {
    return {
        locations: state.entities.locations
    }
}

const mdp = (dispatch) => {
    return {
        fetchLocations: () => dispatch(fetchLocations()) 
    }
}

export default connect(msp, mdp)(FormStepOne)