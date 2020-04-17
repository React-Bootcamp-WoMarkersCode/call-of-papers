import React, { useState, useEffect } from 'react'
import { Row, Button, Divider } from 'antd'
import { getEnvironment } from './../../utils/environment'
import { Formik } from 'formik'
import { useParams } from 'react-router'
import {
	Checkbox,
	Input,
	Radio,
	Select,
	Form
} from 'formik-antd'

const { TextArea } = Input

const PartnersForm = () => {
	const [api, setApi] = useState([])

	let { eventId } = useParams()

	const { event, schedule, description, organizer, local, partners, tickets } = api

	const environment = getEnvironment();

	useEffect(() => {
		fetch(`${environment}/events/${eventId}`)
		.then(res => res.json())
		.then(data => {
			setApi(data)
		})
		.catch(err => console.error(err, 'Nenhum evento por aqui!'))
	}, [])


	return (
		<>
			<Row gutter={[ 16, 24 ]}>
        		<Divider orientation="left">Call For Partners: {event}</Divider>
			</Row>
			<Row justify="center" style={{ marginBottom: 20 }}>
				Quer formar uma parceria e fazer o {event} acontecer? É só preencher o formulário abaixo. O time responsável entrará em contato assim que possível.
			</Row>
			<Row justify="center" className="row-table">
				<Formik
					//onSubmit={handleSubmit}
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