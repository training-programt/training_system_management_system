import React from 'react';
import { Form, Button, Input } from "antd";

import './index.less'

const Major = () => {

  const filterInput = [
    { prop: 'majorName', label: '专业名称', minWidth: '300' },
  ]

  return (
    <div className="container">
      <div className="container-header">
        <Form>

          {
            filterInput.map((item, index) => {
              <Form.Item label={item.label} key={index} name={item.prop}>
                <Input></Input>
              </Form.Item>
            })
          }
          <Form.Item>
            <Button type='primary' htmlType="submit" style={{ marginRight: '1rem' }}>搜索</Button>
            <Button htmlType="button">重置</Button>
          </Form.Item>
        </Form>
      </div>
      <div className="container-body">
        表格
      </div>
    </div>
  )
}

export default Major;