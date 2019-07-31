import GroupsContent from "./groups";
import { connect } from 'react-redux'


const mSP = state => {
    return {
        groups: Object.values(state.entities.groups),
    }
}


export default connect(mSP)(GroupsContent)