import React, { useContext, useState, useEffect, useRef, useMemo } from 'react';
import { Table, Input, Form, Button, Space } from 'antd';
import api from '@/apis/trainingProject'
import { createColumns, createRows } from '@/utils'
import XLSX from 'xlsx';

const TableOne = (props) => {
  const EditableContext = React.createContext(null);

  const [projectId, setProjectId] = useState(props.project)
  const [firstRow, setFirstRow] = useState([])
  const [columnsTable, setColumnsTable] = useState([])
  const [tableData, setTableData] = useState([]);
  const [explain, setExplain] = useState('H表示毕业要求对培养目标进行强支撑；M表示毕业要求对培养目标进行中支撑；L表示毕业要求对培养目标进行弱支撑。')

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
    index,
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
        handleSave({ ...record, ...values }, index);
      } catch (errInfo) {
        console.log('保存失败:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          // style={{
          //   margin: 0,
          // }}
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
  // 获取行列数据
  const getRowColData = async () => {
    const params = {
      _id: projectId._id,
    }
    const res = await React.$axios.get(api.getTable1RowCol, params)
    if (res && res.isSucceed) {
      formatData(res.data.row, res.data.col)
    }
  }

  const getTableData = async () => {
    const params = {
      _id: props.project.majorObjReqRelation
    }
    const res = await React.$axios.post(api.getMajorObjReqRelationData, params);
    if (res && res.isSucceed) {
      console.log(res.data.relation)
      setTableData(res.data.relation)
    }
  }

  useMemo(() => {
    console.log(props.project.majorObjReqRelation)
    if (props.project.majorObjReqRelation) {
      getTableData()
    }
    getRowColData()
  }, [])

  const formatData = (row, col) => {
    let rowData = row.majorRequirement.map((item, index) => {
      return {
        first: '毕业要求' + (index + 1) + '：' + item.name
      }
    })
    let colData = col.specific_training_objectives.map((item, index) => {
      return {
        title: '培养目标' + (index + 1) + '：' + item.objective_name,
        dataIndex: index,
        editable: true,
      }
    })
    if (!props.project.majorObjReqRelation) {
      const defaultData = []
      const arr = new Array(colData.length).fill('-')
      const obj = { ...arr }
      for (let i = 0; i < rowData.length; i++) {
        defaultData.push(obj)
      }
      setTableData(defaultData)
    }

    setFirstRow(rowData)
    setColumnsTable(colData)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleSave = (row, index) => {
    const newData = [...tableData];
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setTableData(newData)
  };

  const columns = createColumns('毕业要求/培养目标', columnsTable).map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record, index) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        index: index,
        handleSave: handleSave
      }),
    };
  });

  const saveTableData = async () => {
    const params = {
      projectId,
      relation: tableData,
      explain: explain,
    }
    const res = await React.$axios.post(api.saveTableOne, params)
    console.log(res)
  }

  const downloadData = async () => {

  }

  return (
    <div>
      <Space size='small'>
        <Button type='primary' onClick={saveTableData}>保存表格</Button>
        <Button type='primary'>导出表格</Button>
      </Space>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={createRows(firstRow, tableData)}
        columns={columns}
        pagination={false}
        rowKey='first'
      />
      <div className="table-description">
        <span>表格说明：</span>
        <span>{explain}</span>
      </div>
    </div>
  )
}

export default TableOne
