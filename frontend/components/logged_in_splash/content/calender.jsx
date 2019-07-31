import React from 'react'
import CalenderEvents from "./calender_events_container"
import CalenderSide from "./calender_side"

export default class Calender extends React.Component {

    constructor(props) {
        super(props)
        this.state = { filterSelectedIndex: 1 }
        this.toggleSelected = this.toggleSelected.bind(this)
    }

    toggleSelected(idx) {
        return e => {
            this.setState({ filterSelectedIndex: idx })
        }
    }
    
    render() {
        return (
            <div className="splash-calender-container">
                {/* <h1>{this.state.filterSelectedIndex}</h1> */}
                <CalenderEvents />
                <CalenderSide toggleSelected={this.toggleSelected} filterSelectedIndex={this.state.filterSelectedIndex}/>
            </ div>
        )
    }
}