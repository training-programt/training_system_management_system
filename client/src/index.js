import React from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import { ConfigProvider} from 'antd';
// import { StoreContext }from 'redux-react-hook';
import { Provider }from 'react-redux';
import zhCN from 'antd/es/locale/zh_CN';
import { makeStore } from './store';
import 'moment/locale/zh-cn';
import axios from './https';
import './normalize.css';

import AppRouter from './routers'

moment.locale('zh-cn');

React.$axios = () => {
  get: (api, data) =>{
    console.log(api, data)
  };
}


const store = makeStore();

const App = () => (
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </ConfigProvider>
);

ReactDom.render(<App />, document.getElementById('root'));



