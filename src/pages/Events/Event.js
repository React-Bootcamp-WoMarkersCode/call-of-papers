import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Row, Col, Card, Divider, Tag, Button, Descriptions } from 'antd'
import { Link } from 'react-router-dom'
import { getEnvironment } from './../../utils/environment'
import "./event.scss";

const { Item } = Descriptions

const Event = () => {
  const [api, setApi] = useState([])

  let { eventId } = useParams()

  const { event, schedule, description, organizer, local, partners, categories, tickets, limited_spaces } = api

  const environment = getEnvironment();

  useEffect(() => {
    fetch(`${environment}/events/${eventId}`)
      .then(res => res.json())
      .then(data => {
        setApi(data)
      })
      .catch(err => console.error(err, 'Nenhum evento por aqui!'))
  }, [environment, eventId])

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

              <Descriptions layout='vertical' style={{ textAlign: 'justify' }}>
                <Item label='Descrição' span={3}>
                  {description}
                </Item>
                <Item label='Categorias' span={3}>
                  {categories && categories.length === 0 ? 'Sem informações' :
                    <>
                      {categories && categories.map((category) => {
                        return(<Tag style={{ marginBottom: '8px' }} key={category}>{category}</Tag>)
                      })}
                    </>
                  }
                </Item>
                <Item label='Parceiros aceitos' span={3}>
                  {(partners && partners.length === 0) || ((partners && partners.includes("Nao"))) ?
                    'Não aceita parceiros'
                      :
                    <>
                      {partners && partners.map((partner) => {
                        return(<Tag style={{ marginBottom: '8px' }} key={partner}>{partner}</Tag>)
                      })}
                    </>
                  }
                </Item>
                {(partners && partners.includes("Nao")) ? <></> :
                  (<Item span={3}>
                    <Button type='primary'>
                      <Link to={`/partners/${eventId}`}><span>Seja um parceiro</span></Link>
                    </Button>
                  </Item>)
                }
              </Descriptions>
            </Col>
            <Col span={8} style={{textAlign: 'center'}}>
              <Button type='primary'>
                <Link id="btn-cadastrar" to={`/lectures/form/${eventId}`}><span>Submeta uma atividade para este evento!</span></Link>
              </Button>
              {
                organizer ?
                  <Card className="mt-15">
                    <i style={{ textSize: 10 }}>
                      <div>
                        <b>Organizador(a):</b>
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
                <p>
                  <small>Espaço limitado?</small>
                  <br />
                  {
                    limited_spaces === true ? <strong>Sim</strong> : <strong>Não</strong>

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

    </>
  )
}

export default Event
