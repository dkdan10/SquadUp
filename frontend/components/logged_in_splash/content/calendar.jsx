import React from 'react'
import CalendarEvents from "./calendar_events"
import CalendarSide from "./calendar_side"
import moment from 'moment'

export default class Calendar extends React.Component {

    constructor(props) {
        super(props)
        this.state = { filterSelectedIndex: 1, selectedDate: moment(new Date()) }
        this.toggleSelected = this.toggleSelected.bind(this)
        this.setNewDate = this.setNewDate.bind(this)
    }

    toggleSelected(idx) {
        return e => {
            this.setState({ filterSelectedIndex: idx })
        }
    }

    setNewDate(date) {
        this.setState({ selectedDate: date })
    }
    
    render() {
        return (
            <div className="splash-calendar-container">
                <CalendarEvents events={this.props.events} selectedDate={this.state.selectedDate}/>
                <CalendarSide 
                    toggleSelected={this.toggleSelected} 
                    filterSelectedIndex={this.state.filterSelectedIndex}
                    selectedDate={this.state.selectedDate}
                    setNewDate={this.setNewDate}
                />
            </ div>
        )
    }
}