import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './app.js'

import 'antd/dist/antd.css'
import './style/common.less'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
