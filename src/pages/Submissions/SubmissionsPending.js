import React, { useState, useRef } from 'react'
import { Row, Col, Button, Carousel, Space } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import Email from '../../utils/Email/Email'
import Header from './../../components/Header'
import SubmissionInfo from './SubmissionInfo'
import './style.scss'

const settings = {
  dots: false,
  fade: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  accessibility: false
}

const environment = 'http://localhost:3001'

const SubmissionsPending = ({ lectures, handleUpdateLecture }) => {
  const [lecturesPending, setLecturesPending] = useState(lectures)
  const slider = useRef()
  const [desabilitado, setDesabilitado] = useState(false)

  const setStatus = (item, status) => {
    item.status = status
    setDesabilitado(true)
    let message = `
      <p>Olá ${item.name}, tudo bem?</p>
      <p>Parabéns! A palestra "${item.activityTitle}" foi ${status.toLowerCase()}. Consulte mais informações no site.</p>
      <p><i>Sharing Talks</i></p>
    `
    submitEvaluation(item, message)
    handleUpdateLecture()
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
    Email(payload.name, payload.email, message)
  }

  const footerCard = (item) => (
    <Row justify='end'>
      <Col style={{marginTop:'0'}}>
        <Space>
          <Button value="REPROVADA" className='button-reprovado' onClick={() => setStatus(item, 'REPROVADA')} disabled={desabilitado}>REPROVAR</Button>
          <Button value="APROVADA" type='primary' onClick={() => setStatus(item, 'APROVADA')} disabled={desabilitado} >APROVAR</Button>
        </Space>
      </Col>
    </Row>
  )

  return (
    <>

      {
        lecturesPending.length > 0 ? (
          <>
            <Header text="Palestras pendentes de aprovação" />
            <Row justify='end' style={{marginRight:'16.67%'}}>
                <Space>
                  <Button onClick={() => slider.current.prev()}><LeftOutlined /></Button>
                  <Button onClick={() => slider.current.next()}><RightOutlined /></Button>
                </Space>
            </Row>
            <Carousel
              style={{ marginBottom: '20px' }}
              {...settings}
              ref={ref => {
                slider.current = ref
              }}
            >
              {lecturesPending.map((item) => {
                return (
                  <div key={item.id}>
                    <SubmissionInfo lecture={item} footerCard={footerCard} />
                  </div>
                )
              })
              }
            </Carousel>
          </>
        ) : ('')
      }
    </>
  )
}

export default SubmissionsPending
