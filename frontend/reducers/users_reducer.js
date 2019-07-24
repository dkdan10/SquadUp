import { RECIEVE_USERS, CREATE_USER } from "../actions/users_actions";

// const dummyUsers = [
//     { username: "user1", email: "user1@email.com", id: 1},
//     { username: "user2", email: "user2@email.com", id: 2},
//     { username: "user3", email: "user3@email.com", id: 3},
//     { username: "user4", email: "user4@email.com", id: 4},
//     { username: "user5", email: "user5@email.com", id: 5},
// ]
export default (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECIEVE_USERS:
            // if we don't want to merge
            return action.users
            // if we do want to merge
            // return state.slice().concat(action.users)
        case CREATE_USER:
            return state.slice().concat(action.user)
        default:
            return state
    }

}