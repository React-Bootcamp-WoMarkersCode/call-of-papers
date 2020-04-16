import React, { useState } from 'react'
import { Row, Button, Divider } from 'antd'
import { getEnvironment } from './../../utils/environment'
import './lectures-list.scss'
import { Formik } from 'formik'
import {
	Checkbox,
	Input,
	Radio,
	Select,
	Form
} from 'formik-antd'

const { TextArea } = Input

const LectureForm = () => {
	let [ profile, setProfile ] = useState([])
	const environment = getEnvironment()
	const [ imageUpload, setImageUpload ] = useState()
  let userEmail = localStorage.getItem('userEmail')
	let userPicture = localStorage.getItem('userPicture')

  const onChangeHandler = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      setImageUpload(reader.result)
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
  }

  const handleSubmit = (values) => {
    fetch(`${environment}/lectures`, {
      method: 'post',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(values)
    }).then(function (response) {
        alert('Atividade cadastrada com sucesso!')
        return response.json()
    }).catch(function (error) {
        alert(`Erro ao cadastrar: ${error}`)
    })
  }


  const fetchProfile = () => {
    const res = fetch(`${environment}/profiles`)
    res
      .json()
      .then(res => setProfile(res.find((profile) => profile.id === localStorage.getItem('userId'))))
      .catch((err) => console.error(err, 'Nenhum usuário encontrado'))
  }

  fetchProfile()

	if (!userEmail) {
		userEmail = ''
	}

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
		activityType: '',
		activityCategory: [],
		haveLecturedBefore: ''
	}

	return (
		<>
			<Row gutter={[ 16, 24 ]}>
				<Divider orientation="left">Submissão de atividades</Divider>
			</Row>
			<Row justify="center" style={{ marginBottom: 20 }}>
				Para participar, basta preencher o formulário e aguardar o contato da equipe organizadora do evento
			</Row>
			<Row justify="center" className="row-table">
				<Formik
					initialValues={profile}
					onSubmit={handleSubmit}
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
										rules={[ { type: 'email', required: true, message: 'Por favor, insira um email válido!' } ]}
									>
										<Input name="email" />
									</Form.Item>

									{/* Minibiografia */}
									<Form.Item label="Minibiografia:" name="apresentation">
										<TextArea rows={4} name="miniBio" />
									</Form.Item>

									{/* Linkedin */}
									<Form.Item label="Linkedin:" name="linkedinLink">
										<Input name="linkedin" />
									</Form.Item>

									{/* Facebook */}
									<Form.Item label="Facebook:" name="facebookLink">
										<Input name="facebook" />
									</Form.Item>

									{/* Twitter */}
									<Form.Item label="Twitter:" name="twitterLink">
										<Input name="twitter" />
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
										<Input name="github" />
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

                  {/* Upload de imagem */}
                  <Form.Item label="Upload de identidade visual da sua atividade:" name="uploadedImage">
                    <input type="file" name="uploadedImage" onChange={onChangeHandler} />
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

export default LectureForm
