import React from "react"
import { createGroup } from "../../../actions/group_actions";
import { connect } from 'react-redux'
import StepOne from './group_form_steps/form_step_one'
import StepTwo from './group_form_steps/form_step_two'
import StepThree from './group_form_steps/form_step_three'
import StepFour from './group_form_steps/form_step_four'
import StepFive from './group_form_steps/form_step_five'

class GroupCreateForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {currentIndex: 0}
        this.steps = [
            <StepOne/>,
            <StepTwo/>,
            <StepThree/>,
            <StepFour/>,
            <StepFive/>
        ]
        this.nextStep = this.nextStep.bind(this)
        this.backStep = this.backStep.bind(this)
    }
    
    nextStep (e) {
        e.preventDefault()
        if (this.state.currentIndex < 4) {
            this.setState({currentIndex: this.state.currentIndex + 1})
        }
    }

    backStep(e) {
        e.preventDefault()
        if (this.state.currentIndex > 0) {
            this.setState({ currentIndex: this.state.currentIndex - 1 })
        }
    }

    render () {
        const step = this.state.currentIndex
        const stepToRender = this.steps[step]

        const progressBar = (
            <div className="progress-bar">
                <div className={`completed comp-${"step" + step}`}></div>
                <div className={`to-go left-${"step" + step}`}></div>
            </div>
        )
        const stepButtons = (
            <div className="step-control-btns">
                <button className={`${step === 0 ? "hide-btn" : null} step-btn back-step`} onClick={this.backStep}><i className="back-icon fas fa-chevron-left"></i> Back Step</button>
                <button className={`${step === 4 ? "hide-btn" : null} step-btn next-step`} onClick={this.nextStep}>Next Step</button>
            </div>
        )
        return (
            <div className="group-create-form">
                {progressBar}
                <div className="main-content">
                    <span className="step-count">STEP {step + 1} OF 5 </span>
                    {stepToRender}
                    {stepButtons}
                </div>
            </div>
        )
    }

}


const msp = (state) => {
    return {
        group: {
            name: "",
            description: "",
            location_id: 1,
            private: false
        }
    }
}

const mdp = (dispatch) => {
    return {
        createGroup: (group) => dispatch(createGroup(group))
    }
}

export default connect(msp, mdp)(GroupCreateForm)