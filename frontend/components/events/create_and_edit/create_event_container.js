import EventForm from "./event_form"
import { createEvent } from '../../../actions/event_actions';
import { connect } from 'react-redux';

const msp = (state, ownProps) => {
    return {
        event: {
            name: "",
            start_day: null,
            start_time: "",
            group_id: ownProps.match.params.groupId,
            address: "",
            lat: "",
            lng: "",
            description: "",
            errors: ""
        }
    }
}

const mdp = (dispatch) => {
    return {
        action: (event) => dispatch(createEvent(event))
    }
}

export default connect(msp, mdp)(EventForm)