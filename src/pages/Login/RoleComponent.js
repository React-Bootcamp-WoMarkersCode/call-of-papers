import React, { useState, useEffect } from 'react'
import { Row, Card, Button, Col, notification } from 'antd'
import { useHistory } from 'react-router-dom'
import { getEnvironment } from './../../utils/environment'
import Header from './../../components/Header'
import './style.scss'

const RoleComponent = () => {
	const [ role, setRole ] = useState('')
	const [ profile, setProfile ] = useState([])
	const [ loading, setLoading ] = useState(false)
	const environment = getEnvironment()
	const history = useHistory()

	const openNotification = (type, description) => {
		notification[type]({
			message: type === 'success' ? 'Sucesso!' : 'Ops! Algo deu errado!',
			description: description
		})
	}

	useEffect(
		() => {
			fetch(`${environment}/profiles/` + localStorage.getItem('userId'))
				.then((res) => res.json())
				.then((data) => {
					setProfile(data.find((profile) => profile.id === localStorage.getItem('userId')))
				})
				.catch((err) => console.error(err, 'Nenhum usuário encontrado'))
		},
		[ environment ]
	)

	const handleSubmit = () => {
    setLoading(true)

		fetch(`${environment}/profiles/` + localStorage.getItem('userId'), {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...profile,
				role: role
			})
		})
			.then(() => {
        localStorage.setItem('userRole', role)
        setLoading(false)
				openNotification('success', 'Cadastro realizado com sucesso!')
				history.push('/')
			})
			.catch((err) => {
        console.error(err)
        setLoading(false)
				openNotification('error', 'Não foi possível finalizar seu cadastro! Tente novamente!')
      })
	}

	return (
		<>
			<Header text="QUEM É VOCÊ ?" />
			<Row style={{ marginBottom: '1rem', fontSize: '16px', fontWeight: 'bold' }}>Complete o seu cadastro!</Row>
			<Row style={{ marginBottom: '1rem' }}>Depois é possível mudar essa opção no seu perfil.</Row>
			<Row justify="space-between">
				<Col xs={{ span: 12 }} md={{ span: 6 }}>
					<Card
						hoverable
						className={[ 'login-card', role === 'Producer' ? 'card-selected' : '' ]}
						onClick={() => setRole('Producer')}
					>
						<Row justify="center">
							<img src={require('../../assets/events-producer.png')} alt="Produtor de evento" />
							<span className="card-span">Sou produtor de eventos</span>
						</Row>
					</Card>
				</Col>
				<Col xs={{ span: 12 }} md={{ span: 6 }}>
					<Card
						hoverable
						className={[ 'login-card', role === 'Speaker' ? 'card-selected' : '' ]}
						onClick={() => setRole('Speaker')}
					>
						<Row justify="center">
							<img src={require('../../assets/speaker.png')} alt="Palestrante" />
							<span className="card-span">Sou palestrante</span>
						</Row>
					</Card>
				</Col>
				<Col xs={{ span: 12 }} md={{ span: 6 }}>
					<Card
						hoverable
						className={[ 'login-card', role === 'Both' ? 'card-selected' : '' ]}
						onClick={() => setRole('Both')}
					>
						<Row justify="center">
							<img src={require('../../assets/both.png')} alt="Produtor e palestrante" />
							<span className="card-span">Sou ambos</span>
						</Row>
					</Card>
				</Col>
			</Row>
			<Row justify="center" style={{ marginTop: '1.5rem' }}>
				<Button
					type="default"
					className="btn-outline"
					disabled={role === ''}
          onClick={() => handleSubmit() }
          loading={loading}
				>
					Completar cadastro
				</Button>
			</Row>
		</>
	)
}

export default RoleComponent
