import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import { Row, Space, Typography, Button, Spin, Tag } from 'antd'
import { getEnvironment } from './../../utils/environment'
import Header from './../../components/Header'
import SubmissionInfo from './../Submissions/SubmissionInfo'

const { Title } = Typography

const Lecture = () => {
  let { lectureId } = useParams()
  const environment = getEnvironment()
  const [lecture, setLecture] = useState([])
  const [event, setEvent] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const history = useHistory()

  useEffect(() => {
    fetch(`${environment}/lectures/${lectureId}`)
      .then(res => res.json())
      .then(data => {
        setLecture(data)
        fetch(`${environment}/events/${data.eventId}`)
          .then(res => res.json())
          .then(data => {
            setEvent(data)
          })
          .catch(err => console.error(err, 'Nenhum evento encontrado'))
      })
      .then(setLoadingData(false))
      .catch(err => console.error(err, 'Nenhum palestra encontrada'))
  }, [environment, lectureId])

  const StatusColor = (status) => {

    if (status === 'APROVADA') {
      return 'green';
    } else if (status === 'EM ANÁLISE') {
      return 'geekblue';
    } else {
      return 'volcano';
    }
  }

  const headerCard = (item) => (
    <Row justify='end'>
      <Button
        type='default'
        className="btn-outline"
        onClick={() => history.push(`/profile`)}
      >
        Editar perfil
      </Button>
      <Button
        type='default'
        className="btn-outline"
        onClick={() => history.push(`/lectures/form/edit/${lectureId}`)}
        style={{ marginLeft: '1rem' }}
        disabled={item && item.status !== 'EM ANÁLISE'}
      >
        Editar palestra
      </Button>
    </Row>
  )

  const footerCard = (item) => (
    <>
      <Row justify='start'>
        <Title level={4}>
          Status
        </Title>
      </Row>
      <Row>
        <Space>
          <span>{event.event}</span>
          <Tag
            color={StatusColor(item && item.status)}
            key={item && item.status}
          >
            {item && item.status}
          </Tag>
        </Space>
      </Row>
    </>
  )

  return (
    <>
      {loadingData ?
        (
          <Row gutter={[16, 24]}>
            <Spin size='large' />
          </Row>
        ) : (
          <>
            <Header text={`Detalhes de ${lecture && lecture.activityTitle}`} />
            <SubmissionInfo lecture={lecture} headerCard={headerCard} footerCard={footerCard} />
          </>
        )
      }
    </>
  )
}

export default Lecture
