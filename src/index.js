import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './route/Routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
