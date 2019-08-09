import { merge } from 'lodash'
import { RECEIVE_CHANNEL, RECEIVE_CHANNELS } from '../../actions/messaging_actions';


export default (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_CHANNELS:
            return merge({}, action.channelData.channels)
        case RECEIVE_CHANNEL:
            return merge({}, state, {[action.channelData.channel.id]: action.channelData.channel})
        default:
            return state
    }

}