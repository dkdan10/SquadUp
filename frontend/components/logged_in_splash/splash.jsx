import React from 'react'
import {SplashHeader} from './header'
import SplashSearch from './search'
import CalenderEvents from "./content/event_calender_container"

export default class Splash extends React.Component {

    render() {
        return (
            <>
                <SplashHeader/>
                <SplashSearch/>
                <CalenderEvents/>
            </>
        )
    }
}