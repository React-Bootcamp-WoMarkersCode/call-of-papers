import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import { Row, Col, Tag, Button, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { getUserIsOwner } from './../../utils/getUserIsOwner '
import { copyToCliboard } from '../../utils/copyToCliboard'
import "./event.scss";

const Event = ({ event }) => {

  const [ isOwnerEvent, setIsOwnerEvent ] = useState(false)
  const { eventId } = useParams()
  const history = useHistory()

  useEffect(() => {
    setIsOwnerEvent(getUserIsOwner(event.userId))
  }, [event.userId])

  return (
    !event ? (
      ''
    ) : (
        <Row style={{ marginTop: '3rem' }}>
          <Col span={16} offset={4}>
            <Row>
              <Col span={6} style={{marginRight:'4.167%'}}>
                <Space direction="vertical" style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}>
                  <span>Organizado por {event.organizer}</span>
                  <img src={event.uploadedImage} alt="" width="100%" />
                  <Button type="link" onClick={() => copyToCliboard()} style={{ padding: 0 }}>
                    <FontAwesomeIcon icon={faLink} />Copiar link para Call of Papers
                </Button>
                </Space>
              </Col>
              <Col span={17}>
                <Space direction="vertical" style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}>
                  <Space direction="vertical" size={5} style={{ width: '100%' }}>
                    <Row justify="space-between">
                      <h2>{event.event}</h2>
                      {localStorage.getItem('userId') ?
                        <Button
                          type='default'
                          className="btn-outline"
                          onClick={() => history.push(isOwnerEvent ? `/events/form/${eventId}` : `/lectures/form/${eventId}`)}>
                          {isOwnerEvent ? 'Editar' : 'Submeta sua palestra'}
                        </Button>
                        :
                        <Button
                          type='default'
                          className="btn-outline"
                          onClick={() => history.push(`/login/${eventId}`)}>
                          Submeta sua palestra
                      </Button>
                      }
                    </Row>
                    <Row justify="space-between">
                      <span>{event.local}</span>
                      <span>{event.schedule}</span>
                      <Button
                          type='default'
                          className="btn-outline"
                          onClick={() => history.push(`/partners/${eventId}`)}>
                          Ser parceiro
                      </Button>
                    </Row>
                    <Row style={{textAlign:'justify'}}>
                      {event.description}
                    </Row>
                  </Space>
                  <Row style={{ alignSelf: 'end' }}>
                    {
                      event.categories && event.categories.map(categorie => (
                        <Tag key={categorie}>{categorie}</Tag>
                      ))
                    }
                  </Row>
                  <Row style={{ alignSelf: 'end' }}>
                    {
                      event.partners && event.partners.map(partner => (
                        <Tag key={partner}>{partner}</Tag>
                      ))
                    }
                  </Row>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      )
  )
}

export default Event
