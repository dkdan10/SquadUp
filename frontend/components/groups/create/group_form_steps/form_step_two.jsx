import React from 'react'

export default class FormStepTwo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const tempTopics = [
            "Card Making",
            "Machine Learning",
            "Basketball",
            "Animals",
            "Screen Writing",
            "Public Speaking",
            "Web Technology"
        ]

        const topicLis = tempTopics.map((topic,idx) => {
            return <li key={`topic-${idx}`} className="topic-item"><span className="topic-text">{topic}</span></li>
        })

        const compToShow = (
            <div className="topic-picker-comp">
                <input placeholder="Search for topics" className="search" type="text" />
                <ul className="topics-ul">
                    {topicLis}
                </ul>
            </div>
        )

        return (
            <div className="choose-topics">
                <h1>Choose a few topics that describe your group's interests *Coming Soon!*</h1>
                <p>Be specific! This will help us promote your group to the right people. You can choose up to 15 topics.</p>
                {compToShow}

            </div>
            )
    }
}