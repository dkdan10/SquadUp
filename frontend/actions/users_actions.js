import * as userAPI from '../util/users_api'

export const RECIEVE_USERS = "RECIEVE_USERS"
export const CREATE_USER = "CREATE_USER"

export const fetchUsers = () => dispatch => {
    return userAPI.getAllUsers()
                    .then(users => {
                        dispatch(recievedUsers(users))
                    });
}

export const createNewUser = (user) => dispatch => {
    return userAPI.createNewUser(user)
                    .then(newUser => {
                        return dispatch(recievedUser(newUser))
                    })
}

export const recievedUsers = (users) => ({
    type: RECIEVE_USERS,
    users
})

export const recievedUser = (user) => ({
    type: CREATE_USER,
    user
})