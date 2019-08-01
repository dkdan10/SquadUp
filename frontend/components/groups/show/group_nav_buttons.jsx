import React from 'react'


export default class GroupNavButtons extends React.Component {
    constructor (props) {
        super(props)

    }

    render () {
        const indexText = ["About", "Events", "Members", "Photos", "Discussion", "More"]

        const navLinkLis = indexText.map((text, idx) => {
            return <li className={this.props.selectedIndex === idx ? "selected" : ""} onClick={this.props.setSelectedIndex(idx)}>{text}</li>
        })

        return (
            <div className="group-nav-bar">
                <ul className="nav-links">
                    {navLinkLis}
                </ul>
                <ul className="nav-buttons">
                    <button className="join-group-btn">Join this group</button>
                    <button className="extra-btn">...</button>
                </ul>
            </div>
            
        )
    }

} 