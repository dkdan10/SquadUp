import * as locationAPI from '../util/location_api'

export const RECEIVE_ALL_LOCATIONS = "RECEIVE_ALL_LOCATIONS"

const receiveLocations = (locations) => ({
    type: RECEIVE_ALL_LOCATIONS,
    locations
})

export const fetchLocations = () => dispatch => {
    return locationAPI.fetchLocations()
        .then(locations => {
            return dispatch(receiveLocations(locations))
        })
}
