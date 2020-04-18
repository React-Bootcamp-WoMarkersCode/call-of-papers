import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Row, Col, Card, Divider } from 'antd'
import { Link } from 'react-router-dom'

import { getEnvironment } from './../../utils/environment'

import "./event.scss";

const Event = () => {
  const [api, setApi] = useState([])

  let { eventId } = useParams()

  const { event, schedule, description, organizer, local, partners, tickets } = api

  const environment = getEnvironment();

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
      <Row gutter={[16, 24]}>
        <Divider orientation='left'>
          {event}
        </Divider>
      </Row>
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
