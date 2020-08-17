import React from 'react'
import { Card, Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './index.less'
import { useDispatch } from 'redux-react-hook';

const Login = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch({
      type: 'LOGIN_SUCCESS',
    })
    message.success('登录成功');
    setTimeout(() => {
      history.push('/')
    }, 2000);
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100vh'}}>
      <Card
        bordered={false}
        style={{backgroundColor: '#ccc'}}
      >
        <div className="login-container">
          <Form
            form={form}
            className="login-form"
            initialValues={{
              remember: true,
            }}
            // onFinish={onFinish}
          >
            <h2>登录</h2>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名'
                }
              ]}
            >
              <Input
                type='text'
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码'
                }
              ]}
            >
              <Input
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: '请输入验证码'
                },
                {
                  // validator: this.handleConfirm
                }
              ]}
            >
              <Input
                type="text"
                style={{ width: '60%', float: 'left' }}
              />
            </Form.Item>
            <Form.Item className="pwd-setting">
              <Form.Item name="remember" valuePropName="checked" noStyle >
                <Checkbox
                  style={{ float: 'left' }}
                >
                  记住密码
                </Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="https://www.baidu.com">
                忘记密码
              </a>
            </Form.Item>
            <Button
              htmlType='submit'
              type="primary"
              onClick={onSubmit}
            >
              立即登录
            </Button>

          </Form>
        </div>
      </Card>
    </div>
  )
}

export default Login;