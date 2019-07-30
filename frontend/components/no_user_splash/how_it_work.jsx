import React from 'react'
import { Link } from 'react-router-dom'

export const HowItWorks = (props) => {
    return (
        <div className="how-it-works-container">
            <div className="title">
                <h1>How Squadup Works</h1>
            </div>
            <div className="content">
                <div className="content-container">
                    <div className="icon">
                        <i className="fas fa-search"></i>
                    </div>
                    <div className="inner-content">
                        <h1>Discover Groups</h1>
                        <span>
                            See who’s hosting local events for all the things you love.
                        </span>
                        <Link className="link" to="/">Join Squad Up <i className="fas fa-arrow-right"></i></Link>
                    </div>
                </div>  
                <div className="content-container">
                    <div className="icon">
                        <i className="fas fa-plus"></i>
                    </div>
                    <div className="inner-content">
                        <h1>Start a group</h1>
                        <span>
                            See who’s hosting local events for all the things you love.
                        </span>
                        <Link className="link" to="/">Get Started <i className="fas fa-arrow-right"></i></Link>
                    </div>
                </div>  
            </div>
        </div>
    )
}