import CalenderContent from "./calender";
import { connect } from 'react-redux'


const mSP = state => {
    return {
        events: Object.values(state.entities.events),
        contentType: "events"
    }
}


export default connect(mSP)(CalenderContent)