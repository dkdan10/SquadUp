import React from 'react'
import ReactDom from 'react-dom'
import configureStore from './store/store';
import Root from './components/root';
import { getAllUsers } from './util/session_api';
import { fetchGroups, fetchGroup, createGroup, deleteGroup } from './actions/group_actions';


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
    // window.dispatch = store.dispatch;
    // type store.dispatch(fetchUsers()) to test
    window.fetchGroups = fetchGroups;
    window.fetchGroup = fetchGroup;
    window.createGroup = createGroup;
    window.deleteGroup = deleteGroup;
    // ...TESTING

    const root = document.getElementById('root');
    ReactDom.render(<Root store={store}/>, root);
})