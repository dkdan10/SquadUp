import React from 'react'
import Calendar from 'react-calendar'

export default class CalendarSide extends React.Component {

    constructor (props) {
        super(props)
        this.state = {date: this.props.selectedDate.toDate() }
        this.setNewDate = this.setNewDate.bind(this)
    }

    setNewDate (date) {
        this.setState({date: date})
        this.props.setNewDate(date)
    }

    render() {

        const liContent = ["All upcoming events", "Your groups only", "Your events only"]
        const lis = liContent.map((liCont, idx) => {
            return this.props.filterSelectedIndex === idx ? (
                <li key={idx} onClick={this.props.toggleSelected(idx)} className="selected">{liCont}</li>
            ) : (
                <li key={idx} onClick={this.props.toggleSelected(idx)}>{liCont}</li>
            )
        })

        return (
            <div className="calendar-side">
                <ul className="filter">
                    {lis}
                </ul>
                <div className="calendar">
                    <Calendar
                        onChange={this.setNewDate}
                        value={this.state.date}
                    />
                </div>
            </div>
        )
    }
} 