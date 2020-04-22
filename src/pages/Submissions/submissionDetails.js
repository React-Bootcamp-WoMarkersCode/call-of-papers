import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Header from '../../components/Header'
import SubmissionInfo from './SubmissionInfo'
import './style.scss'

const environment = 'http://localhost:3001'
const SubmissionInAnalysis = () => {
  let { submissionId } = useParams()
  const [lecture, setLecture] = useState([])

  useEffect(() => {
    fetch(`${environment}/lectures/${submissionId}`)
      .then(res => res.json())
      .then(lecture =>
          setLecture(lecture))
      .catch(err => console.error(err, 'Nenhuma palestra por aqui!'))
  }, [submissionId])

  return (
    <>
      <Header text="Palestra" />
      <SubmissionInfo lecture={lecture} />
    </>
  )
}

export default SubmissionInAnalysis
