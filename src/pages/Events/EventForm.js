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

	const [values, setValuesChecked] = useState([]);
	const [radio, setValuesRadio] = useState(true);
	const [partner, setValuesPartner] = useState([]);

	// Se já houver evento com o id, ou seja, se for uma edição, os dados será carregados nessa variável
	const [dados, setDados] = useState([]);

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
		[environment, eventId]
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
			uploadedImage: '',
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

	const { event, description, local, schedule, organizer, uploadedImage } = formik.values;

	bodyApi = {
		event,
		userId: String(localStorage.getItem('userId')),
		description,
		schedule,
		local,
		organizer,
		uploadedImage,
		categories: values,
		limited_spaces: radio,
    partners: partner,
    id: String(Math.ceil(Math.random() * Math.pow(10,6)))
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
				.then(function (response) {
					openNotification('success', 'Evento cadastrado com sucesso!');
          history.push(`/events/${bodyApi.id}`)
					return response.json();
				})
				.catch(function (error) {
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
				.then(function (response) {
					openNotification('success', 'Evento atualizado com sucesso!');
          history.push(`/events/${eventId}`)
					return response.json();
				})
				.catch(function (error) {
					console.log('error', error);
					openNotification('error', 'Não foi possível atualizar o evento!');
				});
		}
	}

	return (
		<>
			<Header text={eventId ? `Edite o evento - ${formik.values.event}` : `Evento`} />

			<Row style={{ marginTop: 30 }}>
				<Col>
					<Form layout="vertical">
						{/* Nome do evento */}
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 11 }}>
                <Form.Item
                  label="Nome"
                  htmlFor="event"
                  rules={[{ required: true, message: 'Preencha corretamente o campo de evento!' }]}
                >
                  <Input
                    name="event"
                    placeholder="Digite o nome do evento"
                    onChange={formik.handleChange}
                    value={formik.values.event}
                  />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 11, offset: 2 }}>
                <Form.Item
                  label="Organizador"
                  htmlFor="organizer"
                  rules={[{ required: true, message: 'Preencha corretamente o campo de organizador!' }]}
                >
                  <Input
                    name="organizer"
                    placeholder="Digite o nome da sua comunidade"
                    onChange={formik.handleChange}
                    value={formik.values.organizer}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 11 }}>
                <Form.Item label="Data/Horário" htmlFor="schedule" rules={[{ required: false }]}>
                  <Input
                    name="schedule"
                    placeholder="Digite a data e horário"
                    onChange={formik.handleChange}
                    value={formik.values.schedule}
                  />
                  <small>Exemplo: 18 Abril, 07:30</small>
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 11, offset: 2 }}>
                <Form.Item label="Local" htmlFor="local" rules={[{ required: false }]}>
									<Input
										name="local"
										placeholder="Digite o local do evento"
										onChange={formik.handleChange}
										value={formik.values.local}
									/>
								</Form.Item>
              </Col>
            </Row>

						{/* Descrição do evento */}
						<Form.Item
							label="Descrição"
							htmlFor="description"
							rules={[{ required: true, message: 'Preencha corretamente o campo de descrição do evento.' }]}
						>
							<TextArea
								name="description"
								placeholder="Digite a descrição do evento (sobre o evento, agenda, regras...)"
								onChange={formik.handleChange}
								value={formik.values.description}
							/>
						</Form.Item>

						{/* Identidade visual */}
						<Form.Item label="Identidade visual:" name="uploadedImage">
							<Input
								name="uploadedImage"
								placeholder="Insira o link da imagem do evento"
								onChange={formik.handleChange}
								value={formik.values.uploadedImage}
							/>
						</Form.Item>
						<Row>
							<Col xs={{ span: 24 }} md={{ span: 11}}>
								<Form.Item
									label="Categoria do evento: "
									htmlFor="categories"
									rules={[{ required: true, message: 'Preencha corretamente o campo de categoria!' }]}
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
							<Col xs={{ span: 24 }} md={{ span: 11, offset: 2}}>
								<Form.Item label="Quais parceiros aceita ?" htmlFor="partners" rules={[{ required: false }]}>
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
						<Form.Item label="Vagas limitadas ?" htmlFor="limited_spaces" rules={[{ required: true }]}>
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
								<Button type="default" className='btn-outline' onClick={onsubmit}>
									Atualizar evento
								</Button>
							) : (
									<Button type="default" className='btn-outline' onClick={onsubmit}>
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
