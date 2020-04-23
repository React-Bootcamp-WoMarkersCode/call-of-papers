import React, { useState, useEffect } from 'react'
import { Row, Button, notification } from 'antd'
import { getEnvironment } from './../../utils/environment'
import './lectures-list.scss'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import {
  Select,
  Form,
} from 'formik-antd'
import { useParams, useHistory } from 'react-router'
import Header from './../../components/Header'

const LectureForm = () => {
  let [lectures, setLectures] = useState([])
  let [event, setEvent] = useState([])
  let [lectureChosen, setLectureChosen] = useState([])
  const history = useHistory()
  const environment = getEnvironment()
  const { eventId } = useParams()

  const openNotification = (type, description) => {
		notification[type]({
			message: type === 'success' ? 'Sucesso!' : 'Ops! Algo deu errado!',
      description: description,
      duration: 3
    })

    setTimeout(() => {
      history.push('/');
    }, 3000)
	}

  const handleSubmit = () => {
    let values = {
      ...lectureChosen,
      status: 'EM ANÁLISE',
      eventId: parseInt(eventId),
      id: Math.ceil(Math.random() * Math.pow(10,5)),
    }

    fetch(`${environment}/lectures`, {
      method: 'post',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
        },
      body: JSON.stringify(values)
    }).then(function (response) {
      openNotification('success', 'Atividade cadastrada com sucesso!')
      setTimeout(function(){ history.push('/events/' + parseInt(eventId))}, 3000);
			return response.json()
    }).catch(function (error) {
      console.log('error', error)
      openNotification('error', 'Não foi possível cadastrar a palestra!')
    })
  }

  useEffect(() => {
    fetch(`${environment}/lectures?userId=${localStorage.getItem('userId')}`)
      .then(res => res.json())
      .then(data => {
        setLectures(data)
      })
      .catch(err => console.error(err, 'Nenhuma palestra encontrada'))
  }, [environment])

  useEffect(() => {
    fetch(`${environment}/events?id=${eventId}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data[0])
      })
      .catch(err => console.error(err, 'Nenhum evento encontrado'))
  }, [environment, eventId])

  const handleLecture = (id) => {
    setLectureChosen(lectures.find((lec) => lec.id === id))
  }

  return (
    <>
      <Header text="Submissão de atividades" />
      <Row justify="center" style={{ marginBottom: 20 }}>
        Selecione a palestra e aguarde o contato da equipe organizadora do evento&nbsp;<strong>{`${event.event}`}</strong>
      </Row>
      <Row justify="center" className="row-table">
        <Formik
          initialValues={lectures}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          render={(formik) => (
            <Form layout="vertical" style={{ width: '70%' }}>
              <div className="container">
                <div className="component-container">
                  {/* Palestra */}
                  <Form.Item label="Palestra" name="lecture">
                    <Select name="lecture" onChange={handleLecture}>
                      {lectures.map((lecture) => { return (<Select.Option value={lecture.id}>{lecture.activityTitle}</Select.Option>) })}
                    </Select>
                  </Form.Item>
                  <Button type='primary' htmlType='submit'>
                    Enviar
                  </Button>
                </div>
              </div>
              <br></br>
              <Row justify="left" style={{ marginBottom: 20 }}>
                Quer cadastrar uma nova palestra? Clique&nbsp;<Link to={`/lectures/form/${eventId}`}>aqui</Link>&nbsp;para voltar
              </Row>
            </Form>
          )}
        />
      </Row>
    </>
  )
}

export default LectureForm
