import React from 'react'
import { Row, Divider, Tag, Button, Typography } from 'antd'
import { Link } from 'react-router-dom'
import TableComponent from '../../components/Table'
import data from './lectures-list-test.json'
import './lectures-list.scss'

const { Paragraph } = Typography

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
    width: '55%',
    render: status => {
      return (
        <Paragraph ellipsis={{ rows: 2, expandable: false }} >
          {status}
        </Paragraph>
      );
    }
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
        <Link to={`/lectures/${key}`}>Mais detalhes</Link>
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
      <Row justify="end" className='row-table'>
        <Button type='default'>
          <Link to='/download-lectures'><span>Faça o download de suas palestras!</span></Link>
        </Button>
      </Row>
      <Row justify="center" className='row-table'>
        <TableComponent columns={columnsTable} dataSource={data} />
      </Row>
    </>
  )
}

export default LecturesList
