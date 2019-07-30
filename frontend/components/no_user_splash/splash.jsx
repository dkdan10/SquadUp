import React from 'react'
import {SplashHeader} from './header'
import ContentScroller from './content-scrollers/content-scroller'

export default class Splash extends React.Component {

 render () {
    return (
        <>
            <SplashHeader />
            <ContentScroller />
        </>
    )
 }
}