import React from 'react'
import { Table } from 'antd'
import './index.less'

const { Column } = Table;

const TableComponent = (props) => {

  const { data, column, settings, loading } = props;

  return (
    <div className="table-container">
      <Table
        dataSource={data}
        pagination={false}
        bordered
        rowKey="_id"
        loading={loading}
        rowSelection={settings.rowSelection}
      >
        {
          column.map((item, index) => {
            return (
              <Column
                title={item.title}
                dataIndex={item.dataIndex}
                width={item.width}
                key={index}
                render={item.render}
              />
            )
          })
        }
      </Table>
    </div>

  )
}

export default TableComponent
