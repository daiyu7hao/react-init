import React, { Component } from 'react';
import Routers from './modal/routers';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducers from './redux/reducers';

//引入主题文件，需要给webpack中的less-loader增加options: { javascriptEnabled: true }
import './theme/app.less';

const store = createStore(rootReducers);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routers/>
      </Provider> 
    );
  }
}

export default App;
