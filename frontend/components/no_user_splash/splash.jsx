import React from 'react'
import {SplashHeader} from './header'
import EventScroller from './content-scrollers/events_near_you_container'
import GroupScroller from './content-scrollers/groups_near_you_container';

export default class Splash extends React.Component {

 render () {
    return (
        <>
            <SplashHeader />
            <EventScroller />
            <GroupScroller />
        </>
    )
 }
}