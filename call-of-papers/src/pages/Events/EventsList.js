import React, { useState, useEffect } from 'react'
import { Row, Table, Divider } from 'antd'
import { Link } from 'react-router-dom'
import './events-list.scss'

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
        <Link to={`/events/${key}`}>Mais detalhes</Link>
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
    <>
      <Row gutter={[16, 24]}>
        <Divider orientation='left'>
          Meus eventos
        </Divider>
      </Row>
      <Row justify='center' gutter={[16, 24]}>
        <Table
          columns={columnsTable}
          dataSource={api}
          rowKey='id'
          size='middle'
          pagination={{ pageSize: 10 }} />
      </Row>
    </>
  )
}

export default EventsList
