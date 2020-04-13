import React from 'react'
import { Row, Col } from 'antd'
import { downloadCSVFromJson } from './../../utils/convertToCSV'
import { getEnvironment } from './../../utils/environment'
import { Link } from 'react-router-dom'

const LecturesCSV = () => {

    const environment = getEnvironment()

    fetch(`${environment}/lectures`)
        .then(res => res.json())
        .then(data => {
            downloadCSVFromJson('palestras.csv', data)
        })
        .catch(err => console.error(err, 'Nenhuma palestra encontrada'))

    return (
    <Row style={{ marginBottom: 30 }}>
      <Col span={16} offset={4}>
        <div className="content-events">
        <span>O download deverá iniciar automaticamente</span>
        <br />
        <span>Se isso não acontecer, verifique se o navegador não está bloqueando downloads</span>
        <br />
        <span> Clique <Link to='/lectures'>aqui</Link> para voltar</span>
        </div>
      </Col>
    </Row>
    )
}

export default LecturesCSV