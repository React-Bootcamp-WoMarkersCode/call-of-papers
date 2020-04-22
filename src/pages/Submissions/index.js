import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Event from '../Events/Event'
import SubmissionsTable from './SubmissionsTable'
import SubmissionsPending from './SubmissionsPending'
import { getUserIsOwner } from '../../utils/getUserIsOwner '
import { getEnvironment } from '../../utils/environment'


const environment = getEnvironment()

const Submissions = () => {
  const { eventId } = useParams()
  const [event, setEvent] = useState({})
  const [lectures, setLectures] = useState()

  useEffect(() => {
    fetch(`${environment}/events/${eventId}`)
      .then(res => res.json())
      .then(data => setEvent(data))
      .catch(err => console.error(err, 'Nenhum evento por aqui!'))
  }, [eventId])

  const getLectures = () => {
    fetch(`${environment}/lectures`)
      .then(res => res.json())
      .then(response => {
        let lecturesById = response.filter(lecture => lecture.eventId === eventId)
        setLectures(lecturesById)
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
            <SubmissionsTable lectures={lectures} />
            <SubmissionsPending lectures={lectures} handleUpdateLecture={handleUpdateLecture} />
          </>
          :
          ''
      }

    </div>
  )
}

export default Submissions
