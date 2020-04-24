import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Event from '../Events/Event'
import SubmissionsTable from './SubmissionsTable'
import SubmissionsPending from './SubmissionsPending'
import { getUserIsOwner } from '../../utils/getUserIsOwner '
import { getEnvironment } from '../../utils/environment'
import { Row, Card, Col, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { copyToCliboard } from '../../utils/copyToCliboard'

const environment = getEnvironment()

const Submissions = () => {
  const { eventId } = useParams()
  const [event, setEvent] = useState({})
  const [aprovadas, setAprovadas] = useState([])
  const [lecturesPending, setLecturesPending] = useState([])

  useEffect(() => {
    fetch(`${environment}/events/${eventId}`)
      .then(res => res.json())
      .then(data => setEvent(data))
      .catch(err => console.error(err, 'Nenhum evento por aqui!'))
  }, [eventId])

  const getLectures = () => {
    fetch(`${environment}/lectures?eventId=${eventId}`)
      .then(res => res.json())
      .then(response => {
        setAprovadas(response.filter(lecture => lecture.status === 'APROVADA'))
        setLecturesPending(response.filter(lecture => lecture.status === 'EM ANÁLISE'))
      })
      .catch(err => console.error(err, 'Nenhuma palestra por aqui!'))
  }

  const handleUpdateLecture = () => {
    getLectures()
  }

  useEffect(() => {
    eventId && getLectures()
  }, [eventId])

  return (
    <div>
      <Event event={event} />
      {
        getUserIsOwner(event.userId) ?
          <>
            {
              aprovadas.length === 0 && lecturesPending.length === 0 ?
                (
                  <Row style={{ marginTop: '20px' }}>
                    <Col span={16} offset={4} justify="center">
                      <Card style={{ textAlign: 'center' }}>
                        <p>Quando os palestrantes submeterem as palestas, você poderá gerenciá-las aqui.</p>
                        <p>Compartilhe o link do seu evento para realizar o Call of Papers.</p>
                        <Button type="link" onClick={() => copyToCliboard()} style={{ padding: 0 }}>
                          <FontAwesomeIcon icon={faLink} />Copiar link para Call of Papers
                        </Button>
                      </Card>
                    </Col>
                  </Row>
                )
                :
                (
                  <>
                    <SubmissionsTable aprovadas={aprovadas} />
                    <SubmissionsPending lectures={lecturesPending} handleUpdateLecture={handleUpdateLecture} />
                  </>
                )
            }
          </>
          :
          ''
      }

    </div>
  )
}

export default Submissions
