import React from 'react'
// import { Link } from 'react-router-dom'

export default class SplashSearch extends React.Component {

    render () {

        const toggleComp = this.props.calenderSelected ? (
            <div className="search-toggle">
                <span onClick={this.props.toggleSelected(false)} className="toggle">Groups</span>
                <span onClick={this.props.toggleSelected(true)} className="selected toggle">Calendar</span>
            </div>
        ) : (
            <div className="search-toggle">
                <span onClick={this.props.toggleSelected(false)} className="selected toggle">Groups</span>
                <span onClick={this.props.toggleSelected(true)} className="toggle">Calendar</span>
            </div>
        )

        return (
            <div className="search-bar-container">
                <div className="first-half">
                    <div className="search-bar">
                        <input type="text" placeholder="Search" />
                    </div>
                    <div className="search-text">
                        <span>within <span className="selectable">5 miles</span> of <span className="selectable">New York, NY</span> </span>
                    </div>
                </div>
                <div className="second-half">
                    {toggleComp}
                </div>
            </div>
        )
    }

}