import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router'
import { Row, Col, Button, notification } from 'antd'
import { getEnvironment } from './../../utils/environment'
import './lectures-list.scss'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import {
	Checkbox,
	Input,
	Radio,
	Form
} from 'formik-antd'
import { useParams } from 'react-router'
import Header from './../../components/Header'

const { TextArea } = Input

const LectureForm = () => {
  let history = useHistory()
	let [ profile, setProfile ] = useState([])
  let [ event, setEvent ] = useState([])
  let [ lecture, setLecture ] = useState([])
	let [ goHome, setGoHome ] = useState(false)
  const environment = getEnvironment()
  let userPicture = localStorage.getItem('userPicture')

  // Para criar uma nova palestra, criaremos com base no id do evento
  const { eventId } = useParams()

  // Para editar, já teremos a plaestra criada, então só precisaremos do id da palestra
  const { lectureId } = useParams()

  const openNotification = (type, description) => {
		notification[type]({
			message: type === 'success' ? 'Sucesso!' : 'Ops! Algo deu errado!',
      description: description,
      duration: 3
    })

    setTimeout(() => {
      setGoHome(true)
    }, 3000)
  }

  const post = (values) => {
		return fetch(`${environment}/lectures`, {
      method: 'post',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(values)
      })
  }

  const put = (values) => {
		return fetch(`${environment}/lectures/` + lectureId , {
      method: 'put',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(values)
      })
  }

	const handleSubmit = (values) => {
    (lectureId? put(values) : post(values))
    .then(function (response) {
      openNotification('success', 'Atividade cadastrada com sucesso!')

      if (eventId) {
        history.push('/events/' + parseInt(eventId))
      } else {
        history.push(`/lectures/${lectureId}`)
      }

			return response.json()
		}).catch(function (error) {
			console.log('error', error)
      openNotification('error', 'Não foi possível cadastrar a palestra!')
		})
	}

	useEffect(() => {
		fetch(`${environment}/profiles`)
		.then(res => res.json())
		.then(data => {
			setProfile(data.find(profile => profile.id === localStorage.getItem('userId')))
		})
		.catch(err => console.error(err, 'Nenhum usuário encontrado'))
	}, [environment])

	useEffect(() => {
    fetch(`${environment}/events?id=${eventId}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data[0])        
      })
      .catch(err => console.error(err, 'Nenhum evento encontrado'))
  }, [environment, eventId])

  useEffect(() => {
    fetch(`${environment}/lectures?id=${lectureId}`)
      .then(res => res.json())
      .then(data => {
        setLecture(data[0])
      })
      .catch(err => console.error(err, 'Nenhuma palestra encontrado'))
  }, [environment, lectureId])

  let initialValues;

  lectureId? initialValues = {...lecture} :

	initialValues = {
		...profile,
		userPicture,
		name: localStorage.getItem('userName'),
		instagram: '',
		youtube: '',
		portfolio: '',
		activityTitle: '',
		activityDescription: '',
		activityId: '',
		uploadedImage: '',
		activityType: '',
		activityCategory: [],
		haveLecturedBefore: '',
		status: 'EM ANÁLISE',
    eventId: String(eventId),
    eventName: String(event.event),
    eventSchedule: String(event.schedule),
		id: String(Math.ceil(Math.random() * Math.pow(10,5))),
		userId: String(profile.id)
	}

	if (goHome === false) {
		return (
			<>
      <Header text="Palestra" />
      {
        event ? (
          <>
            <Row justify="center" style={{ marginBottom: 20 }}>
              Para participar, preencha o formulário e aguarde o contato da equipe organizadora do evento&nbsp;<strong> {`${event.event}`} </strong>
            </Row>
            <Row justify="center" style={{ marginBottom: 20 }}>
              Clique&nbsp;<Link to={`/lectures/copylecture/${eventId}`}>aqui</Link>&nbsp;para reaproveitar uma palestra já submetida em outro evento
            </Row>
          </>
        ) : (<></>)
      }
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        render={(formik) => (
          <Form layout="vertical">
            <div className="container">
              <div className="component-container">
                  <Row justify='space-between' >
                    <Col xs={24} md={11}>
                      <Form.Item
                        label="Nome"
                        name="name"
                        rules={[ { required: true, disabled: true, message: 'Por favor, insira seu nome completo!' } ]}
                      >
                        <Input name="name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={{ span: 11, offset: 2 }}>
                      <Form.Item
                        label="Email"
                        name="email"
                        type="email"
                        rules={[ { type: 'email', required: true, message: 'Por favor, insira um email válido!' } ]}
                      >
                        <Input name="email" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={24} md={11}>
                      <Form.Item
                        label="Título"
                        name="activityTitle"
                        rules={[ { required: true, message: 'Por favor, insira um título para a atividade!' } ]}
                      >
                        <Input name="activityTitle" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    label="Descrição"
                    name="activityDescription"
                    rules={[ { required: true, message: 'Por favor, insira uma descrição para a atividade!' } ]}
                  >
                    <TextArea
                      rows={4}
                      name="activityDescription"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Tipo"
                    name="activityType"
                    rules={[ { required: true, message: 'Por favor, informe um tipo de atividade' } ]}
                  >
                    <Radio.Group
                      name="activityType"
                      options={[
                        { label: 'Palestra (1 palestrante)', value: 'Palestra' },
                        { label: 'Painel (1 moderador + até 3 painelistas)', value: 'Painel' },
                        { label: 'Workshop (1 palestrante + até 2 facilitadores)', value: 'Workshop' }
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Categoria"
                    name="activityCategory"
                    rules={[ { required: true, message: 'Por favor, informe pelo menos uma categoria!' } ]}
                  >
                    <Checkbox.Group
                      style={{ textAlign: 'left' }}
                      name="activityCategory"
                    >
                      <Checkbox style={({ display: 'block' }, { marginLeft: '8px' })} value="Segurança">
                        Segurança
                      </Checkbox>
                      <Checkbox
                        style={{ display: 'block' }}
                        value="Criatividade/ Design / Entretenimento/ Marketing Digital"
                      >
                        Criatividade/Design/ Entretenimento/Marketing Digital
                      </Checkbox>
                      <Checkbox style={{ display: 'block' }} value="Empreendedorismo">
                        Empreendedorismo
                      </Checkbox>
                      <Checkbox style={{ display: 'block' }} value="IoT">
                        IoT (Internet of Things)
                      </Checkbox>
                      <Checkbox style={{ display: 'block' }} value="Realidade Virtual/Realidade Aumentada">
                        Realidade Virtual/Realidade Aumentada
                      </Checkbox>
                      <Checkbox style={{ display: 'block' }} value="Biohacking/Cyborg">
                        Biohacking/Cyborg
                      </Checkbox>
                      <Checkbox style={{ display: 'block' }} value="Big Data e Machine Learning">
                        Big Data e Machine Learning
                      </Checkbox>
                    </Checkbox.Group>
                  </Form.Item>

                  <Button type='default' className='btn-outline' htmlType='submit'>
                    Enviar
                  </Button>
                </div>
              </div>
            </Form>
          )}
      />
  </>)
  } else {
    return <Redirect to='/' />
  }
}

export default LectureForm
