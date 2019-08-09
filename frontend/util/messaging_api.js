
export const createChannel = (otherUserId) => (
    $.ajax({
        method: 'POST',
        url: `api/channels`,
        data: {
            otherUserId
        }
    })
)

export const fetchChannels = () => (
    $.ajax({
        method: 'GET',
        url: `api/channels`
    })
)