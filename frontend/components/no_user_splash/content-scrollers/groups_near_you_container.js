import ContentScroller from "./content_scroller";
import { connect } from 'react-redux'

const mSP = state => {
    return {
        groups: Object.values(state.entities.groups),
        contentType: "groups"
    }
}

const mDP = dispatch => {
    return {
        fetchGroups: () => dispatch(fetchGroups())
    }
}


export default connect(mSP, mDP)(ContentScroller)