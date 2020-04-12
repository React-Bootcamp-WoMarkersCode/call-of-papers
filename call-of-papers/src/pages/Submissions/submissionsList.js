import React, { useState, useEffect } from 'react'
import { Row, Col, Table } from 'antd'
import { Link } from 'react-router-dom'


const columnsTable = [
  {
    title: 'Palestra',
    dataIndex: 'lecture',
    key: 'lecture'
  },
  {
    title: 'Descrição',
    dataIndex: 'description',
    key: 'event'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
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
        <div style={{marginTop:'30px'}}>
          <h1>Submissões</h1>
          <Table columns={columnsTable} dataSource={api} rowKey='id' />
        </div>
      </Col>
    </Row>
  )
}

export default SubmissionsList
