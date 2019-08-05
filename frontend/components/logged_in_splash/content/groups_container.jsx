import GroupsContent from "./groups";
import { connect } from 'react-redux'
import { fetchGroups } from "../../../actions/group_actions";

const mSP = state => {
    const currentUser = state.entities.users[state.session.currentUserId]

    let myGroups = [];
    let otherGroups = [];
    Object.values(state.entities.groups).forEach(group => {
        if (currentUser.group_ids.includes(group.id)) {
            myGroups.push(group)
        } else {
            otherGroups.push(group)
        }
    })

    return {
        myGroups,
        otherGroups
    }
}


export default connect(mSP, mDP)(GroupsContent)