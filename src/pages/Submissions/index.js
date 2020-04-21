import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import Event from '../Events/Event'
import SubmissionsTable from './SubmissionsTable'
import SubmissionsPending from './SubmissionsPending'

const environment = 'http://localhost:3001'

const Submissions = () => {
  const { eventId } = useParams()
  const [ lectures, setLectures ] = useState()

  useEffect(() => {
    fetch(`${environment}/lectures`)
      .then(res => res.json())
      .then(response => {
        let lecturesById = response.filter(lecture => lecture.eventId === eventId)
        setLectures(lecturesById)
      })
      .catch(err => console.error(err, 'Nenhuma palestra por aqui!'))
  }, [eventId])

  return (
    <div>
      <Event />
      <SubmissionsTable lectures={lectures} />
      <SubmissionsPending lectures={lectures} />
    </div>
  )
}

export default Submissions
