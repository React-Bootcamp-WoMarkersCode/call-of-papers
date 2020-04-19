import React, { useEffect, useState } from 'react'
import { Row, Divider, Card, Space, Typography, Col } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import CardEvent from './CardEvent'
import { getEnvironment } from './../../utils/environment'
import './style.scss'

import woman from "../../assets/home/woman.jpg";

const { Text, Title } = Typography;

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
      {!localStorage.getItem('userId') && (
        <>
          <div style={{ position: 'relative', height: '85%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img style={{ opacity: 0.6, width: '100%' }} src={require('../../assets/home/banner-1.jpg')} alt='Produtor de evento' />
          </div>
          {/* Melhores eventos */}
          <Row gutter={[16, 24]} className="events-content">
            <Divider orientation="left">
              Encontre os melhores eventos
        </Divider>
            <div className="home-card">
              <div className="card-content">
                <div class="card-img">
                  <img src={require('../../assets/home/student-1.jpg')} alt="" />
                </div>
                <span>Aprender</span>
              </div>
              <div className="card-content">
                <div class="card-img">
                  <img src={require("../../assets/home/people-1.jpg")} alt="" />
                </div>
                <span>Workshops</span>
              </div>
              <div className="card-content">
                <div class="card-img">
                  <img src={require("../../assets/home/bootcamps-2.jpg")} alt="" />
                </div>
                <span>Bootcamps</span>
              </div>
              <div className="card-content">
                <div class="card-img">
                  <img src={require("../../assets/home/young.jpg")} alt="" />
                </div>
                <span>Meetups</span>
              </div>
              <div className="card-content">
                <div class="card-img">
                  <img src={require("../../assets/home/online.jpg")} alt="" />
                </div>
                <span>Eventos Online</span>
              </div>
              <div className="card-content">
                <div class="card-img">
                  <img src={require("../../assets/home/events.jpg")} alt="" />
                </div>
                <span>Eventos Tecnologia</span>
              </div>

            </div>
          </Row>
          <Row gutter={[16, 24]} style={{ backgroundColor: '#f8f8f8', paddingBottom: '3rem' }}>
            <Divider orientation="center" style={{ marginTop: '3rem' }}>
              <p>Sharing Talks para produtores de eventos</p>
            </Divider>
            <Card style={{ width: '100%', border: 'none', boxShadow: 'none', backgroundColor: '#f8f8f8' }} className="content-padding">
              <Row justify="space-between" style={{display: 'flex', justifyContent: 'space-evenly', alignContent: 'center'}}>
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

          <Row gutter={[16, 24]}>
            <Divider orientation="left" style={{ marginTop: '3rem' }}>
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
          </Row>
        </>
      )}
      <Divider orientation="left">
        EVENTOS EM DESTAQUE
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
    </>
  )
}

export default Home
