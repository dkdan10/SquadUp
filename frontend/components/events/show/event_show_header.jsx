import React from 'react'


export default class ShowEventHeader extends React.Component {

    constructor(props) {
        super(props)
        this.state = { showNav: false }
        this.handleScroll = this.handleScroll.bind(this)
        this.rsvp = this.rsvp.bind(this)
        this.unrsvp = this.unrsvp.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(e) {
        if (e.currentTarget.scrollY > 190) {
            if (!this.state.showNav) this.setState({ showNav: true })
        } else {
            if (this.state.showNav) this.setState({ showNav: false })
        }
    }

    rsvp (e) {
        e.preventDefault()
        if (!this.props.currentUserId) {
            return
        }
        const target = e.target
        target.disabled = true
        this.props.rsvpToEvent(this.props.event.id).then(res => {
            target.disabled = false
        })
    }

    unrsvp (e) {
        e.preventDefault()
        if (!this.props.currentUserId) {
            return
        }
        const target = e.target
        target.disabled = true
        this.props.unrsvpToEvent(this.props.event.id).then(res => {
            target.disabled = false
        })
    }

    render () {
        const { event, group, organizer, currentUserId } = this.props

        const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
        const dt = new Date(event.start_day.replace(pattern, '$3-$2-$1'));

        const attendingButtonsDiv = event.user_ids.includes(currentUserId) ? (
            <div className="attending-buttons">
                <button className="check"><i className="fas fa-check"></i></button>
                <button onClick={this.unrsvp} className="nah cancel"><i className="fas fa-skull-crossbones"></i></button>
            </div>
        ) : (
            <div className="attending-buttons">
                <button onClick={this.rsvp} className="check cancel"><i className="fas fa-check"></i></button>
                <button className="nah"><i className="fas fa-skull-crossbones"></i></button>
            </div>
        )

        const classes = this.state.showNav ? 'sticky-div' : 'sticky-div hide'
        const stickyNav =(
            <div className={classes}>
                <div className="left-half">
                    <div className="calender-box">
                        <span className="event-day">{dt.getDate()}</span>
                        <span className="event-month">{dt.toDateString().slice(4, 7).toUpperCase()}</span>
                    </div>
                    <div className="event-info">
                        <span className="full-date">{dt.toDateString()}</span>
                        <span className="event-name">{event.name}</span>
                    </div>
                </div>
                <div className="right-half">
                    {attendingButtonsDiv}
                </div>
            </div>
        ) 

        return (
            <div className="event-show-header">
                {stickyNav}
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
                        <span className="members-going">{event.user_ids.length} people going</span>
                    </div>
                    {attendingButtonsDiv}
                </div>
            </div>    
        )
    }
}