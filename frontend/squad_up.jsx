import React from 'react'
import ReactDom from 'react-dom'
import configureStore from './store/store';
import Root from './components/root';
import { getAllUsers } from './util/users_api';
// import { fetchUsers } from './actions/users_actions';
// import * as userAPI from './util/users_api'


document.addEventListener('DOMContentLoaded', () => {

    let store
    if (window.currentUser){
        store = configureStore({ 
            entities: {
                users: {[window.currentUser.id]: window.currentUser} 
            },
            session: { currentUserId: window.currentUser.id}
        });
    } else {
        store = configureStore()
    }
    // TESTING...
    // window.store = store;
    // type store.dispatch(fetchUsers()) to test
    // window.fetchUsers = fetchUsers;
    // window.getAllUsers = getAllUsers
    // ...TESTING

    const root = document.getElementById('root');
    ReactDom.render(<Root store={store}/>, root);
})