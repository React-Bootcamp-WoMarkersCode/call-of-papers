import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Checkbox, Radio, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import { getEnvironment } from './../../utils/environment';
import Header from '../../components/Header';

let bodyApi = {};

const { TextArea } = Input;

const EventForm = () => {
	//Carrega o id do evento que é passado pela url
	let { eventId } = useParams();

	const [ values, setValuesChecked ] = useState([]);
	const [ radio, setValuesRadio ] = useState(true);
	const [ partner, setValuesPartner ] = useState([]);

	// Se já houver evento com o id, ou seja, se for uma edição, os dados será carregados nessa variável
	const [ dados, setDados ] = useState([]);

	const environment = getEnvironment();

	useEffect(
		() => {
			fetch(`${environment}/events?id=${eventId}`)
				.then((res) => res.json())
				.then((data) => {
					setDados(data[0]);
					setValuesRadio(data[0].limited_spaces);
				})
				.catch((err) => console.error(err, 'Nenhum evento por aqui!'));
		},
		[ environment, eventId ]
	);

	let valoresIniciais;

	// Se tiver o id do evento na url é uma edição e os dados antigos devem ser carregados
	eventId
		? (valoresIniciais = dados)
		: (valoresIniciais = {
				event: '',
				description: '',
				local: '',
				schedule: '',
				organizer: '',
				categories: [],
				limited_spaces: true,
				partners: [],
				dados
			});

	let formik = useFormik({
		enableReinitialize: true,
		initialValues: valoresIniciais
	});

	const onChangeCategories = (categories) => {
		setValuesChecked(categories);
		formik.values.categories = categories;
	};
	const onChangeSpaces = (spaces) => {
		setValuesRadio(spaces.target.value);
		formik.values.limited_spaces = spaces.target.value;
	};
	const onChangePartners = (partners) => {
		setValuesPartner(partners);
		formik.values.partners = partners;
	};

	const { event, description, local, schedule, organizer } = formik.values;

	bodyApi = {
		event,
		userId: parseInt(localStorage.getItem('userId')),
		description,
		schedule,
		local,
		organizer,
		categories: values,
		limited_spaces: radio,
		partners: partner
	};

	const history = useHistory();

	const openNotification = (type, description) => {
		notification[type]({
			message: type === 'success' ? 'Sucesso!' : 'Ops! Algo deu errado!',
      description: description
		});
	};

	function onsubmit() {
		// Se for evento novo, daremos um POST
		if (!eventId) {
			fetch(`${environment}/events`, {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				body: JSON.stringify(bodyApi)
			})
				.then(function(response) {
					history.push('/events');
					openNotification('success', 'Evento cadastrado com sucesso!');
					return response.json();
				})
				.catch(function(error) {
					console.log('error', error);
					openNotification('error', 'Não foi possível cadastrar o evento!');
				});
		} else {
			// Se for edição de evento, daremos um PUT
			fetch(`${environment}/events/` + eventId, {
				method: 'put',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				body: JSON.stringify(bodyApi)
			})
				.then(function(response) {
					history.push('/events');
					openNotification('success', 'Evento atualizado com sucesso!');
					return response.json();
				})
				.catch(function(error) {
					console.log('error', error);
					openNotification('error', 'Não foi possível atualizar o evento!');
				});
		}
	}

	return (
		<>
			<Header text={eventId ? `Edite o evento - ${formik.values.event}` : `Crie um evento`} />

			<Row style={{ marginTop: 30 }}>
				<Col span={16} offset={4}>
					<Form layout="vertical">
						{/* Nome do evento */}
						<Form.Item
							label="Nome do evento:"
							htmlFor="event"
							rules={[ { required: true, message: 'Preencha corretamente o campo de evento!' } ]}
						>
							<Input
								name="event"
								placeholder="Digite o nome do evento"
								onChange={formik.handleChange}
								value={formik.values.event}
							/>
						</Form.Item>

						{/* Descrição do evento */}
						<Form.Item
							label="Descrição do evento:"
							htmlFor="description"
							rules={[ { required: true, message: 'Preencha corretamente o campo de descrição do evento.' } ]}
						>
							<TextArea
								name="description"
								placeholder="Digite a descrição do evento (sobre o evento, agenda, regras...)"
								onChange={formik.handleChange}
								value={formik.values.description}
							/>
						</Form.Item>
						<Row>
							<Col span={12} style={{ paddingRight: 10 }}>
								{/* Data-Horário do evento */}
								<Form.Item label="Data/Horário do evento:" htmlFor="schedule" rules={[ { required: false } ]}>
									<Input
										name="schedule"
										placeholder="Digite a data e horário"
										onChange={formik.handleChange}
										value={formik.values.schedule}
									/>
									<small>Exemplo: 18 Abril, 07:30</small>
								</Form.Item>
							</Col>
							<Col span={12} style={{ paddingLeft: 10 }}>
								{/* Local do evento */}
								<Form.Item label="Local do evento:" htmlFor="local" rules={[ { required: false } ]}>
									<Input
										name="local"
										placeholder="Digite o local do evento"
										onChange={formik.handleChange}
										value={formik.values.local}
									/>
								</Form.Item>
							</Col>
						</Row>

						{/* Organizador do evento */}
						<Form.Item
							label="Organizador do evento:"
							htmlFor="organizer"
							rules={[ { required: true, message: 'Preencha corretamente o campo de organizador!' } ]}
						>
							<Input
								name="organizer"
								placeholder="Digite o nome do organizador responsável"
								onChange={formik.handleChange}
								value={formik.values.organizer}
							/>
						</Form.Item>

						<Row>
							<Col span={12}>
								<Form.Item
									label="Categoria do evento: "
									htmlFor="categories"
									rules={[ { required: true, message: 'Preencha corretamente o campo de categoria!' } ]}
								>
									<Checkbox.Group onChange={onChangeCategories} value={formik.values.categories}>
										<Row>
											<Col span={8}>
												<Checkbox value="workshop">Workshop</Checkbox>
											</Col>
											<Col span={8}>
												<Checkbox value="bootcamp">Bootcamp</Checkbox>
											</Col>
											<Col span={8}>
												<Checkbox value="frontend">Front-end</Checkbox>
											</Col>
											<Col span={8}>
												<Checkbox value="backend">Back-end</Checkbox>
											</Col>
										</Row>
									</Checkbox.Group>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label="Quais parceiros aceita ?" htmlFor="partners" rules={[ { required: false } ]}>
									<Checkbox.Group onChange={onChangePartners} value={formik.values.partners}>
										<Row>
											<Col span={10}>
												<Checkbox value="sponsors">Sponsors</Checkbox>
											</Col>
											<Col span={10}>
												<Checkbox value="universidade">Universidades</Checkbox>
											</Col>
											<Col span={10}>
												<Checkbox value="comunidades">Comunidades</Checkbox>
											</Col>
											<Col span={10}>
												<Checkbox value="startups">Startups</Checkbox>
											</Col>
											<Col span={10}>
												<Checkbox value="palestrantes">Palestrantes</Checkbox>
											</Col>
											<Col span={10}>
												<Checkbox value="imprensa">Imprensa</Checkbox>
											</Col>
											<Col span={24}>
												<Checkbox value="Nao">Não aceito parceiros</Checkbox>
											</Col>
										</Row>
									</Checkbox.Group>
								</Form.Item>
							</Col>
						</Row>
						<Form.Item label="Vagas limitadas ?" htmlFor="limited_spaces" rules={[ { required: true } ]}>
							<Radio.Group name="limited_spaces" onChange={onChangeSpaces}>
								<Radio value={true} checked={formik.values.limited_spaces}>
									Sim
								</Radio>
								<Radio value={false} checked={!formik.values.limited_spaces}>
									Não
								</Radio>
							</Radio.Group>
						</Form.Item>
						<Form.Item>
							{eventId ? (
								<Button type="primary" onClick={onsubmit}>
									Atualizar evento
								</Button>
							) : (
								<Button type="primary" onClick={onsubmit}>
									Cadastrar evento
								</Button>
							)}
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</>
	);
};

export default EventForm;
