import React from 'react'
import {SplashHeader} from './header'
import SplashSearch from './search'
import Calender from "./content/calender"
import Groups from "./content/groups_container"

export default class Splash extends React.Component {

    constructor(props) {
        super(props)
        this.state = { calenderSelected: true }
        this.toggleSelected = this.toggleSelected.bind(this)
    }

    toggleSelected (selectedCalender) {
        return e => {
            this.setState({ calenderSelected: selectedCalender})
        }
    }

    render() {
        const contentComp = this.state.calenderSelected ? (<Calender />) : (<Groups/>)
        return (
            <>
                <SplashHeader/>
                <SplashSearch calenderSelected={this.state.calenderSelected} toggleSelected={this.toggleSelected}/>
                {contentComp}
            </>
        )
    }
}