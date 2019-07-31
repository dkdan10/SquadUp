import CalenderContent from "./calender_events";
import { connect } from 'react-redux'


const mSP = state => {
    return {
        events: Object.values(state.entities.events),
    }
}


export default connect(mSP)(CalenderContent)