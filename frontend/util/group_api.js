export const fetchGroups = (filter) => (
    $.ajax({
        method: 'GET',
        url: 'api/groups',
        data: {
            search: filter.search
        }
    })
)

export const fetchGroup = (id) => (
    $.ajax({
        method: 'GET',
        url: `api/groups/${id}`
    })
)

export const createGroup = (group) => (
    $.ajax({
        method: 'POST',
        url: `api/groups`,
        data: {
            group
        }
    })
)

export const updateGroup = (group) => (
    $.ajax({
        method: 'PATCH',
        url: `api/groups/${group.id}`,
        data: {
            group
        }
    })
)

export const deleteGroup = (id) => (
    $.ajax({
        method: 'DELETE',
        url: `api/groups/${id}`
    })
)
