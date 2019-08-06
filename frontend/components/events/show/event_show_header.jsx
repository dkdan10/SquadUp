import React from 'react'


export default class ShowEventHeader extends React.Component {


    render () {
        const { event, group, organizer } = this.props

        const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
        const dt = new Date(event.start_day.replace(pattern, '$3-$2-$1'));

        return (
            <div className="event-show-header">
                <div className="left-header">
                    <div className="calender-box">
                        <span className="event-day">{dt.getDate()}</span>
                        <span className="event-month">{dt.toDateString().slice(4,7).toUpperCase()}</span>
                    </div>
                    <div className="event-info">
                        <span className="full-date">{dt.toDateString()}</span>
                        <span className="event-name">{event.name}</span>
                        <div className="second-info">
                            <i className="user-image far fa-user-circle"></i>
                            <div className="inner-info">
                                <span className="host-info">Hosted by <span className="linkable">{organizer.username}</span></span>
                                <span className="group-info">From <span className="linkable">{group.name}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-header">
                    <div className="right-text">
                        <span className="going-question">Are you going?</span>
                        <span className="members-going">2 people going</span>
                    </div>
                    <div className="attending-buttons">
                        <button className="check"><i className="fas fa-check"></i></button>
                        <button className="nah"><i className="fas fa-skull-crossbones"></i></button>
                    </div>
                </div>
            </div>    
        )
    }
}