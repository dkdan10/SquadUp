import * as userAPI from '../util/users_api'

export const RECIEVE_USERS = 'RECIEVE_USERS'

export const fetchUsers = () => dispatch => {
    return userAPI.getAllUsers()
                    .then(users => {
                        dispatch(recievedUsers(users))
                    });
}

export const recievedUsers = (users) => ({
    type: RECIEVE_USERS,
    users
})