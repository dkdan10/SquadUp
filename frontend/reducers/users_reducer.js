import { RECIEVE_USERS } from "../actions/users_actions";

const dummyUsers = [
    {username: "user1", email: "user1@email.com"},
    {username: "user2", email: "user2@email.com"},
    {username: "user3", email: "user3@email.com"},
    {username: "user4", email: "user4@email.com"},
    {username: "user5", email: "user5@email.com"},
]
export default (state = dummyUsers, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECIEVE_USERS:
            // if we don't want to merge
            return action.users
            // if we do want to merge
            // return state.slice().concat(action.users)
        default:
            return state
    }

}