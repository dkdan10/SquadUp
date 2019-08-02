import * as JoinGroupAPI from "../util/join_group_api"
import { recieveGroup } from "./group_actions";


export const addMemberToGroup = (groupId) => {
    return JoinGroupAPI.addMemberToGroup(groupId)
        .then(groupData => dispatch(recieveGroup(groupData)))
}

export const removeMemberFromGroup = (groupId) => {
    return JoinGroupAPI.removeMemberFromGroup(groupId)
        .then(groupData => dispatch(recieveGroup(groupData)))
}