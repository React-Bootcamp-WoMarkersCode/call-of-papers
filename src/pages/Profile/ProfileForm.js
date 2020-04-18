import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { getEnvironment } from './../../utils/environment'
import { Form, Input, Row, Col, Button, Divider } from 'antd'
import './style.scss'

const ProfileForm = () => {
	let history = useHistory()
	const environment = getEnvironment()
	const [ profile, setProfile ] = useState([])

	useEffect(() => {
		fetch(`${environment}/profiles`)
			.then((res) => res.json())
			.then((data) => {
				setProfile(data.find((profile) => profile.id === localStorage.getItem('userId')))
			})
			.catch((err) => console.error(err, 'Nenhum usuário encontrado'))
	}, [])

	let formik = useFormik({
		initialValues: profile,
		enableReinitialize: true,
		onSubmit: (values) => {
			let interestsArray =
				values.interests && values.interests.includes(',') ? values.interests.split(',') : values.interests

			fetch(`${environment}/profiles/` + values.id, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: values.id,
					email: values.email,
					localization: values.localization,
					registerDate: values.registerDate,
					apresentation: values.apresentation,
					githubLink: values.githubLink,
					linkedinLink: values.linkedinLink,
					twitterLink: values.twitterLink,
					facebookLink: values.facebookLink,
					mediumLink: values.mediumLink,
					interests: interestsArray
				})
			})
				.then((response) => {
					response.json().then((response) => {
						console.log('Perfil atualizado com sucesso')
						history.push('/profile')
					})
				})
				.catch((err) => {
					console.error(err)
				})
		}
	})

	return (
		<>
			<Row gutter={[16, 24]}>
        <Divider orientation='left'>
          Edição de Perfil
        </Divider>
      </Row>
			<Row gutter={[16, 24]}>
				<Col span={14} offset={5}>
					<Form onFinish={formik.handleSubmit} layout='vertical'>
						<Form.Item label='Apresentação'>
							<Input.TextArea
								rows={4}
								name='apresentation'
								onChange={formik.handleChange}
								value={formik.values.apresentation}
							/>
						</Form.Item>

						<Form.Item label='E-mail'>
							<Input name='email' onChange={formik.handleChange} value={formik.values.email} />
						</Form.Item>

						<Form.Item label='Localização'>
							<Input name='localization' onChange={formik.handleChange} value={formik.values.localization} />
						</Form.Item>

						<Form.Item label='Link do Github'>
							<Input name='githubLink' onChange={formik.handleChange} value={formik.values.githubLink} />
						</Form.Item>

						<Form.Item label='Link do Linkedin'>
							<Input name='linkedinLink' onChange={formik.handleChange} value={formik.values.linkedinLink} />
						</Form.Item>

						<Form.Item label='Link do Twitter'>
							<Input name='twitterLink' onChange={formik.handleChange} value={formik.values.twitterLink} />
						</Form.Item>

						<Form.Item label='Link do Facebook'>
							<Input name='facebookLink' onChange={formik.handleChange} value={formik.values.facebookLink} />
						</Form.Item>

						<Form.Item label='Link do Medium'>
							<Input name='mediumLink' onChange={formik.handleChange} value={formik.values.mediumLink} />
						</Form.Item>

						<Form.Item label='Interesses (Separe com vírgulas, por ex.: react, angular, vue)'>
							<Input name='interests' onChange={formik.handleChange} value={formik.values.interests} />
						</Form.Item>

						<Form.Item>
							<Button type='primary' htmlType='submit'>
								Salvar
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</>
	)
}

export default ProfileForm
