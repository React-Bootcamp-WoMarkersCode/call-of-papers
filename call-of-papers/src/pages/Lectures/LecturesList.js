import React from 'react'
import { Row, Divider, Tag } from 'antd'
import { Link } from 'react-router-dom'
import TableComponent from '../../components/Table'
import data from './lectures-list-test.json'
import './lectures-list.scss'

const columnsTable = [
  {
    title: 'Título',
    dataIndex: 'title',
    key: 'title',
    width: '20%',
    className: 'title-cell'
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
        <TableComponent columns={columnsTable} dataSource={data} />
      </Row>
    </>
  )
}

export default LecturesList
