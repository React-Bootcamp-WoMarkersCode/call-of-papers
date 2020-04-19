import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { Row, Col, Select, Button, Divider, Descriptions, Spin, Carousel } from 'antd'
import { FolderOutlined, LinkedinOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import './style.scss'
import Email from '../../utils/Email/Email'

const { Option } = Select
const { Item } = Descriptions

const Submission = () => {
  let { submissionId } = useParams()
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
        {lecturesPending.map((lecturePending) => {
          return (
            <div key={lecturePending.id}>
              <Row justify='center' style={{ marginBottom: '2em' }}>
                <Col span={4}>
                  <Descriptions layout="vertical" style={{ textAlign: 'justify' }}>
                    <Item label="Palestrante" span={3}>
                      {lecturePending.name ? `${lecturePending.name}` : 'Sem dados'}
                    </Item>
                    <Item label="Telefone" span={3}>
                      {lecturePending.cellphone ? `${lecturePending.cellphone}` : 'Sem dados'}
                    </Item>
                    <Item label="E-mail" span={3} style={{ wordBreak: 'break-word' }}>
                      {lecturePending.email ? `${lecturePending.email}` : 'Sem dados'}
                    </Item>
                    <Item label="Mini biografia" span={3}>
                      {lecturePending.miniBio ? `${lecturePending.miniBio}` : 'Sem dados'}
                    </Item>
                    <Item>
                      {lecturePending.linkedin ?
                        <a href={`${lecturePending.linkedin}`}><LinkedinOutlined className="social-network" /></a>
                        : <LinkedinOutlined className="social-network" />}
                      {lecturePending.facebook ?
                        <a href={`${lecturePending.facebook}`}><FacebookOutlined className="social-network" /></a>
                        : <FacebookOutlined className="social-network" />}
                      {lecturePending.twitter ?
                        <a href={`${lecturePending.twitter}`}><TwitterOutlined className="social-network" /></a>
                        : <TwitterOutlined className="social-network" />}
                      {lecturePending.instagram ?
                        <a href={`${lecturePending.instagram}`}><InstagramOutlined className="social-network" /></a>
                        : <InstagramOutlined className="social-network" />}
                      {lecturePending.youtube ?
                        <a href={`${lecturePending.youtube}`}><YoutubeOutlined className="social-network" /></a>
                        : <YoutubeOutlined className="social-network" />}
                      {lecturePending.portfolio ?
                        <a href={`${lecturePending.portfolio}`}><FolderOutlined className="social-network" /></a>
                        : <FolderOutlined className="social-network" />}
                    </Item>
                  </Descriptions>
                </Col>
                <Col span={12}>
                  <Descriptions layout="vertical" title={lecturePending.activityTitle} style={{ textAlign: 'justify' }}>
                    <Item label="Descrição" span={3}>
                      {lecturePending.activityDescription ? `${lecturePending.activityDescription}` : 'Sem dados'}
                    </Item>
                    <Item label="Tipo" span={1}>
                      {lecturePending.activityType ? `${(lecturePending.activityType)}` : 'Sem dados'}
                    </Item>
                    <Item label="Já palestrou?" span={2}>
                      {lecturePending.haveLecturedBefore ? `${(lecturePending.haveLecturedBefore)}` : 'Sem dados'}
                    </Item>
                    <Item label="Categorias" span={3}>
                      {lecturePending.activityCategory ? `${(lecturePending.activityCategory)} e ${(lecturePending.activityCategory)}` : 'Sem dados'}
                    </Item>
                    <Item label="Avaliação" span={3}>
                      {lecturePending.length !== 0 ?
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
                      <Button type='primary' onClick={() => submitEvaluation(lecturePending)} disabled={desabilitado}>Enviar avaliação</Button>
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
