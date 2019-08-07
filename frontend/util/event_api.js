export const fetchEvents = (filters) => (
    $.ajax({
        method: 'GET',
        url: 'api/events',
        data: {
            search: filters.search
        },
    })
)

export const fetchEvent = (id) => (
    $.ajax({
        method: 'GET',
        url: `api/events/${id}`
    })
)

export const createEvent = (event) => (
    $.ajax({
        method: 'POST',
        url: `api/events`,
        data: {
            event
        }
    })
)

export const updateEvent = (event) => (
    $.ajax({
        method: 'PATCH',
        url: `api/events/${event.id}`,
        data: {
            event
        }
    })
)

export const deleteEvent= (id) => (
    $.ajax({
        method: 'DELETE',
        url: `api/events/${id}`
    })
)

export const fetchUserGroupEvents = (filters) => (
    $.ajax({
        method: "GET",
        url: `api/current_user/groups/events`,
        data: {
            search: filters.search
        },
    })
)