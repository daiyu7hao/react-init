import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//去掉g2的用户体验计划
import G2 from '@antv/g2';
G2.track(false);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
