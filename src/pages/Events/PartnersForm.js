import React, { useState, useEffect } from 'react'
import { Row, Button } from 'antd'
import { getEnvironment } from './../../utils/environment'
import { Formik } from 'formik'
import { useParams } from 'react-router'
import {
	Input,
	Form
} from 'formik-antd'
import Header from './../../components/Header'

const { TextArea } = Input

const PartnersForm = () => {
	const [api, setApi] = useState([])

	let { eventId } = useParams()

	let { event } = api
	const environment = getEnvironment();

	useEffect(() => {
		fetch(`${environment}/events/${eventId}`)
		.then(res => res.json())
		.then(data => {
			setApi(data)
		})
		.catch(err => console.error(err, 'Nenhum evento por aqui!'))
	}, [environment, eventId])

	const handleSubmit = values => {
		fetch(`${environment}/candidates`, {
			method: 'post',
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify(values)
			}).then(function (response) {
				alert('Mensagem enviada! A equipe responsável pelo evento entrará em contato.')
				return response.json()
			}).catch(function (error) {
				alert(`Erro ao cadastrar: ${error}`)
			})
	}

	let call_for_partners = {
		event_id: eventId,
		name: '',
		email: '',
		subject: '',
		telephone: '',
		message: '',
		id: (Math.floor(Math.random() * 1000)).toString()
	}

	return (
		<>
			<Header text={`Call For Partners: ${event}`} />
			<Row justify="center" style={{ marginBottom: 20 }}>
				Quer formar uma parceria e fazer o {event} acontecer? É só preencher o formulário abaixo. O time responsável entrará em contato assim que possível.
			</Row>
			<Row justify="center" className="row-table">
				<Formik
					initialValues={call_for_partners}
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
									<Form.Item
										label="Email:"
										name="email"
										rules={[ { required: true, message: 'Por favor, insira seu email!' } ]}
									>
										<Input name="email" />
									</Form.Item>
									<Form.Item
										label="Telefone:"
										name="telephone"
										rules={[ { required: true, message: 'Por favor, informe o número de seu telefone!' } ]}
									>
										<Input name="telephone" />
									</Form.Item>
									<Form.Item
										label="Assunto:"
										name="subject"
										rules={[ { required: true, message: 'Por favor, informe o motivo do seu contato!' } ]}
									>
										<Input name="subject" />
									</Form.Item>
									<Form.Item label="Mensagem:" name="message">
										<TextArea rows={4} name="message" />
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
		</>
	)
}

export default PartnersForm
