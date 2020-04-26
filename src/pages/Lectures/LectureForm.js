import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router'
import { Row, Button, notification } from 'antd'
import { getEnvironment } from './../../utils/environment'
import './lectures-list.scss'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import {
	Checkbox,
	Input,
	Radio,
	Select,
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
        history.push('/lectures')
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
		id: String(Math.ceil(Math.random() * Math.pow(10,5))),
		userId: String(profile.id)
	}

	if (goHome === false) {
		return (
			<>
			<Header text="Submissão de atividades" />
      { event ?
        (<>
          <Row justify="center" style={{ marginBottom: 20 }}>
            Para participar, preencha o formulário e aguarde o contato da equipe organizadora do evento&nbsp;<strong> {`${event.event}`} </strong>
          </Row>
          <Row justify="center" style={{ marginBottom: 20 }}>
            Clique&nbsp;<Link to={`/lectures/copylecture/${eventId}`}>aqui</Link>&nbsp;para reaproveitar uma palestra já submetida em outro evento
          </Row>
        </>) : (<></>)
      }
			<Row justify="center" className="row-table">
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					enableReinitialize={true}
					render={(formik) => (
						<Form layout="vertical" style={{ width: '70%' }}>
							<div className="container">
								<div className="component-container">
									{/* Nome completo */}
									<Form.Item
										label="Nome completo:"
										name="name"
										rules={[ { required: true, message: 'Por favor, insira seu nome completo!' } ]}
									>
										<Input name="name" />
									</Form.Item>

									{/* Email */}
									<Form.Item
										label="Email:"
                    name="email"
                    type="email"
										rules={[ { type: 'email', required: true, message: 'Por favor, insira um email válido!' } ]}
									>
										<Input name="email" />
									</Form.Item>

									{/* Minibiografia */}
									<Form.Item label="Minibiografia:" name="apresentation">
										<TextArea rows={4} name="apresentation" />
									</Form.Item>

									{/* Linkedin */}
									<Form.Item label="Linkedin:" name="linkedinLink">
										<Input name="linkedinLink" />
									</Form.Item>

									{/* Facebook */}
									<Form.Item label="Facebook:" name="facebookLink">
										<Input name="facebookLink" />
									</Form.Item>

									{/* Twitter */}
									<Form.Item label="Twitter:" name="twitterLink">
										<Input name="twitterLink" />
									</Form.Item>

									{/* Instagram */}
									<Form.Item label="Instagram:" name="instagram">
										<Input name="instagram" />
									</Form.Item>

									{/* Youtube */}
									<Form.Item label="Youtube:" name="youtube">
										<Input name="youtube" />
									</Form.Item>

									{/* Link de algum trabalho relevante */}
									<Form.Item label="Github:" name="githubLink">
										<Input name="githubLink" />
									</Form.Item>

									{/* Já ministrou alguma atividade em eventos?  */}
									<Form.Item label="Já ministrou alguma atividade em eventos?" name="haveLecturedBefore">
										<Select name="haveLecturedBefore" style={{ width: '30%' }}>
											<Select.Option value={'Sim'}>Sim</Select.Option>
											<Select.Option value={'Não'}>Não</Select.Option>
										</Select>
									</Form.Item>

									{/* Tipo de atividade proposta */}
									<Form.Item
										label="Tipo de atividade proposta:"
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

									{/* Segmento da atividade proposta */}
									<Form.Item
										label="Categoria da atividade proposta:"
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

									{/* Título da atividade proposta */}
									<Form.Item
										label="Título da atividade proposta:"
										name="activityTitle"
										rules={[ { required: true, message: 'Por favor, insira um título para a atividade!' } ]}
									>
										<Input name="activityTitle" />
									</Form.Item>

									{/* Descrição da atividade proposta */}
									<Form.Item
										label="Descrição da atividade proposta:"
										name="activityDescription"
										rules={[ { required: true, message: 'Por favor, insira uma descrição para a atividade!' } ]}
									>
										<TextArea
											rows={4}
											name="activityDescription"
										/>
									</Form.Item>
									{/* Identidade visual */}
									<Form.Item label="Identidade visual:" name="uploadedImage">
										Já tem uma imagem que seja a cara da sua atividade? Insira o link no campo abaixo:
										<Input name="uploadedImage" />
									</Form.Item>

									<Button type='primary' htmlType='submit'>
										Enviar
									</Button>
								</div>
							</div>
						</Form>
					)}
				/>
			</Row>
			</>)
		} else {
			return <Redirect to='/' />
		}
}

export default LectureForm
