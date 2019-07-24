import React from 'react'
import ReactDom from 'react-dom'
import configureStore from './store/store';
import Root from './components/root';


document.addEventListener('DOMContentLoaded', () => {
    const store = configureStore();

    // TESTING...
    window.store = store;
    // ...TESTING

    const root = document.getElementById('root');
    ReactDom.render(<Root store={store}/>, root);
})