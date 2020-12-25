import React from 'react'
import { Card, Form, Input, Button, Checkbox, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import './index.less'
import { setSession, authenticateSuccess } from '../../utils';
import { useHistory } from 'react-router-dom';
import axios from '../../https';

const Login = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'START_LOGIN' });
    const res = await React.$axios.post(
      '/login',
      form.getFieldsValue(),
    )
    if (res && res.isSucceed) {
      // console.log(res)
      authenticateSuccess(res.data.token.token_type + ' ' + res.data.token.access_token);
      setSession('userInfo', JSON.stringify(res.data.userInfo));
      dispatch({ type: 'LOGIN_SUCCESS' });
      history.push('/')
      message.success("登录成功");
    } else {
      dispatch({ type: 'LOGIN_FAILED'})
      message.error(res.message);
    }
  }

  const isLoading = useSelector(state => state.user.isLoading);

  return (
    <div>
      <Spin tip="loading..." spinning={isLoading}>
        <Card bordered={false} >
          <div className="login-container">
            <Form
              form={form}
              className="login-form"
            >
              <h2>登录</h2>
              <Form.Item
                name="account"
                rules={[
                  {
                    required: true,
                    message: '请输入账号'
                  }
                ]}
              >
                <Input
                  type='text'
                  placeholder="账号"
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

                onClick={handleLogin}
              >
                立即登录
            </Button>
            </Form>
          </div>
        </Card>
      </Spin>
    </div>
  )
}

export default Login;