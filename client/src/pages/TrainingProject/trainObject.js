import React from 'react'

import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const layout1 = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};
const layout2 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const TrainObject = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };
  return (
    <div className="train-object">
      <div className="object-left">
        <div className="title">新增培养目标</div>
        <div className="content-wrap">
          <Form form={form} name="dynamic_form_nest_item" autoComplete="off">
            <Form.Item name="trainObject" label="培养目标描述" rules={[{ required: true, message: '培养目标描述不能为空' }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.List name="objectives_list">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    // <Space key={field.key} align="baseline">
                    <div className="item-box">
                      <div className="item-left">
                        <Form.Item
                          {...field}
                          {...layout2}
                          label="标题"
                          name={[field.name, 'title']}
                          fieldKey={[field.fieldKey, 'title']}
                          rules={[{ required: true, message: '标题不能为空' }]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          {...layout2}
                          label="描述"
                          name={[field.name, 'description']}
                          fieldKey={[field.fieldKey, 'description']}
                          rules={[{ required: true, message: '描述不能为空' }]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </div>
                    // </Space>
                  ))}

                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      添加培养目标
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </div>
      </div>
      <div className="object-right">
        <div className="title">学校培养目标参考</div>
      </div>
    </div>
  )
}

export default TrainObject
