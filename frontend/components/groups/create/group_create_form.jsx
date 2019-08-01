import React from "react"
import { createGroup } from "../../../actions/group_actions";
import { connect } from 'react-redux'
import StepOne from './group_form_steps/form_step_one'
import StepTwo from './group_form_steps/form_step_two'
import StepThree from './group_form_steps/form_step_three'
import StepFour from './group_form_steps/form_step_four'
import StepFive from './group_form_steps/form_step_five'

import {merge} from "lodash"

class GroupCreateForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {group: this.props.group, currentIndex: 0}
        this.nextStep = this.nextStep.bind(this)
        this.backStep = this.backStep.bind(this)

        this.setLocation = this.setLocation.bind(this)
        this.getSelectedLocationId = this.getSelectedLocationId.bind(this)

        this.setName = this.setName.bind(this)
        this.getCurrentName = this.getCurrentName.bind(this)
        
        this.setDescription = this.setDescription.bind(this)
        this.getCurrentDescription = this.getCurrentDescription.bind(this)

        this.handleSubmitForm = this.handleSubmitForm.bind(this)

        // this.stepComplete = this.stepComplete.bind(this)

        this.steps = [
            <StepOne setLocation={this.setLocation} getSelectedLocationId={this.getSelectedLocationId}/>,
            <StepTwo/>,
            <StepThree setName={this.setName} getCurrentName={this.getCurrentName}/>,
            <StepFour setDescription={this.setDescription} getCurrentDescription={this.getCurrentDescription} />,
            <StepFive/>
        ]
    }

    // COULD REFACTOR SETTERS INTO ONE FUNCTION

    // STEP ONE
    setLocation (locationId) {
        const newState = Object.assign({}, this.state.group, {locationId})
        this.setState(
            { group: newState }
        )
    }

    getSelectedLocationId (){
        return this.state.group.locationId
    }

    // STEP TWO

    // STEP THREE
    setName(name) {
        const newState = Object.assign({}, this.state.group, { name })
        this.setState(
            { group: newState }
        )
    }

    getCurrentName() {
        return this.state.group.name
    }

    // STEP FOUR
    setDescription(description) {
        const newState = Object.assign({}, this.state.group, { description })
        this.setState(
            { group: newState }
        )
    }

    getCurrentDescription() {
        return this.state.group.description
    }

    // STEPPERS
    
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

    // CREATE!

    handleSubmitForm (e) {
        e.preventDefault()
        if (this.validGroup) {
            const stateGroup = this.state.group
            const groupToCreate = {
                name: stateGroup.name,
                description: stateGroup.description,
                location_id: stateGroup.locationId,
                private: false
            }
            this.props.createGroup(groupToCreate)
                .then(() => this.props.history.push("/"))
        }
    }

    validGroup () {
        return (
            this.state.group.name.length
            &&
            this.state.group.description.length
            &&
            this.state.group.locationId
        ) 
        ? true : false
    }

    // Valid Step?

    // stepComplete () {
        
    // }

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
                <button  className={`${step === 4 ? "hide-btn" : null} step-btn next-step`} onClick={this.nextStep}>Next Step</button>
                <button className={`${step === 4 ?  null : "gone-btn"} step-btn create-btn`} onClick={this.handleSubmitForm}  >Agree &amp; Create</button>
                {/* disabled={this.stepComplete} */}
            </div>
        )
        return (
            <div className="group-create-form">
                {progressBar}
                <div className="main-content">
                    <div className="top-content">
                        <span className="step-count">STEP {step + 1} OF 5 </span>
                        <div className="step-container">
                            {stepToRender}
                        </div>
                    </div>
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
            locationId: 1,
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