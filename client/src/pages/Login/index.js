import React, { useState } from 'react';
import { Card, Spin, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './index.less'
import { useDispatch } from 'redux-react-hook';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();
  // const checkLogin = () => {
  //   setIsLoading(true);
  //       if(!userName){
  //           message.error('用户名不能为空')
  //           setTimeout(()=>{
  //               setIsLoading(false)
  //           },500)
  //           return false
  //       }else if(!password){
  //           message.error('密码不能为空')
  //           setTimeout(()=>{
  //               setIsLoading(false)
  //           },500)
  //           return false
  //       }
  //       let dataProps = {
  //           'userName':userName,
  //           'password':password
  //       }
  //   setTimeout(() => {
  //     history.push('/home');
  //   }, 1000)
  // }
  const checkLogin = () => {
    dispatch({
      type: 'LOGIN_SUCCESS',
      isLogin: true,
      roles: ['001'],
      isLoading: true,
    })
    message.success('登录成功');
    setTimeout(() => {
      history.push('/home')
    }, 2000);
  }
  return (
    <div className="login-div">
      <div className="wrapper">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="用户登录" bordered={true} style={{ width: 400 }} >
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { setUserName(e.target.value) }}
          />
          <br /><br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <br /><br />
          <Input
            id="code"
            size="large"
            placeholder="61+57=?"
            prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { setNumber(e.target.value) }}
          />
          <br /><br />
          <div className="pwd-setting">
          <Checkbox defaultChecked="true">记住密码</Checkbox>
          <a className="login-form-forgot" href="#">
            忘记密码?
          </a>
          </div>
          <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
        </Card>
      </Spin>
    </div>
    </div>
  )
}

export default Login;