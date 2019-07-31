import ContentScroller from "./content_scroller";
import {connect} from 'react-redux'


const mSP = state => {
    return {
        events: Object.values(state.entities.events),
        contentType: "events"
    }
}


export default connect(mSP)(ContentScroller)