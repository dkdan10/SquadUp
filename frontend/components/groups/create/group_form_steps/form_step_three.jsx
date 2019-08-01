import React from 'react'

export default class FormStepThree extends React.Component {
    constructor(props) {
        super(props)
        this.updateName = this.updateName.bind(this)
        const currentName = this.props.getCurrentName()

        this.state = { localName: currentName}
    }

    updateName (e) {
        this.setState({localName: e.target.value})
        this.props.setName(e.target.value)
    }

    render() {

        const compToShow = (
            <div className="name-comp">
                <input placeholder="Enter group name here" onChange={this.updateName} value={this.state.localName} className="name-input" type="text"/>
            </div>
        )

        return (
            <div className="choose-name">
                <h1>What will your group’s name be?</h1>
                <p>Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</p>
                {compToShow}

            </div>
        )
    }
}