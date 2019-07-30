export const fetchLocations = () => (
    $.ajax({
        method: 'GET',
        url: 'api/locations'
    })
)
