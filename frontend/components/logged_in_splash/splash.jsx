import React from 'react'
import {SplashHeader} from './header'
import SplashSearch from './search'
import Calendar from "./content/calendar"
import Groups from "./content/groups"
import {connect} from "react-redux"
import { fetchCurrentUser } from '../../actions/session_actions';
import { fetchUserGroupEvents } from '../../actions/event_actions';
import { fetchGroups } from '../../actions/group_actions';
import { updateSearchFilter } from '../../actions/filter_actions';

class Splash extends React.Component {

    constructor(props) {
        super(props)
        const splitHistory = this.props.location.pathname.split("/")
        let calendarSelected;
        if (splitHistory[splitHistory.length - 1] !== "my-groups") {
            calendarSelected = true
            this.props.history.push("/my-calendar")
        } else {
            calendarSelected = false
            this.props.history.push("/my-groups")
        }
        this.state = { calendarSelected }
        this.toggleSelected = this.toggleSelected.bind(this)
    }

    toggleSelected (selectedCalendar) {
        return e => {
            this.setState({ calendarSelected: selectedCalendar})
        }
    }

    componentDidMount() {
        this.props.fetchCurrentUser().then(() => {
            this.props.fetchUserGroupEvents()
            this.props.fetchGroups()
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.calendarSelected !== this.state.calendarSelected) {
            if (this.state.calendarSelected) {
                this.props.history.push("/my-calendar")
            } else {
                this.props.history.push("/my-groups")
            }
        } 
    }

    render() {
        const contentComp = this.state.calendarSelected ? (
            <Calendar events={this.props.events}/>
        ) : (
            <Groups myGroups={this.props.myGroups} otherGroups={this.props.otherGroups}/>
        )
        return (
            <>
                <SplashHeader/>
                <SplashSearch 
                    calendarSelected={this.state.calendarSelected} 
                    toggleSelected={this.toggleSelected}
                    fetchUserGroupEvents={this.props.fetchUserGroupEvents}
                    updateSearchFilter={this.props.updateSearchFilter}
                    fetchGroups={this.props.fetchGroups}
                />
                {contentComp}
            </>
        )
    }
}

const mSP = state => {
    const currentUser = state.entities.users[state.session.currentUserId]

    let events = [];
    if (currentUser.joined_group_event_ids) {
        currentUser.joined_group_event_ids.forEach(eventId => {
            if (!state.ui.lastFetched.eventIds.includes(eventId)) return
            const event = state.entities.events[eventId]
            if (event) events.push(event)
        })
    }
    
    let myGroups = [];
    let otherGroups = [];
    if (currentUser.group_ids) {
        Object.values(state.entities.groups).forEach(group => {
            if (!state.ui.lastFetched.groupIds.includes(group.id)) return
            if (currentUser.group_ids.includes(group.id)) {
                myGroups.push(group)
            } else {
                otherGroups.push(group)
            }
        })
    }

    const comparator = (a, b) => {
        const dateA = new Date(`${a.start_day} ${a.start_time}`)
        const dateB = new Date(`${b.start_day} ${b.start_time}`)
        return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
    }

    return {
        events: events.sort((a, b) => comparator(a, b)),
        myGroups,
        otherGroups
    }
}


const mDP = dispatch => {
    return {
        fetchCurrentUser: ()  => dispatch(fetchCurrentUser()),
        fetchUserGroupEvents: () => dispatch(fetchUserGroupEvents()),
        fetchGroups: () => dispatch(fetchGroups()),
        updateSearchFilter: (value) => dispatch(updateSearchFilter(value))
    }
}

export default connect(mSP, mDP)(Splash)