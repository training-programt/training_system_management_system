import React from 'react'
import { Card, Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './index.less'

const NormalLoginForm = () => {

  const histyry = useHistory();

  const onFinish = values => {
    console.log('Received values of form: ', values);
    message.success('登录成功');

    setTimeout(() => {
      histyry.push('/')
    }, 2000);

  };
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100vh'}}>
      <Card
        bordered={false}
        style={{backgroundColor: '#ccc'}}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default NormalLoginForm;