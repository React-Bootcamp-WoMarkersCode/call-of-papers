import React, { useEffect, useState } from 'react'
import { Row, Divider, Card, Space, Typography, Col } from 'antd'
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
  }, [environment])

  return (
    <div className="home-container">
      {!localStorage.getItem('userId') && (
        <>
          <div style={{ position: 'relative', height: '85%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img style={{ opacity: 0.6, width: '100%' }} src={require('../../assets/home/banner-1.jpg')} alt='Produtor de evento' />
          </div>
          <Row gutter={[16, 24]} style={{ backgroundColor: '#fff', paddingBottom: '3rem' }}>
            <Divider orientation="center" style={{ marginTop: '3rem' }} id="lectures">
              Sharing Talks para palestrantes
            </Divider>
            <Card style={{ width: '100%', border: 'none', boxShadow: 'none', }} className="content-padding">
              <Row justify="space-between" style={{ display: 'flex', justifyContent: 'space-evenly', alignContent: 'center' }}>
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
          </Row>
          <Row gutter={[16, 24]} style={{ backgroundColor: '#6597EB' }}>
            <p style={{ color: '#fff', fontSize: '30px', width: '100%', textAlign: 'center', padding: '50px 10px' }}>
              Ainda sem <b>palestrantes</b> para o seu evento? <br/> Veja abaixo 😉
            </p>
          </Row>
          <Row gutter={[16, 24]} style={{ backgroundColor: '#f8f8f8', paddingBottom: '3rem' }} id="events">
            <Divider orientation="center" style={{ marginTop: '3rem' }}>
              <p>Sharing Talks para produtores de eventos</p>
            </Divider>
            <Card style={{ width: '100%', border: 'none', boxShadow: 'none', backgroundColor: '#f8f8f8' }} className="content-padding">
              <Row justify="space-between" style={{ display: 'flex', justifyContent: 'space-evenly', alignContent: 'center' }}>
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
          </Row>
        </>
      )}
      {/* Melhores eventos */}
      <Row gutter={[16, 24]} id="highlights">
        <Divider orientation="left">
          Categorias em destaque
        </Divider>
        <div className="home-card">
          <div className="card-content">
            <div className="card-img">
              <img src={require('../../assets/home/student-1.jpg')} alt="" />
            </div>
            <span>Aprender</span>
          </div>
          <div className="card-content">
            <div className="card-img">
              <img src={require("../../assets/home/people-1.jpg")} alt="" />
            </div>
            <span>Workshops</span>
          </div>
          <div className="card-content">
            <div className="card-img">
              <img src={require("../../assets/home/bootcamps-2.jpg")} alt="" />
            </div>
            <span>Bootcamps</span>
          </div>
          <div className="card-content">
            <div className="card-img">
              <img src={require("../../assets/home/young.jpg")} alt="" />
            </div>
            <span>Meetups</span>
          </div>
          <div className="card-content">
            <div className="card-img">
              <img src={require("../../assets/home/online.jpg")} alt="" />
            </div>
            <span>Eventos Online</span>
          </div>
          <div className="card-content">
            <div className="card-img">
              <img src={require("../../assets/home/events.jpg")} alt="" />
            </div>
            <span>Eventos Tecnologia</span>
          </div>

        </div>
      </Row>
      <Divider orientation="left">
        Eventos em destaque
      </Divider>
      <Row gutter={[16, 24]} className="content-padding">
        {events.map((event) => {
          return (
            <Col key={event.id} xs={24} sm={12} lg={6}>
              <CardEvent event={event} />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default Home