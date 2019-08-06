import ContentScroller from "./content_scroller";
import {connect} from 'react-redux'
import { fetchEvents } from "../../../actions/event_actions";


const mSP = state => {
    return {
        events: Object.values(state.entities.events),
        contentType: "events"
    }
}

const mDP = dispatch => {
    return {
        fetchAllEvents: () => dispatch(fetchEvents())
    }
} 


export default connect(mSP, mDP)(ContentScroller)