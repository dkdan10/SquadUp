import * as userAPI from '../util/users_api'

export const RECIEVE_USERS = "RECIEVE_USERS"
export const CREATE_USER = "CREATE_USER"
export const LOG_IN_USER = "LOG_IN_USER"
export const LOG_OUT_USER = "LOG_OUT_USER"

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

export const createNewSession = (credentials) => dispatch => {
    return userAPI.createNewSession(credentials)
                            .then(loggedInUser => {
                                return dispatch(logInUser(Object.keys(loggedInUser)[0]))
                            })
}

export const destroySession = () => dispatch => {
    return userAPI.destroySession()
                    .then(() => {
                        return dispatch(logoutUser())
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

export const logInUser = (id) => ({
    type: LOG_IN_USER,
    id
})

export const logoutUser = () => ({
    type: LOG_OUT_USER
})