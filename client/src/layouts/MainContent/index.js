import React, {  } from 'react';
import { Tabs } from 'antd';
import { Home } from '../../pages'
import './index.less'
import MainHeader from '../MainHeader';
const { TabPane } = Tabs;
const MainContent = props => {

  const onChange = (activeKey) => {
    props.changeState({
      activeMenu: activeKey,
      panes: props.panes
    })
  }

  const remove = targetKey => {
    let activeMenu = props.activeMenu;
    let panes = props.panes.slice();
    let preIndex = panes.findIndex(item => item.key === targetKey) - 1;
    preIndex = Math.max(preIndex, 0);
    panes = panes.filter(item => item.key !== targetKey);
    if (targetKey === activeMenu) {
      activeMenu = panes[preIndex] ? panes[preIndex].key : ''
    }
    props.changeState({
      activeMenu,
      panes
    })
  }

  const onEdit = (targetKey, action) => {
    if (action === 'remove') {
      remove(targetKey)
    }
  }

  const operations = <MainHeader />

  return (
    <div style={{height: '100%', width: '100%', marginLeft: '10px'}}>
      <Tabs
        style={{ height: '100%' }}
        tabBarStyle={{ background: '#fff', marginBottom: 0 }}
        onEdit={onEdit}
        onChange={onChange}
        activeKey={props.activeMenu}
        type={'editable-card'}
        hideAdd
        tabBarExtraContent={operations}
      >
        <TabPane
          tab="首页"
          closable={false}
          style={{backgroundColor: '#fff'}}
        >
          <Home />
        </TabPane>
        {
          props.panes.map(item => (
            <TabPane
              key={item.key}
              tab={item.name}
              closable={true}
              style={{height: '100%'}}
            >
              <div style={{ height: '100%', width: '100%' }}>
                {item.content}
              </div>
            </TabPane>
          ))
        }
      </Tabs>
    </div>

  )
}

export default MainContent;