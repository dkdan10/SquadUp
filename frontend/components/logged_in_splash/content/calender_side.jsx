import React from 'react'

export default class CalenderSide extends React.Component {


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
            <div className="calender-side">
                <ul className="filter">
                    {lis}
                </ul>
                <div className="calender">

                </div>
            </div>
        )
    }
} 