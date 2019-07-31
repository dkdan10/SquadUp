import ContentScroller from "./content_scroller";
import { connect } from 'react-redux'

const mSP = state => {
    return {
        groups: Object.values(state.entities.groups),
        contentType: "groups"
    }
}


export default connect(mSP)(ContentScroller)