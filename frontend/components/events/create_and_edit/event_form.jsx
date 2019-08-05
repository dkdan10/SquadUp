import React from 'react'

export default class EventForm extends React.Component {

    componentDidMount () {
        this.locationFinder = new google.maps.places.Autocomplete(this.locationFinderNode);
    }

    render () {
        return (
            <div className="event-form-container">
                <form action="">
                    <label htmlFor="">
                        Event Name:
                        <input type="text"/>
                    </label>
                    <label htmlFor="">
                        Event Date and Time:
                        <input type="date" />
                        <input type="time" />
                    </label>
                    <label htmlFor="">
                        Event Description:
                        <textarea  />
                    </label>
                    <label htmlFor="">
                        Location:
                        <input ref={locationFinderNode => this.locationFinderNode = locationFinderNode} type="text"/>
                    </label>
                </form>
            </div>
        )
    }
}
