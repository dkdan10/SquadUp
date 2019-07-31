import React from 'react'
import {SplashHeader} from './header'
import SplashSearch from './search'

export default class Splash extends React.Component {

    render() {
        return (
            <>
                <SplashHeader/>
                <SplashSearch/>
            </>
        )
    }
}