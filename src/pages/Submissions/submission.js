import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { Row, Col, Select, Button, Divider, Descriptions, Spin, Carousel } from 'antd'
import { FolderOutlined, LinkedinOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import './style.scss'
import Email from '../../utils/Email/Email'
import { FALSE } from 'node-sass'

const { Option } = Select
const { Item } = Descriptions

const Submission = () => {
  let { eventId } = useParams()
  const [lecturesPending, setLecturesPending] = useState([])
  const [status, setStatus] = useState('')
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
  }, [])

  function handleChange(value) {
    setStatus(value)
  }

  function submitEvaluation(payload) {
    payload.status = status

    setDesabilitado(true)

  	fetch(`${environment}/lectures/${payload.id}`, {
  		method: 'put',
  		headers: {
  			Accept: "application/json",
  			"Content-Type": "application/json",
  			'Access-Control-Allow-Origin': '*'
  		},
  		body: JSON.stringify(payload)
    })

    let message = ''

    if (payload.status === 'APROVADA') {
      message =
        `<p>Olá ${payload.name}, tudo bem?</p>
        <p>Parabéns! A palestra "${payload.activityTitle}" foi aprovada. Consulte mais informações no site.</p>
        <p><i>Sharing Talks</i></p>`
    } else {
      message =
        `<p>Olá ${payload.name}, tudo bem?</p>
        <p>Infelizmente a palestra "${payload.activityTitle}" foi reprovada. Consulte mais informações no site.</p>
        <p><i>Sharing Talks</i></p>`
    }
    console.log(payload.email)
    Email(payload.name, payload.email, message)
    alert(`Palestra ${payload.status.toLowerCase()}!`)
    slider.current.next()
    setStatus('')
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
          Avaliação de Atividade
        </Divider>
      </Row>
      <Row justify='end'>
        <Col span={5}>
          <Button onClick={() => slider.current.prev()}><LeftOutlined /></Button>
          <Button onClick={() => slider.current.next()}><RightOutlined /></Button>
        </Col>
      </Row>
      <Carousel
        {...settings}
        ref={ref => {
          slider.current = ref
        }}
      >
        {lecturesPending.map((item) => {
          return (
            <div key={item.id}>
              <Row justify='center' style={{ marginBottom: '2em' }}>
                <Col span={4}>
                  <Descriptions layout="vertical" style={{textAlign:'justify'}}>
                    <Item label="Palestrante" span={3}>
                      {item.name? `${item.name}` : 'Sem dados'}
                    </Item>
                    <Item label="Telefone" span={3}>
                      {item.cellphone? `${item.cellphone}` : 'Sem dados'}
                    </Item>
                    <Item label="E-mail" span={3} style={{wordBreak: 'break-word'}}>
                      {item.email? `${item.email}` : 'Sem dados'}
                    </Item>
                    <Item label="Mini biografia" span={3}>
                      {item.miniBio? `${item.miniBio}` : 'Sem dados'}
                    </Item>
                    <Item>
                      {item.linkedin ?
                        <a href={`${item.linkedin}`}><LinkedinOutlined className="social-network" /></a>
                        : <LinkedinOutlined className="social-network" />}
                      {item.facebook ?
                        <a href={`${item.facebook}`}><FacebookOutlined className="social-network" /></a>
                        : <FacebookOutlined className="social-network" />}
                      {item.twitter ?
                        <a href={`${item.twitter}`}><TwitterOutlined className="social-network" /></a>
                        : <TwitterOutlined className="social-network" />}
                      {item.instagram ?
                        <a href={`${item.instagram}`}><InstagramOutlined className="social-network" /></a>
                        : <InstagramOutlined className="social-network" />}
                      {item.youtube ?
                        <a href={`${item.youtube}`}><YoutubeOutlined className="social-network" /></a>
                        : <YoutubeOutlined className="social-network" />}
                      {item.portfolio ?
                        <a href={`${item.portfolio}`}><FolderOutlined className="social-network" /></a>
                        : <FolderOutlined className="social-network" />}
                    </Item>
                  </Descriptions>
                </Col>
                <Col span={12}>
                  <Descriptions layout="vertical" title={item.activityTitle} style={{textAlign:'justify'}}>
                    <Item label="Descrição" span={3}>
                      {item.activityDescription? `${item.activityDescription}` : 'Sem dados'}
                    </Item>
                    <Item label="Tipo" span={1}>
                      {item.activityType ? `${(item.activityType)}` : 'Sem dados'}
                    </Item>
                    <Item label="Já palestrou?" span={2}>
                      {item.haveLecturedBefore ? `${(item.haveLecturedBefore)}` : 'Sem dados'}
                    </Item>
                    <Item label="Categorias" span={3}>
                      {item.activityCategory ? `${(item.activityCategory)} e ${(item.activityCategory)}` : 'Sem dados'}
                    </Item>
                    <Item label="Avaliação" span={3}>
                      { item.length !== 0 ?
                        <Select
                          style={{ width: 150, textTransform: 'uppercase' }}
                          value={status}
                          onChange={handleChange}
                        >
                          <Option value="APROVADA">APROVADA</Option>
                          <Option value="REPROVADA">REPROVADA</Option>
                        </Select>
                          :
                        <Spin size='large' />
                      }
                    </Item>
                    <Item span={3}>
                        <Button type='primary' onClick={submitEvaluation} disabled={desabilitado}>Enviar avaliação</Button>
                    </Item>
                  </Descriptions>
                </Col>
              </Row>
            </div>
          )
        })
        }
      </Carousel>
    </>
  )
}

export default Submission
