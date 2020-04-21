import React from 'react'
import { Row, Col, Card } from 'antd'
import { downloadCSVFromJson } from './../../utils/convertToCSV'
import { getEnvironment } from './../../utils/environment'
import { Link } from 'react-router-dom'
import { Header } from './../../components/Header'

const LecturesCSV = () => {
	const environment = getEnvironment()
	const userId = localStorage.getItem('userId')

	fetch(`${environment}/lectures?userId=${userId}`)
		.then((res) => res.json())
		.then((data) => {
			// Convertendo arrays em string para não dar problema na hora de converter para csv
			data.map(lecture => lecture.interests = lecture.interests.toString())
			data.map(lecture => lecture.activityCategory = lecture.activityCategory.toString())
			downloadCSVFromJson('palestras.csv', data)
		})
		.catch((err) => console.error(err, 'Nenhuma palestra encontrada'))

	return (
		<div>
			<Header text="Minhas palestras" />
			<Row style={{ marginBottom: 30 }}>
				<Col span={16} offset={4}>
					<Card>
						<div className="content-events">
							<span>O download deverá iniciar automaticamente.</span>
							<br />
							<span>Se isso não acontecer, verifique se o navegador não está bloqueando downloads.</span>
							<br />
							<span>
								{' '}Clique{' '}
								<Link to="/lectures">
									<span style={{ color: 'black' }}>aqui</span>
								</Link>
								{' '}para voltar
						</span>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default LecturesCSV
