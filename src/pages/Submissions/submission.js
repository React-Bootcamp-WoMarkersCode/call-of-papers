import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { Row, Col, Button, Divider, Descriptions, Carousel, Space, Typography, Avatar, Tag, Spin } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhoneAlt, faUser } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faLinkedin, faTwitter, faInstagram, faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons"
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import './style.scss'
import Email from '../../utils/Email/Email'

const { Item } = Descriptions
const { Title } = Typography

const SubmissionInAnalysis = () => {
  let { eventId } = useParams()
  const [lecturesPending, setLecturesPending] = useState([])
  const slider = useRef()
  const [desabilitado, setDesabilitado] = useState(false)
  const environment = 'http://localhost:3001'

  useEffect(() => {
    fetch(`${environment}/lectures`)
      .then(res => res.json())
      .then(lectures => {
        let filter = lectures.filter(lecture => lecture.eventId === eventId && lecture.status === 'EM ANÁLISE')
        setLecturesPending(filter)
      })
      .catch(err => console.error(err, 'Nenhuma palestra por aqui!'))
  }, [environment, eventId])
  
  const aproved = (item) => {
    item.status = 'APROVADA'
    setDesabilitado(true)
    let message =
        `<p>Olá ${item.name}, tudo bem?</p>
        <p>Parabéns! A palestra "${item.activityTitle}" foi aprovada. Consulte mais informações no site.</p>
        <p><i>Sharing Talks</i></p>`
    submitEvaluation(item, message)
  }
  const reproved = (item) => {
    item.status = 'REPROVADA'
    setDesabilitado(true)
    let message =
        `<p>Olá ${item.name}, tudo bem?</p>
        <p>Parabéns! A palestra "${item.activityTitle}" foi reprovada. Consulte mais informações no site.</p>
        <p><i>Sharing Talks</i></p>`
    submitEvaluation(item, message)
  }
  function submitEvaluation(payload, message) {

    fetch(`${environment}/lectures/${payload.id}`, {
      method: 'put',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(payload)
    })
    let filter = lecturesPending.filter(lecture => lecture.id !== payload.id)
    setLecturesPending(filter)
    setDesabilitado(false)
    //window.location.reload();
    Email(payload.name, payload.email, message)
  }
  const settings = {
    dots: false,
    fade: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    accessibility: false
  };

  return (
    <>
      <Row gutter={[16, 24]}>
        <Divider orientation="left">
          Palestras pendentes de aprovação
        </Divider>
      </Row>
      <Row justify='end'>
        <Col span={8}>
          <Space>
            <Button onClick={() => slider.current.prev()}><LeftOutlined /></Button>
            <Button onClick={() => slider.current.next()}><RightOutlined /></Button>
          </Space>
        </Col>
      </Row>
      {
        lecturesPending.length > 0 ?
      <Carousel
        style={{marginBottom:'20px'}}
        {...settings}
        ref={ref => {
          slider.current = ref
        }}
      >
        {lecturesPending.map((item) => {
          return (
            <div key={item.id}>
              <Row justify='start' style={{ marginLeft: '350px' }}>
                <Title level={4}>
                  Palestrante
                </Title>
              </Row>
              <Row justify='center' style={{ marginBottom: '2em' }}>
                <Col span={5}>
                  <Space direction='vertical'>
                    <Space>
                      {
                        item.uploadedImage ?
                          <Avatar size={50} src={item.uploadedImage} />
                          :
                          <Avatar size={50}> <FontAwesomeIcon icon={faUser} /></Avatar>
                      }
                      <Item>
                        {item.name ? `${item.name}` : 'Sem dados'}
                      </Item>
                    </Space>
                    <Space direction='horizontal'>
                      <FontAwesomeIcon icon={faPhoneAlt} />
                      <Item label="Telefone" span={3}>
                        {item.cellphone ? `${item.cellphone}` : 'Sem dados'}
                      </Item>
                    </Space>
                    <Space direction='horizontal'>
                      <FontAwesomeIcon icon={faEnvelope} />
                      <Item label="E-mail" span={3} style={{ wordBreak: 'break-word' }}>
                        {item.email ? `${item.email}` : 'Sem dados'}
                      </Item>
                    </Space>
                    <Item justify='center'>
                      {
                        item.haveLecturedBefore === "Não"
                          ?
                          <Tag style={{ marginBottom: '8px' }} key='nao'>Primeira palestra</Tag>
                          :
                          <Tag style={{ marginBottom: '8px' }} key='sim'>Já palestrou</Tag>
                      }
                    </Item>
                  </Space>
                </Col>
                <Divider type='vertical' style={{ height: 'auto', border: '1px solid' }} orientation='center'/>
                <Col span={7}>
                  <Descriptions>
                    <Item span={3} style={{ textAlign: 'justify' }}>
                      {item.miniBio ? `${item.miniBio}` : 'Sem dados'}
                    </Item>
                    <Item >
                      <Space direction='horizontal' style={{ fontSize: '1.75em' }}>
                        {item.facebookLink ?
                          <a href={`${item.facebookLink}`}><FontAwesomeIcon icon={faFacebook} /> </a>
                          : <FontAwesomeIcon icon={faFacebook} />}
                        {item.linkedinLink ?
                          <a href={`${item.linkedinLink}`}><FontAwesomeIcon icon={faLinkedin} /></a>
                          : <FontAwesomeIcon icon={faLinkedin} />}
                        {item.githubLink ?
                          <a href={`${item.githubLink}`}><FontAwesomeIcon icon={faGithub} /></a>
                          : <FontAwesomeIcon icon={faGithub} />}
                        {item.twitter ?
                          <a href={`${item.twitter}`}><FontAwesomeIcon icon={faTwitter} /></a>
                          : <FontAwesomeIcon icon={faTwitter} />}
                        {item.instagram ?
                          <a href={`${item.instagram}`}><FontAwesomeIcon icon={faInstagram} /></a>
                          : <FontAwesomeIcon icon={faInstagram} />}
                        {item.youtube ?
                          <a href={`${item.youtube}`}><FontAwesomeIcon icon={faYoutube} /></a>
                          : <FontAwesomeIcon icon={faYoutube} />}
                      </Space>
                    </Item>
                  </Descriptions>
                </Col>
              </Row>
              <Row justify='start' style={{ marginLeft: '350px' }}>
                <Title level={4}>
                  Atividade
                </Title>
              </Row>
              <Row justify='center' >
                <Col span={12}>
                  <Descriptions layout="vertical" title={item.activityTitle} type='secundary' style={{ textAlign: 'justify' }}>
                    <Item span={3}>
                      {item.activityDescription ? `${item.activityDescription}` : 'Sem dados'}
                    </Item>
                    <Item>
                      <Tag style={{ marginBottom: '8px' }} key='tipo-atividade'>{item.activityType}</Tag>
                      {item.activityCategory ? item.activityCategory.map(category => <Tag style={{ marginBottom: '8px' }} key={category}>{category}</Tag>) : ''}
                    </Item>
                  </Descriptions>
                </Col>
              </Row>
              <Row justify='end'>
                <Col span={10}>
                  <Space>
                    <Button value="REPROVADA" className='button-reprovado' onClick={() => reproved(item)} disabled={desabilitado}>REPROVAR</Button>
                    <Button value="APROVADA"  type='primary' onClick={() => aproved(item)} disabled={desabilitado} >APROVAR</Button>
                  </Space>
                </Col>
              </Row>
            </div>
          )
        })
        }
      </Carousel>
      :
      <Row>
        <Descriptions title='Não existe palestras pendendes de aprovação!' style={{padding:'50px', fontSize:'20px', fontWeight:'bold', textAlign:'center'}}>
        </Descriptions>
      </Row>
        
    }
    </>
  )
}

export default SubmissionInAnalysis
