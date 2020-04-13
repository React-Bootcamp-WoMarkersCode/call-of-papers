import React from 'react'
import { Row, Table, Divider, Tag } from 'antd'
import { Link } from 'react-router-dom'
import './lectures-list.scss'
import data from './lectures-list-test.json'

const columnsTable = [
  {
    title: 'Título',
    dataIndex: 'title',
    key: 'title',
    width: '20%'
  },
  {
    title: 'Descrição',
    dataIndex: 'description',
    key: 'description',
    width: '55%'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    className: 'status-cell',
    render: status => {
      let color = '';

      if (status === 'aprovado') {
        color = 'green';
      } else if (status === 'em análise') {
        color = 'geekblue';
      } else {
        color = 'volcano';
      }

      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    }
  },
  {
    dataIndex: 'id',
    key: 'id',
    render: (key) => (
      <span>
        <Link to={`/events/${key}`}>Mais detalhes</Link>
      </span>
    )
  },
]

const LecturesList = () => {
  return (
    <>
      <Row gutter={[16, 24]}>
        <Divider orientation="left">
          Minhas palestras
        </Divider>
      </Row>
      <Row justify="center" className='row-table'>
        <Table
          columns={columnsTable}
          dataSource={data}
          rowKey='id'
          size='middle'
          pagination={{ pageSize: 10 }} />
      </Row>
    </>
  )
}

export default LecturesList
