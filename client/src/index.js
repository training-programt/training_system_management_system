import React from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import { ConfigProvider} from 'antd';
import { StoreContext }from 'redux-react-hook';
import zhCN from 'antd/es/locale/zh_CN';
import { makeStore } from './store';
import 'moment/locale/zh-cn';

import './normalize.css';

import AppRouter from './routers'

moment.locale('zh-cn');

const store = makeStore();

const App = () => (
  <ConfigProvider locale={zhCN}>
    <StoreContext.Provider value={store}>
      <AppRouter />
    </StoreContext.Provider>
  </ConfigProvider>
);

ReactDom.render(<App />, document.getElementById('root'));



