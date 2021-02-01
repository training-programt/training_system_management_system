import React, { useContext, useState, useEffect, useRef } from 'react';
import {Tabs, Table, Input, Button, Popconfirm, Form } from 'antd';
const EditableContext = React.createContext(null);
const { TabPane } = Tabs;

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const MatrixRelation = () => {

  const columnsTable = [
    {
      title: '毕业要求/培养目标',
      dataIndex: 'first',
    },
    {
      title: '培养目标1：人文素养',
      dataIndex: '1',
      editable: true,
    },
    {
      title: '培养目标2：专业知识与能力',
      dataIndex: '2',
      editable: true,
    },
    {
      title: '培养目标3：工程能力与应用',
      dataIndex: '3',
      editable: true,
    },
    {
      title: '培养目标4：团队沟通与合作',
      dataIndex: '4',
      editable: true,
    },
    {
      title: '培养目标5：终生学习与持续发展',
      dataIndex: '5',
      editable: true,
    },
  ]
  
  const dataSource = [
    {
      first: '毕业要求1：工程知识',
    },
    {
      first: '毕业要求2：问题分析',
    },
    {
      first: '毕业要求3：设计/开发解决方案',
    },
    {
      first: '毕业要求4：研究',
    },
    {
      first: '毕业要求5：使用现代工具',
    },
    {
      first: '毕业要求6：工程与社会',
    },
    {
      first: '毕业要求7：环境和可持续发展',
    },
    {
      first: '毕业要求8：职业规范',
    },
    {
      first: '毕业要求9：个人和团队',
    },
    {
      first: '毕业要求10：沟通',
    },
    {
      first: '毕业要求11：项目管理',
    },
    {
      first: '毕业要求12：终身学习',
    },
  ]

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = columnsTable.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <div>
      <Tabs>
        <TabPane tab="专业培养目标与毕业要求关系矩阵" key="1">
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowKey='first'
        />
        </TabPane>
        <TabPane tab="专业毕业要求与国家毕业要求覆盖情况" key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab="专业毕业要求与毕业要求指标点关系矩阵" key="3">
          Content of tab 3
        </TabPane>
        <TabPane tab="毕业要求指标点与课程关系矩阵" key="4">
          Content of tab 4
        </TabPane>
      </Tabs>
    </div>
  )
}

export default MatrixRelation
