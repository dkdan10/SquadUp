import React from "react"
import StepOne from './group_form_steps/form_step_one'
import StepTwo from './group_form_steps/form_step_two'
import StepThree from './group_form_steps/form_step_three'
import StepFour from './group_form_steps/form_step_four'
import StepFive from './group_form_steps/form_step_five'
import { Redirect, Link } from 'react-router-dom'


export default class GroupCreateForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {group: this.props.group, currentIndex: 0, redirectToUrl: false}
        this.nextStep = this.nextStep.bind(this)
        this.backStep = this.backStep.bind(this)

        this.setLocation = this.setLocation.bind(this)
        this.getSelectedLocationId = this.getSelectedLocationId.bind(this)

        this.setName = this.setName.bind(this)
        this.getCurrentName = this.getCurrentName.bind(this)
        
        this.setDescription = this.setDescription.bind(this)
        this.getCurrentDescription = this.getCurrentDescription.bind(this)

        this.handleSubmitForm = this.handleSubmitForm.bind(this)

        this.stepComplete = this.stepComplete.bind(this)

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
            if (this.props.editForm) groupToCreate.id = this.props.group.id
            this.props.action(groupToCreate)
                .then((res) => {
                    this.setState({ redirectToUrl: `/groups/${res.groupData.group.id}`})
                })
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

    stepComplete () {
        const step = this.state.currentIndex
        switch (step) {
            case 0:
                return this.state.group.locationId ? true : false
            case 1: 
                // VERIFY TAGS IN THE FUTURE
                return true
            case 2:
                return this.state.group.name.length > 5 ? true : false
            case 3: 
                return this.state.group.description.length > 20 ? true : false
            default:
                return false
        }
    }

    render () {

        if (this.state.redirectToUrl) {
            return (
                <Redirect to={this.state.redirectToUrl} />
            )
        }


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
                <button disabled={!this.stepComplete()} className={`${step === 4 ? "hide-btn" : null} step-btn next-step`} onClick={this.nextStep}>Next Step</button>
                <button className={`${step === 4 ?  null : "gone-btn"} step-btn create-btn`} onClick={this.handleSubmitForm}  >Agree &amp; {this.props.editForm ? "Update" : "Create"}</button>
                
            </div>
        )

        const cancelButton = this.props.editForm ? (
            <Link to={`/groups/${this.props.group.id}`} className="cancel-group-edit">Cancel Edits</Link>
        ) : null
        
        return (
            <div className="group-create-form">
                {progressBar}
                {cancelButton}
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
