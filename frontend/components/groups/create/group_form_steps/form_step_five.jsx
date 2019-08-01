import React from 'react'

export default class FormStepFive extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            (
                <div className="guidelines">
                    <h1>Almost done! Just take a minute to review our guidelines</h1>
                    <p>Squadup is all about helping people live fuller, happier lives—with the help of strong communities. This means that all groups should:</p>

                    <ul className="guidelines-list">
                        <li>Provide growth opportunities for members</li>
                        <li>Encourage real human interactions</li>
                        <li>Meet in real life</li>
                        <li>Have a host present at all events</li>
                        <li>Be transparent about the group’s intentions</li>
                    </ul>

                </div>
            )
        )
    }
}