import React, { useState, useEffect } from 'react'
import { Row, Divider } from 'antd'
import { Link } from 'react-router-dom'
import TableComponent from '../../components/Table'
import './events-list.scss'

const columnsTable = [
  {
    title: 'Data/Horário',
    dataIndex: 'schedule',
    key: 'schedule',
    width: '20%'
  },
  {
    title: 'Evento',
    dataIndex: 'event',
    key: 'event',
    width: '40%',
    className: 'title-cell'
  },
  {
    title: 'Local',
    dataIndex: 'local',
    key: 'local',
    width: '25%'
  },
  {
    dataIndex: 'id',
    key: 'id',
    render: (key) => (
      <span>
        <Link to={`/events/${key}`} onClick={() => localStorage.setItem("idEvent", key)}>Mais detalhes</Link>
      </span>
    )
  },
]
const EventsList = () => {
  const [api, setApi] = useState([])

  const environment = 'http://localhost:3001';

  useEffect(() => {
    fetch(`${environment}/events?_limit=15&_page=1`)
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
          <Link id="btn-cadastrar" to="/events/form" onClick={() => localStorage.removeItem('idEvent')}>Cadastre um evento</Link>
        </Divider>
      </Row>
      <Row justify='center' gutter={[16, 24]} className='row-table'>
        <TableComponent columns={columnsTable} dataSource={api} />
      </Row>
    </>
  )
}

export default EventsList
