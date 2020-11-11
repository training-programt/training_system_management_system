import React, { useState } from 'react';
import { Tabs, Form, Input, Image, Button, Upload, Select, message } from 'antd'
import postJSON from '@/public/json/post.json'
import './index.less'

const { TabPane } = Tabs;
const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const UserInfo = () => {
  const [random, setRandom] = useState();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(false);
  const [inputBorder, setInputBorder] = useState(false);

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 5,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        setLoading(false),
        setImageUrl(imageUrl),
      );
    }
  };

  const formData = [
    { type: 'text', label: '姓名', name: 'username', required: true },
    { type: 'text', label: '性别', name: 'sex', required: true },
    { type: 'text', label: '出生年月', name: 'birthday', required: true },
    { type: 'text', label: '拟授课程', name: 'course', disabled: true },
    { type: 'text', label: '专职/兼职', name: 'fulltime', required: true },
    { type: 'select', label: '专业技术职务', name: 'post', required: true },
    { type: 'select', label: '学历', name: 'education', required: true },
    { type: 'text', label: '最后学历毕业学校', name: 'lastSchool' },
    { type: 'text', label: '最后学历毕业专业', name: 'lastMajor' },
    { type: 'text', label: '最后学历毕业学历', name: 'lastEducation', required: true },
    { type: 'text', label: '研究领域', name: 'researchField' },
  ]

  const baseInfo = [
    { type: 'text', label: '电话', name: 'tel' },
    { type: 'text', label: '教师编号', name: 'number' },
    { type: 'text', label: '邮箱', name: 'email' },
  ]

  const operations = <Button type="primary" onClick={() => setInputBorder(true)}>编辑</Button>
  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }
  return (
    <div className="userInfo-container">
      <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
        <TabPane tab="个人信息" key="1" className="container-box">
          <div className="left-container">
            <Form
              {...formItemLayout}
            >
              {
                formData.map((item, index) => {
                  if (item.type == 'text') {
                    return (
                      <Form.Item
                        key={index}
                        name={item.name}
                        label={item.label}
                        rules={[
                          {
                            required: item.required,
                            message: `请输入你的${item.label}`,
                          },
                        ]}
                      >
                        <Input bordered={inputBorder} disabled={item.disabled} />
                      </Form.Item>
                    )
                  } else if (item.type == 'select') {
                    return (
                      <Form.Item
                        key={index}
                        name={item.name}
                        label={item.label}
                      >
                        <Select
                          showSearch
                          style={{ width: 200 }}
                          placeholder="Select a person"
                          optionFilterProp="children"
                          onChange={onChange}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option key='0' value="jack">Jack</Option>
                          <Option key='1' value="lucy">Lucy</Option>
                          <Option key='2' value="tom">Tom</Option>
                        </Select>
                      </Form.Item>
                    )
                  }
                })
              }
            </Form>
          </div>
          <div className="right-container">
            <div className="avatar-box">
              <div className="image-box">
                <Image
                  width={200}
                  src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${random}`}
                  placeholder={
                    <Image
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                      width={200}
                    />
                  }
                />
              </div>
              <div className="upload-box">
                <Upload
                  name="avatar"
                  className="avatar-uploader"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  <Button>更改头像</Button>
                </Upload>
                <Button
                  onClick={() => {
                    setRandom(Date.now());
                  }}
                >
                  刷新
              </Button>
              </div>
            </div>

            <div className="baseinfo-box">
              <Form
                {...formItemLayout}
              >
                {
                  baseInfo.map((item, index) => {
                    if (item.type == 'text') {
                      return (
                        <Form.Item
                          key={index}
                          name={item.name}
                          label={item.label}
                          rules={[
                            {
                              required: item.required,
                              message: `请输入你的${item.label}`,
                            },
                          ]}
                        >
                          <Input disabled={item.disabled} />
                        </Form.Item>
                      )
                    }
                  })
                }
              </Form>
            </div>
          </div>
        </TabPane>
        <TabPane tab="修改密码" key="2">
          师生信息
      </TabPane>
      </Tabs>
    </div>
  )
}

export default UserInfo;