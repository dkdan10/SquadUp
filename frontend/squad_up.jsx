import React from 'react'
import ReactDom from 'react-dom'
import configureStore from './store/store';
import Root from './components/root';
import { fetchUsers } from './actions/users_actions';
import * as userAPI from './util/users_api'


document.addEventListener('DOMContentLoaded', () => {
    const store = configureStore();

    // TESTING...
    window.store = store;
    // type store.dispatch(fetchUsers()) to test
    window.fetchUsers = fetchUsers;
    // ...TESTING

    const root = document.getElementById('root');
    ReactDom.render(<Root store={store}/>, root);
})