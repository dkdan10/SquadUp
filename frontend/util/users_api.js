export const getAllUsers = () => (
    $.ajax({
        method: 'GET',
        url: 'api/users'
    })
)