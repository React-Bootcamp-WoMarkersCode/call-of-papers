import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Row, Col, Card } from 'antd'

import "./event.scss";

const Event = () => {
  const [api, setApi] = useState([])

  let { eventId } = useParams()

  const { event, schedule, description, organizer, local } = api

  const environment = 'http://localhost:3001';

  useEffect(() => {
    fetch(`${environment}/events/${eventId}`)
      .then(res => res.json())
      .then(data => {
        setApi(data)
      })
      .catch(err => console.error(err, 'Nenhum evento por aqui!'))
  }, [])

  return (
    <>
      <Row>
        {/* Banner */}
        <Col span={24}>
          <div className="content-banner">
            <Col span={17} offset={3}>
              <Card bordered={false}
                hoverable
                style={{ width: '100%' }}
                cover={
                  <img alt="banner-event"
                    src="https://secure.meetupstatic.com/photos/event/7/5/f/3/highres_489930195.jpeg"
                  />
                }
              >
              </Card>
            </Col>
          </div>
        </Col>
      </Row>

      {/* Descrição  */}
      <Row className="content-detalhe">
        <Col span={16} offset={4}>
          <Row>
            <Col span={16} className="pr-50">
              <div className="title">
                <span>{schedule}</span>
                <h1>{event}</h1>
                <small>Código do evento: {eventId}</small>
              </div>
              <div className="mt-30">
                <h2 style={{ fontWeight: 300 }}>Detalhes do evento</h2>
                <p>{description}</p>
              </div>
            </Col>
            <Col span={8}>
              <Card className="mt-15">
                <span>
                  <small>Comunidade</small>
                  <br />
                  <b>WoMakersCode</b>
                </span>
                <br />
                <i style={{ textSize: 10 }}>
                  Organizador(a)
              <span> {organizer}</span>
                </i>
              </Card>
              <Card className="mt-15">
                <p>
                  <small>Data/Horário</small>
                  <br />
                  <b>{schedule}</b>
                </p>
                <p>
                  <small>Local</small>
                  <br />
                  <a href="#">{local}</a>
                </p>
              </Card>
              <Card className="mt-15">
                <small>Ingressos</small>
                <br />
                <b>Grátis</b>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Patrocinadores */}
      <Row className="content-partner">
        <Col span={16} offset={4}>
          <Row>
            <Col span={16} className="pr-50">
              <div className="mt-10">
                <h2 style={{ fontWeight: 300 }}>Patrocinadores do evento</h2>
                <Card
                  hoverable
                  style={{ width: 150 }}
                  cover={<img alt="example" src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Stone_pagamentos.png" />}
                >
                </Card>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Event
