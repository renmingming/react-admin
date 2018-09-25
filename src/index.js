import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Admin from './admin.js';
import Router from './router.js';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
