export const getAllUsers = () => (
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