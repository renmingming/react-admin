import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Admin from './admin.js';
import Router from './router.js';
import { Provider } from 'react-redux'
import configureStore from './redux/store'
import registerServiceWorker from './registerServiceWorker';
const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
