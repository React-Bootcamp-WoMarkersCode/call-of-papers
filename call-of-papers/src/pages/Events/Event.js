import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Row, Col, Card } from 'antd'
import { Link } from 'react-router-dom'

import "./event.scss";

const Event = () => {
  const [api, setApi] = useState([])

  let { eventId } = useParams()

  const { event, schedule, description, organizer, local, partners, tickets } = api

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
      {/* <Row>
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
      </Row> */}

      {/* Descrição  */}
      <Row className="content-detalhe">
        <Col span={16} offset={4}>
          <Row>
            <Col span={16} className="pr-50">
              <div className="title">
                {
                  schedule ?
                    <span>{schedule}</span> : 'Nenhuma data ou horário informado'
                }
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
                <Link to="/events/form">Editar evento</Link>
              </Card>
              {
                organizer ?
                  <Card className="mt-15">
                    <i style={{ textSize: 10 }}>
                      <div>
                        Organizador(a)
                        <span> {organizer}</span>
                      </div>
                    </i>
                  </Card> : ''
              }
              <Card className="mt-15">
                <p>
                  <small>Data/Horário</small>
                  <br />
                  {
                    schedule ?
                      <b>{schedule}</b> : 'Nenhuma data ou horário informado'
                  }
                </p>
                <p>
                  <small>Local</small>
                  <br />
                  {
                    local ?
                      <Link to="">{local}</Link> : 'Nenhum local informado'
                  }
                </p>
              </Card>
              {
                tickets ?
                  <Card className="mt-15">
                    <small>Ingressos</small>
                    <br />
                    <b>Grátis</b>
                  </Card> : ''
              }
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
                {
                  partners ?
                    <div>
                      <h2 style={{ fontWeight: 300 }}>Aceita parceiros</h2>
                      <p>{partners}</p>
                    </div>
                    : ''
                }
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Event
