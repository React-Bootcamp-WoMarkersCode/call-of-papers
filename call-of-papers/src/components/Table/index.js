import React from 'react'
import { Table } from 'antd'
import './style.scss'

const TableComponent = ({ columns, dataSource }) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey='id'
      size='middle'
      pagination={{ pageSize: 10 }} />
  )
}

export default TableComponent
