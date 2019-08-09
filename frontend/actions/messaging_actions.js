import * as messagingAPI from '../util/messaging_api'

export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL"
export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS"

export const createChannel = (otherUserId) => (dispatch) => {
    return messagingAPI.createChannel(otherUserId)
        .then(channelData => dispatch(receiveChannel(channelData)))
}

export const fetchChannels = () => (dispatch) => {
    return messagingAPI.fetchChannels()
        .then(channelData => dispatch(receiveChannels(channelData)))
}

const receiveChannel = (channelData) => ({
    type: RECEIVE_CHANNEL,
    channelData
})

const receiveChannels = (channelData) => ({
    type: RECEIVE_CHANNELS,
    channelData
})
