import * as userAPI from '../util/session_api'

export const RECIEVE_USERS = "RECIEVE_USERS"
export const RECIEVE_USER = "RECIEVE_USER"
export const LOG_IN_USER = "LOG_IN_USER"
export const LOG_OUT_USER = "LOG_OUT_USER"

export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS"
export const RECIEVE_SESSION_ERRORS = "RECIEVE_SESSION_ERRORS"

export const fetchCurrentUser = () => dispatch => {
    return userAPI.fetchCurrentUser()
                    .then(user => {
                        dispatch(recievedUser(user))
                    })
                    .fail(err => dispatch(recievedErrors(err.responseJSON)));
}

export const createNewUser = (user) => dispatch => {
    return userAPI.createNewUser(user)
                    .then(newUser => {
                        return dispatch(logInUser(newUser))
                    })
                    .fail(err => dispatch(recievedErrors(err.responseJSON)));

}

export const createNewSession = (credentials) => dispatch => {
    return userAPI.createNewSession(credentials)
                            .then(loggedInUser => {
                                return dispatch(logInUser(loggedInUser))
                            })
                            .fail(err => dispatch(recievedErrors(err.responseJSON)));
}

export const destroySession = () => dispatch => {
    return userAPI.destroySession()
                    .then(() => {
                        return dispatch(logoutUser())
                    })
                    .fail(err => dispatch(recievedErrors(err.responseJSON)));
}

export const removeErrors = () => dispatch => {
    return dispatch({ type: CLEAR_SESSION_ERRORS})
}

const recievedUsers = (users) => ({
    type: RECIEVE_USERS,
    users
})

const recievedUser = (user) => ({
    type: RECIEVE_USER,
    user
})

const logInUser = (user) => ({
    type: LOG_IN_USER,
    user
})

const logoutUser = () => ({
    type: LOG_OUT_USER
})

const recievedErrors = (errors = []) => ({
    type: RECIEVE_SESSION_ERRORS,
    errors
})