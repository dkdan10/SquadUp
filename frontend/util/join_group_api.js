
export const addMemberToGroup = (groupId) => {
    return $.ajax({
        method: "POST",
        url: `api/groups/add_member/${groupId}`
    })
}

export const removeMemberFromGroup = (groupId) => {
    return $.ajax({
        method: "DELETE",
        url: `api/groups/remove_member/${groupId}`
    })
}