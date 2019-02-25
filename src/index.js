import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Quiz from './pages/quiz';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Quiz />, document.getElementById('root'));

serviceWorker.unregister();
