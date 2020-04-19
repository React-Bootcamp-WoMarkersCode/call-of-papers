import React, { useEffect, useState } from 'react'
import { Row, Divider, Card, Space, Typography, Col} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import CardEvent from './CardEvent'
import { getEnvironment } from './../../utils/environment'
import './style.scss'

const { Text } = Typography;

const callProducer = [
  {
    description: 'Cadastre eventos da sua comunidade',
  },
  {
    description: 'Seja encontrado pelos palestrantes',
  },
  {
    description: 'Gerencie facilmente os eventos, as palestras submetidas e aprovadas',
  },
  {
    description: 'Adicione o Call of Papers no site do seu evento',
  },
];

const callSpeaker = [
  {
    description: 'Encontre eventos na sua cidade para palestrar',
  },
  {
    description: 'Submeta sua palestra',
  },
  {
    description: 'Acompanhe o status das palestras submetidas',
  },
  {
    description: 'Faça a diferença na sua comunidade',
  },
];

const Home = () => {
  const [events, setEvents] = useState([])

  const environment = getEnvironment();

  useEffect(() => {
    fetch(`${environment}/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(data)
      })
      .catch(err => console.error(err, 'Nenhum evento por aqui!'))
  }, [])

  return (
    <>
      <div style={{ height: '85%', overflow: 'hidden', opacity: 0.8 }}>
        <img style={{ width: '100vw' }} src={require('../../assets/banner.png')} alt='Produtor de evento' />
      </div>
      <div>

      </div>
      <Row gutter={[16, 24]}>
        <Divider orientation="left" style={{ marginTop: '3rem'}}>
          SHARING TALKS PARA PRODUTORES DE EVENTO
        </Divider>
        <Card style={{ width: '100%' }} className="content-padding">
          <Row justify="space-between">
            <img style={{ width: 400, maxWidth: '100%' }} src={require('../../assets/events-producer.png')} alt='Produtor de evento' />
            <Space direction="vertical" style={{ justifyContent: 'space-evenly' }}>
              {callProducer.map(item => {
                return (
                  <div key={item.description}>
                    <FontAwesomeIcon style={{ fontSize: 24 }} icon={faCheck} className="check-icon" />
                    <Text style={{ fontSize: 24 }}>{item.description}</Text>
                  </div>
                )
              })}
            </Space>
          </Row>
        </Card>
        <Divider orientation="left" style={{ marginTop: '3rem'}}>
          SHARING TALKS PARA PALESTRANTES
        </Divider>
        <Card style={{ width: '100%' }} className="content-padding">
          <Row justify="space-between">
            <Space direction="vertical" style={{ justifyContent: 'space-evenly' }}>
              {callSpeaker.map(item => {
                return (
                  <div key={item.description}>
                    <FontAwesomeIcon style={{ fontSize: 24 }} icon={faCheck} className="check-icon" />
                    <Text style={{ fontSize: 24 }}>{item.description}</Text>
                  </div>
                )
              })}
            </Space>
            <img style={{ width: 400, maxWidth: '100%' }} src={require('../../assets/speaker.png')} alt='Produtor de evento' />
          </Row>
        </Card>
        <Divider orientation="left">
          EVENTOS EM DESTAQUE
        </Divider>
      </Row>
      <Row gutter={[16, 24]} className="content-padding">
        {events.map((event) => {
          return (
            <Col key={event.id} xs={24} xl={6}>
              <CardEvent event={event} />
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default Home
