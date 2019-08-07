import React from 'react'
// import { Link } from 'react-router-dom'
import debounce from 'lodash/debounce';


export default class SplashSearch extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            search: ""
        }
        this.updateField = this.updateField.bind(this)
        this._debouncedSearch = debounce(() => {
                this.props.fetchUserGroupEvents()
                this.props.fetchGroups()
            }, 500);
    }
    
    
    updateField(field) {
        return e => {
            if (typeof parseInt(e.target.value) === 'number') {
                this.setState({ [field]: e.target.value })
                this.props.updateSearchFilter(e.target.value)
                this._debouncedSearch()
            }
        }
    }

    componentWillUnmount () {
        this.props.updateSearchFilter("")
    }

    render () {

        const toggleComp = this.props.calenderSelected ? (
            <div className="search-toggle">
                <span onClick={this.props.toggleSelected(false)} className="toggle">Groups</span>
                <span onClick={this.props.toggleSelected(true)} className="selected toggle">Calendar</span>
            </div>
        ) : (
            <div className="search-toggle">
                <span onClick={this.props.toggleSelected(false)} className="selected toggle">Groups</span>
                <span onClick={this.props.toggleSelected(true)} className="toggle">Calendar</span>
            </div>
        )

        return (
            <div className="search-bar-container">
                <div className="first-half">
                    <div className="search-bar">
                        <input onChange={this.updateField("search")} value={this.state.search} type="text" placeholder="Search" />
                    </div>
                    <div className="search-text">
                        <span>within <span className="selectable">5 miles</span> of <span className="selectable">New York, NY</span> </span>
                    </div>
                </div>
                <div className="second-half">
                    {toggleComp}
                </div>
            </div>
        )
    }

}