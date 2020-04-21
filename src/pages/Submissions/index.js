import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import Event from '../Events/Event'
import SubmissionsTable from './SubmissionsTable'
import SubmissionsPending from './SubmissionsPending'

const environment = 'http://localhost:3001'

const Submissions = () => {
  const { eventId } = useParams()
  const [ lectures, setLectures ] = useState()

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
  })

  return (
    <div>
      <Event />
      <SubmissionsTable lectures={lectures}  />
      <SubmissionsPending lectures={lectures} handleUpdateLecture={handleUpdateLecture}/>
    </div>
  )
}

export default Submissions
