export const fetchCurrentUser = () => (
    $.ajax({
        method: 'GET',
        url: 'api/current_user'
    })
)

export const fetchUsers = () => (
    $.ajax({
        method: 'GET',
        url: 'api/users'
    })
)

export const createNewUser = (user) => (
    $.ajax({
        method: 'POST',
        url: 'api/users',
        data: {
            user
        }
    })
)

export const createNewSession = (credentials) => (
    $.ajax({
        method: 'POST',
        url: 'api/session',
        data: {
            user: credentials
        }
    })
)

export const destroySession = () => (
    $.ajax({
        method: 'DELETE',
        url: 'api/session'
    })
)