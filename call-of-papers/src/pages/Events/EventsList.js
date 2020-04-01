import React from 'react'
import { Row, Col, Table } from 'antd'
import { Link } from 'react-router-dom'

import { events } from './events-list-test'

import "./events-list.scss"

const columnsTable = [
  {
    title: 'Data/Horário',
    dataIndex: 'data',
    key: 'data'
  },
  {
    title: 'Eventos',
    dataIndex: 'evento',
    key: 'evento'
  },
  {
    title: 'Local',
    dataIndex: 'local',
    key: 'local'
  },
  {
    dataIndex: 'acao',
    key: 'acao',
    render: (text) => (
      <span>
        <Link to="/events/1">Detalhes</Link>
      </span>
    )
  },
]

const EventsList = () => {
  return (
    <Row style={{marginBottom: 30}}>
      <Col span={16} offset={4}>
        <div className="content-events">
          <h1>Meus eventos</h1>
          <Table columns={columnsTable} dataSource={events} />
        </div>
      </Col>
    </Row>
  )
}

export default EventsList
