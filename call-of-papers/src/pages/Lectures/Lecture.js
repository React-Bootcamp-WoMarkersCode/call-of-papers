import React from 'react'
import { useParams } from 'react-router'

const Lecture = () => {
  let { lectureId } = useParams()

  return (
    <h2>Lecture Page ID: {lectureId}</h2>
  )
}

export default Lecture
