import React from 'react'
import {Link} from 'react-router-dom'

export const SplashHeader = (props) => {
    return (
        <div className="header-content">
            <video className="header-video" muted autoPlay loop src="https://www.meetup.com/mu_static/en-US/video.dddafbfe.mp4"></video>
            <div className="header-text">
                <h1>The real world is calling</h1>
                <h3>Join a local group to meet people, try something new, or do more of what you love.</h3>
                <Link className="header-join-btn" to="/signup">Join Squad Up</Link>
            </div>
        </div>
    )
}