import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Input, Row, Button, Select, Radio, Checkbox, Divider } from 'antd';
import { getEnvironment } from './../../utils/environment';
import './lectures-list.scss';

const { TextArea } = Input;
const { Option } = Select;

const LectureForm = () => {
	let [ profile, setProfile ] = useState([]);
	const environment = getEnvironment();
  const [ valuesRadio, setRadioValues ] = useState();
  const [ valuesCheck, setCheckValues ] = useState();
  const [ valuesSelect, setSelectValues ] = useState();
  const [ imageUpload, setImageUpload ] = useState();

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch(`${environment}/profiles`)
      res
        .json()
				.then(res => setProfile(res.find((profile) => profile.id === localStorage.getItem('userId'))))
				.catch((err) => console.error(err, 'Nenhum usuário encontrado'))
    }

    fetchProfile();
  }, []);

	let userEmail = localStorage.getItem('userEmail');
	let userPicture = localStorage.getItem('userPicture');
	// let userName = localStorage.getItem('userName')

	if (!userEmail) {
		userEmail = '';
	}

	const onChangeSelect = (selectValues) => {
		setSelectValues(selectValues);
	};
	const onChangeRadio = (radioValues) => {
		setRadioValues(radioValues.target.value);
	};
	const onChangeCheck = (checkedValues) => {
		setCheckValues(checkedValues);
	};

	const onChangeHandler = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function() {
			setImageUpload(reader.result);
		};
		reader.onerror = function(error) {
			console.log('Error: ', error);
		};
	};

	profile = {
		...profile,
		userPicture,
		name: localStorage.getItem('userName'),
		email: '',
		instagram: '',
		youtube: '',
		portfolio: '',
		activityTitle: '',
		activityDescription: '',
		activityId: '',
		uploadedImage: imageUpload,
		activityType: valuesRadio,
		activityCategory: valuesCheck,
		haveLecturedBefore: valuesSelect
	};

	let formik = useFormik({
		initialValues: profile,
		enableReinitialize: true,
		onSubmit: (values) => {
			values.id = Math.floor(Math.random() * 1000).toString();
			console.log(values);
			// fetch(`${environment}/lectures`, {
			//   method: 'post',
			//   headers: {
			//       Accept: "application/json",
			//       "Content-Type": "application/json",
			//       'Access-Control-Allow-Origin': '*'
			//   },
			//   body: JSON.stringify(values)
			//   }).then(function (response) {
			//       alert('Atividade cadastrada com sucesso!')
			//       return response.json();
			//   }).catch(function (error) {
			//       alert(`Erro ao cadastrar: ${error}`)
			//   })
		},
		onChangeSelect,
		onChangeHandler,
		onChangeCheck,
		onChangeRadio
	});

	formik.values = Object.assign(
		formik.values,
		{
			uploadedImage: imageUpload
		},
		{
			activityType: valuesRadio
		},
		{
			activityCategory: valuesCheck
		},
		{
			haveLecturedBefore: valuesSelect
		},
		{
			activityId: Math.floor(Math.random() * 1000).toString()
		}
	);

	return (
		<div>
			<Row gutter={[ 16, 24 ]}>
				<Divider orientation="left">Submissão de atividades</Divider>
			</Row>
			<Row justify="center" style={{ marginBottom: 20 }}>
				Para participar, basta preencher o formulário e aguardar o contato da equipe organizadora do evento
			</Row>
			<Row justify="center" className="row-table">
				<Form onFinish={formik.handleSubmit} layout="vertical" style={{ width: '70%' }}>
					{/* Nome completo */}
					<Form.Item
						label="Nome completo:"
						rules={[ { required: true, message: 'Por favor, insira seu nome completo!' } ]}
					>
						<Input name="name" onChange={formik.handleChange} value={formik.values.name} />
					</Form.Item>

					{/* Email */}
					<Form.Item
						label="Email:"
						rules={[ { type: 'email', required: true, message: 'Por favor, insira um email válido!' } ]}
					>
						<Input name="email" onChange={formik.handleChange} value={formik.values.email} />
					</Form.Item>

					{/* Minibiografia */}
					<Form.Item label="Minibiografia:">
						<TextArea rows={4} name="miniBio" onChange={formik.handleChange} value={formik.values.apresentation} />
					</Form.Item>

					{/* Linkedin */}
					<Form.Item label="Linkedin:">
						<Input name="linkedin" onChange={formik.handleChange} value={formik.values.linkedinLink} />
					</Form.Item>

					{/* Facebook */}
					<Form.Item label="Facebook:">
						<Input name="facebook" onChange={formik.handleChange} value={formik.values.facebookLink} />
					</Form.Item>

					{/* Twitter */}
					<Form.Item label="Twitter:">
						<Input name="twitter" onChange={formik.handleChange} value={formik.values.twitterLink} />
					</Form.Item>

					{/* Instagram */}
					<Form.Item label="Instagram:">
						<Input name="instagram" onChange={formik.handleChange} value={formik.values.instagram} />
					</Form.Item>

					{/* Youtube */}
					<Form.Item label="Youtube:">
						<Input name="youtube" onChange={formik.handleChange} value={formik.values.youtube} />
					</Form.Item>

					{/* Link de algum trabalho relevante */}
					<Form.Item label="Github:">
						<Input name="github" onChange={formik.handleChange} value={formik.values.githubLink} />
					</Form.Item>

					{/* Já ministrou alguma atividade em eventos?  */}
					<Form.Item label="Já ministrou alguma atividade em eventos?">
						<Select
							name="haveLecturedBefore"
							placeholder="Selecione uma opção"
							onChange={formik.onChangeSelect}
							// {...formik.getFieldProps("haveLecturedBefore")}
						>
							<Option value={'Sim'}>Sim</Option>
							<Option value="Não">Não</Option>
						</Select>
					</Form.Item>

					{/* Tipo de atividade proposta */}
					<Form.Item
						label="Tipo de atividade proposta:"
						rules={[ { required: true, message: 'Por favor, informe um tipo de atividade' } ]}
					>
						<Radio.Group style={{ textAlign: 'left' }} onChange={formik.onChangeRadio} name="activityType">
							<Radio style={{ display: 'block' }} value="Palestra">
								Palestra (1 palestrante)
							</Radio>
							<Radio style={{ display: 'block' }} value="Painel">
								Painel (1 moderador + até 3 painelistas)
							</Radio>
							<Radio style={{ display: 'block' }} value="Workshop">
								Workshop (1 palestrante + até 2 facilitadores)
							</Radio>
						</Radio.Group>
					</Form.Item>

					{/* Segmento da atividade proposta */}
					<Form.Item
						label="Categoria da atividade proposta:"
						rules={[ { required: true, message: 'Por favor, informe pelo menos uma categoria!' } ]}
					>
						<Checkbox.Group style={{ textAlign: 'left' }} onChange={formik.onChangeCheck} name="activityCategory">
							<Checkbox style={({ display: 'block' }, { marginLeft: '8px' })} value="Segurança">
								Segurança
							</Checkbox>
							<Checkbox style={{ display: 'block' }} value="Criatividade/ Design / Entretenimento/ Marketing Digital">
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
						rules={[ { required: true, message: 'Por favor, insira um título para a atividade!' } ]}
					>
						<Input name="activityTitle" onChange={formik.handleChange} value={formik.values.activityTitle} />
					</Form.Item>

					{/* Descrição da atividade proposta */}
					<Form.Item
						label="Descrição da atividade proposta:"
						rules={[ { required: true, message: 'Por favor, insira uma descrição para a atividade!' } ]}
					>
						<TextArea
							rows={4}
							name="activityDescription"
							onChange={formik.handleChange}
							value={formik.values.activityDescription}
						/>
					</Form.Item>

					{/* Upload de imagem */}
					<Form.Item label="Upload de identidade visual da sua atividade:">
						<input type="file" name="file" onChange={formik.onChangeHandler} />
					</Form.Item>

					{/* Botão de envio do formulário */}
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Enviar
						</Button>
					</Form.Item>
				</Form>
			</Row>
		</div>
	);
};

export default LectureForm;
