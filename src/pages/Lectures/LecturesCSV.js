import React from 'react';
import { Row, Col, Divider } from 'antd';
import { downloadCSVFromJson } from './../../utils/convertToCSV';
import { getEnvironment } from './../../utils/environment';
import { Link } from 'react-router-dom';

const LecturesCSV = () => {
	const environment = getEnvironment();

	fetch(`${environment}/lectures`)
		.then((res) => res.json())
		.then((data) => {
			downloadCSVFromJson('palestras.csv', data);
		})
		.catch((err) => console.error(err, 'Nenhuma palestra encontrada'));

	return (
		<div>
			<Row gutter={[ 16, 24 ]}>
				<Divider orientation="left">Minhas palestras</Divider>
			</Row>
			<Row style={{ marginBottom: 30 }}>
				<Col span={16} offset={4}>
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
				</Col>
			</Row>
		</div>
	);
};

export default LecturesCSV;
