import React, { useState, useEffect } from 'react'
import { Row, Col, Table } from 'antd'
import { Link } from 'react-router-dom'

import "./events-list.scss"

const columnsTable = [
  {
    title: 'Data/Horário',
    dataIndex: 'schedule',
    key: 'schedule'
  },
  {
    title: 'Eventos',
    dataIndex: 'event',
    key: 'event'
  },
  {
    title: 'Local',
    dataIndex: 'local',
    key: 'local'
  },
  {
    dataIndex: 'id',
    key: 'id',
    render: (key) => (
      <span>
        <Link to={`/events/${key}`}>Detalhes</Link>
      </span>
    )
  },
]

const EventsList = () => {
  const [api, setApi] = useState([])

  const environment = 'http://localhost:3001';

  useEffect(() => {
    fetch(`${environment}/events`)
      .then(res => res.json())
      .then(data => {
        setApi(data)
      })
      .catch(err => console.error(err, 'Nenhum evento por aqui!'))
  }, [])

  return (
    <Row style={{ marginBottom: 30 }}>
      <Col span={16} offset={4}>
        <div className="content-events">
          <Row style={{ marginBottom: 20 }}>
            <Col span={20}>
              <h1>Meus eventos</h1>
            </Col>
            <Col span={4}>
              <Link type="primary" to="/events/form">Cadastre um evento</Link>
            </Col>
          </Row>
          <Table columns={columnsTable} dataSource={api} rowKey='id' />
        </div>
      </Col>
    </Row>
  )
}

export default EventsList
