import React from 'react'
import CalenderEvents from "./calender_events"
import CalenderSide from "./calender_side"
import moment from 'moment'

export default class Calender extends React.Component {

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
            <div className="splash-calender-container">
                {/* {this.state.selectedDate.format("YYYY/MM/DD")} */}
                <CalenderEvents events={this.props.events} />
                <CalenderSide 
                    toggleSelected={this.toggleSelected} 
                    filterSelectedIndex={this.state.filterSelectedIndex}
                    selectedDate={this.state.selectedDate}
                    setNewDate={this.setNewDate}
                />
            </ div>
        )
    }
}