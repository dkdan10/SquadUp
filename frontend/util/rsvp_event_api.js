
export const rsvpToEvent = (eventId) => {
    return $.ajax({
        method: "POST",
        url: `api/events/add_rsvp/${eventId}`
    })
}

export const unrsvpFromEvent = (eventId) => {
    return $.ajax({
        method: "DELETE",
        url: `api/events/remove_rsvp/${eventId}`
    })
}