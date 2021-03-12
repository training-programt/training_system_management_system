import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { Form, Input, Button, List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { setSession, getSession } from '@/utils'

const data = [
  {
    objective_name: '人文素养',
    description: '具有社会责任感和职业素养，具有良好的人文素养，能够为行业、区域、国家做出贡献'
  },
  {
    objective_name: '专业知识与能力',
    description: '掌握较为全面的数学自然科学、人文社会科学和软件工程专业知识，具有较强工程实践能力，能将软件工程知识与特定行业知识融合，解决行业领域内的复杂工程问题'
  },
  {
    objective_name: '工程能力与应用',
    description: '能够胜任软件工程相关的分析、研究、设计、开发、测试、应用、管理维护等方面的工作，能够结合工程应用背景从多方面对复杂软件工程问题进行分析和研究，并在工程项目实践中综合考虑经济、法律、环境与可持续发展等因素'
  },
  {
    objective_name: '团队沟通与合作',
    description: '具有良好的组织协同能力、沟通能力、较好的外语交流能力和一定的国际视野，能够在工作中进行跨文化的沟通与合作，在相关专业领域的项目中承担团队角色并协同工作'
  },
  {
    objective_name: '终生学习与持续发展',
    description: '具有自我获取知识、终身学习的能力，实现素质和能力的自我提升，达到软件工程师或相关工程师的任职资格或能力'
  },
];

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const TrainObject = (props, ref) => {

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [showMajorForm, setShowMajorForm] = useState(true)
  const [showForm, setShowForm] = useState(false);
  const [majorObject, setMajorObject] = useState('');
  const [objectList, setObjectList] = useState([])
  const [editObject, setEditObject] = useState(false);
  const [acObject, setAcObject] = useState(0)

  const addMajorObject = () => {
    setMajorObject(form1.getFieldsValue().majorObject);
    setShowMajorForm(false)
  }

  const addObjectItem = () => {
    if (!editObject) {
      setObjectList([...objectList, form2.getFieldsValue()])
    } else {
      const tempData = [...objectList]
      tempData[acObject] = form2.getFieldValue();
      setObjectList(tempData)
      setEditObject(false)
    }
    setShowForm(false)

    form2.resetFields()
  }

  const useObjectItem = (item) => {
    setObjectList([...objectList, item])
  }

  const delObjectItem = (index) => {
    let tempData = [...objectList]
    tempData.splice(index, 1);
    setObjectList(tempData)
  }

  const editObjectItem = index => {
    setEditObject(true)
    setShowForm(true)
    setAcObject(index)
    form2.setFieldsValue(objectList[index]);
  }

  useImperativeHandle(ref, () => {
    return {
      saveProject() {
        return {
          professional_training_objectives: majorObject,
          specific_training_objectives: objectList,
        }
      }
    }
  })

  return (
    <div className="train-object">
      <div className="object-left">
        <div className="title">新增培养目标</div>
        <div className="content-wrap">
          <div className="major-object">
            <div>专业培养目标：</div>
            {
              !showMajorForm
                ? (
                  <>
                    <div>{majorObject}</div>
                    <div className="major-object-edit"><Button type="link" size="small" onClick={() => setShowMajorForm(true)}>编辑</Button></div>
                  </>
                )
                : (
                  <Form form={form1}>
                    <Form.Item
                      name='majorObject'
                      rules={[{ required: true, message: '专业培养目标描述不能为空' }]}
                    >
                      <Input.TextArea allowClear autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Form.Item>
                    <Button onClick={addMajorObject}>确定</Button>
                  </Form>
                )
            }

          </div>
          <List
            itemLayout="horizontal"
            dataSource={objectList}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <Button type="link" size='small' onClick={() => editObjectItem(index)}>编辑</Button>,
                  <Button type="link" size='small' onClick={() => delObjectItem(index)}>删除</Button>
                ]}
              >
                <List.Item.Meta
                  title={'培养目标' + (index + 1) + '：' + item.objective_name}
                  description={item.description}
                />
              </List.Item>
            )}
          />

          {
            showForm ? (
              <Form form={form2} {...layout}>
                <Form.Item
                  label="标题"
                  name='objective_name'
                  rules={[{ required: true, message: '标题不能为空' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="描述"
                  name='description'
                  rules={[{ required: true, message: '描述不能为空' }]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Button onClick={addObjectItem} >{editObject ? '确定' : '添加'}</Button>
                <Button onClick={() => setShowForm(false)} >取消</Button>
              </Form>
            )
              : <Button type="dashed" onClick={() => setShowForm(true)} block icon={<PlusOutlined />}>添加具体专业培养目标</Button>
          }
        </div>
      </div>
      <div className="object-right">
        <div className="title">学校培养目标参考</div>
        <div className="content-wrap">
          <div className="school-object">
            <div>学校培养目标：</div>
            <div>本专业培养面向行业和区域、适应经济和社会需要，具有社会责任感和职业素养，具有扎实的数学、自然科学、人文社会科学和软件工程专业基础知识，具有实践应用能力、自我获取知识能力、交流组织协同能力、跨文化沟通和创新意识，能对软件工程复杂问题进行分析和解决，根据需求提出系统解决方案，具有软件分析、设计、开发、测试、应用、维护等软件工程应用能力，能在软件工程以及相关领域从事软件系统分析研究、设计、开发、测试、应用以及管理维护等工作的应用技术型高级专门人才。</div>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item
                actions={[<Button type="link" onClick={() => useObjectItem(item)}>应用</Button>]}
              >
                <List.Item.Meta
                  title={'培养目标' + (index + 1) + '：' + item.objective_name}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default forwardRef(TrainObject)
