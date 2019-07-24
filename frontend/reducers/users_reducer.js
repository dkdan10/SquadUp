const dummyUsers = [
    {username: "user1", email: "user1@email.com"},
    {username: "user2", email: "user2@email.com"},
    {username: "user3", email: "user3@email.com"},
    {username: "user4", email: "user4@email.com"},
    {username: "user5", email: "user5@email.com"},
]
export default (state = dummyUsers, action) => {
    Object.freeze(state);

    return state
}