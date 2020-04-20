import React, { useState, useEffect } from 'react'
import { Row, Divider, Button, Card } from 'antd'
import { Link } from 'react-router-dom'
import TableComponent from '../../components/Table'
import './events-list.scss'

import { getEnvironment } from './../../utils/environment'

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
        <Link to={`/events/${key}`} onClick={() => localStorage.setItem("idEvent", key)}>Detalhes</Link>
      </span>
    )
  }, {
    dataIndex: 'id',
    key: 'id',
    render: (key) => (
      <span>
        <Link to={`/events/form/${key}`} onClick={() => localStorage.setItem("idEvent", key)}>Editar</Link>
      </span>
    )
  },
]
const EventsList = () => {
  const [api, setApi] = useState([])

  const environment = getEnvironment();

  useEffect(() => {
    fetch(`${environment}/events?_limit=15&_page=1&userId=${localStorage.getItem("userId")}`)
      .then(res => res.json())
      .then(data => {
        setApi(data)
      })
      .catch(err => console.error(err, 'Nenhum evento por aqui!'))
  }, [environment])

  return (
    <>
      <Row gutter={[16, 24]}>
        <Divider orientation='left'>
          Meus eventos
  </Divider>
      </Row>
      {api.length > 0 ? (
        <>
          <Row justify="end" className='row-table'>
            <Button type='default'>
              <Link id="btn-cadastrar" to="/events/form" onClick={() => localStorage.removeItem('idEvent')}><span>Cadastre um evento!</span></Link>
            </Button>
          </Row>
          <Row justify='center' gutter={[16, 24]} className='row-table'>
            <TableComponent columns={columnsTable} dataSource={api} />
          </Row></>)
        : (
          <Row justify="center" className='row-table'>
            <Card style={{ width: '90%' }}><p>Você ainda não cadastrou nenhum evento</p></Card>
          </Row>)
      }
    </>
  )
}

export default EventsList
