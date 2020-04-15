import React, { useState, useEffect } from 'react'
import { Row, Col, Table } from 'antd'
import { Link } from 'react-router-dom'


const columnsTable = [
  {
    title: 'Palestrante',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Palestra',
    dataIndex: 'activityTitle',
    key: 'activityTitle'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    filters: [
      {
        text: 'IN-ANALYSIS',
        value: 'In-Analysis'
      },
      {
        text: 'APPROVED',
        value: 'approved'
      },
      {
        text: 'REJECTED',
        value: 'rejected'
      }
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.status.indexOf(value) === 0, 
    render: status => status.toUpperCase()
  },
  {
    dataIndex: 'id',
    key: 'id',
    render: (key) => (
      <span>
        <Link to={`/submissions/${key}`}>Detalhes</Link>
      </span>
    )
  },
]

const SubmissionsList = () => {
  const [api, setApi] = useState([])

  const environment = 'http://localhost:3001';

  useEffect(() => {
    fetch(`${environment}/lectures`)
      .then(res => res.json())
      .then(data => {
        setApi(data)
      })
      .catch(err => console.error(err, 'Nenhuma palestra por aqui!'))
  }, [])

  return (
    <Row style={{ marginBottom: 30 }}>
      <Col span={16} offset={4}>
        <div style={{ marginTop: '30px' }}>
          <h1>Submissões</h1>
          <Table columns={columnsTable} dataSource={api} rowKey='id' onFilter />
        </div>
      </Col>
    </Row>
  )
}

export default SubmissionsList
