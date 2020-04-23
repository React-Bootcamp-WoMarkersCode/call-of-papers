import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import { Row, Col, Tag, Button, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { getEnvironment } from './../../utils/environment'
import "./event.scss";

const environment = getEnvironment()

const getUserIsOwner = (userId) => {
  const userIdLogged = localStorage.getItem('userId')
  return String(userId) === String(userIdLogged)
}

const Event = () => {
  const [ event, setEvent ] = useState({})
  const [ isOwnerEvent, setIsOwnerEvent ] = useState(false)
  const { eventId } = useParams()
  const history = useHistory()

  const copyToCliboard = () => {
    // https://stackoverflow.com/questions/49618618/copy-current-url-to-clipboard
    var dummy = document.createElement('input'),
    text = window.location.href

    document.body.appendChild(dummy)
    dummy.value = text
    dummy.select()
    document.execCommand('copy')
    document.body.removeChild(dummy)
  }

  useEffect(() => {
    fetch(`${environment}/events/${eventId}`)
      .then(res => res.json())
      .then(data => setEvent(data))
      .catch(err => console.error(err, 'Nenhum evento por aqui!'))
  }, [eventId])

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
            <Col span={6}>
              <Space direction="vertical">
                <span>Organizado por {event.organizer}</span>
                <img src="https://www.4devs.com.br/4devs_gerador_imagem.php?acao=gerar_imagem&txt_largura=203&txt_altura=149&extensao=png&fundo_r=0.7209085375070572&fundo_g=0.7467041015625&fundo_b=0.7456202543332797&texto_r=0&texto_g=0&texto_b=0&texto=Foto&tamanho_fonte=10" alt=""/>
                <Button type="link" onClick={() => copyToCliboard()} style={{ padding: 0 }}>
                  <FontAwesomeIcon icon={faLink} />Copiar link para Call of Papers
                </Button>
              </Space>
            </Col>
            <Col span={18}>
              <Space direction="vertical" style={{ width: '100%', height: '100%', justifyContent: 'space-between'}}>
                <Space direction="vertical" size={5} style={{ width: '100%'}}>
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
                  </Row>
                  <Row>
                    {event.description}
                  </Row>
                </Space>
                <Row style={{ alignSelf: 'end'}}>
                  {
                    event.categories && event.categories.map(categorie => (
                      <Tag key={categorie}>{categorie}</Tag>
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
