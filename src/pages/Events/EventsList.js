import React, { useState, useEffect } from 'react'
import { Row, Button, Card } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import TableComponent from '../../components/Table'
import './events-list.scss'

import { getEnvironment } from './../../utils/environment'
import Header from '../../components/Header'

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
  const history = useHistory()

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
      {api.length > 0 ? (
        <>
          <Header text="Meus eventos" />
          <Row justify="end" className='row-table'>
            <Button
              id="btn-cadastrar"
              type='default'
              className="btn-outline"
              onClick={() => {
                history.push('/events/form')
                localStorage.removeItem('idEvent')
              }}
            >
              Novo evento
            </Button>
          </Row>
          <Row justify='center' gutter={[16, 24]} className='row-table'>
            <TableComponent columns={columnsTable} dataSource={api} />
          </Row>
        </>
        ) : (
        <Row justify="center" className='empty-box'>
          <Card>
            <p>Você ainda não possui eventos!</p>
            <Button
              type='default'
              className='btn-outline'
              onClick={() => history.push('/events/form')}>
                Cadastrar um novo evento
            </Button>
          </Card>
        </Row>)
      }
    </>
  )
}

export default EventsList
