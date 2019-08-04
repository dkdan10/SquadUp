import React from 'react'

export default class FormStepFour extends React.Component {
    constructor(props) {
        super(props)
        this.updateDescription = this.updateDescription.bind(this)
        const currentDescription = this.props.getCurrentDescription()

        this.state = { localDescription: currentDescription }
    }

    updateDescription(e) {
        this.setState({ localDescription: e.target.value })
        this.props.setDescription(e.target.value)
    }

    render() {

        const compToShow = (
            <div className="description-comp">
                <textarea 
                    placeholder="Please describe your group" 
                    onChange={this.updateDescription} 
                    value={this.state.localDescription}  
                    className="description-textarea"
                    maxLength="1000" 
                />
            </div>
        )

        return (
            <div className="choose-description">
                <h1>Now describe what your group will be about</h1>
                <p>People will see this when we promote your group, but you’ll be able to add to it later, too.</p>

                <ul className="description-list">
                    <li>1. What's the purpose of the group?</li>
                    <li>2. Who should join?</li>
                    <li>3. What will you do at your events?</li>
                </ul>
                {compToShow}

            </div>
        )
    }
}