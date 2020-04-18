import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Row, Col, Select, Avatar, Button, Divider, Descriptions, Spin } from 'antd'
import { FolderOutlined, LinkedinOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons'
import './style.scss'

const { Option } = Select
const { Item } = Descriptions

const Submission = () => {
	let { submissionId } = useParams()
	const [api, setApi] = useState([])
	const [status, setStatus] = useState('')
	let userPicture = localStorage.getItem('userPicture')
	const environment = 'http://localhost:3001'

	useEffect(() => {
		fetch(`${environment}/lectures/${submissionId}`)
			.then(res => res.json())
			.then(data => {
        setApi(data)
        setStatus(data.status)
      })
			.catch(err => console.error(err, 'Nenhuma palestra por aqui!'))
  }, [])

  function handleChange(value) {
    setStatus(value)
  }

	const submitEvaluation = () => {
    api.status = status

		fetch(`${environment}/lectures/${submissionId}`, {
			method: 'put',
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify(api)
		})
	}

	return (
		<>
      <Row gutter={[16, 24]}>
        <Divider orientation="left">
          Avaliação de Atividade
        </Divider>
      </Row>
			<Row justify='center' style={{ marginBottom: '2em' }}>
				<Col span={4}>
					<br />
					<Avatar shape="square" size={50} src={userPicture} />
					<br />
          <Descriptions layout="vertical">
            <Item label="Nome" span={3}>
              {api.name? `${api.name}` : 'Sem dados'}
            </Item>
            <Item label="Telefone" span={3}>
              {api.cellphone? `${api.cellphone}` : 'Sem dados'}
            </Item>
            <Item label="E-mail" span={3} style={{wordBreak: 'break-word'}}>
              {api.email? `${api.email}` : 'Sem dados'}
            </Item>
            <Item label="Mini biografia" span={3}>
              {api.miniBio? `${api.miniBio}` : 'Sem dados'}
            </Item>
            <Item>
              {api.linkedin ?
                <a href={`${api.linkedin}`}><LinkedinOutlined className="social-network" /></a>
                : <LinkedinOutlined className="social-network" />}
              {api.facebook ?
                <a href={`${api.facebook}`}><FacebookOutlined className="social-network" /></a>
                : <FacebookOutlined className="social-network" />}
              {api.twitter ?
                <a href={`${api.twitter}`}><TwitterOutlined className="social-network" /></a>
                : <TwitterOutlined className="social-network" />}
              {api.instagram ?
                <a href={`${api.instagram}`}><InstagramOutlined className="social-network" /></a>
                : <InstagramOutlined className="social-network" />}
              {api.youtube ?
                <a href={`${api.youtube}`}><YoutubeOutlined className="social-network" /></a>
                : <YoutubeOutlined className="social-network" />}
              {api.portfolio ?
                <a href={`${api.portfolio}`}><FolderOutlined className="social-network" /></a>
                : <FolderOutlined className="social-network" />}
            </Item>
          </Descriptions>
				</Col>
				<Col span={12}>
          <Descriptions layout="vertical" title={api.activityTitle}>
            <Item label="Descrição" span={3}>
              {api.activityDescription? `${api.activityDescription}` : 'Sem dados'}
            </Item>
            <Item label="Tipo" span={1}>
              {api.activityType ? `${(api.activityType)}` : 'Sem dados'}
            </Item>
            <Item label="Já palestrou?" span={2}>
              {api.haveLecturedBefore ? `${(api.haveLecturedBefore)}` : 'Sem dados'}
            </Item>
            <Item label="Categorias" span={3}>
              {api.activityCategory ? `${(api.activityCategory)} e ${(api.activityCategory)}` : 'Sem dados'}
            </Item>
            <Item label="Avaliação" span={3}>
              { api.length !== 0 ?
                <Select
                  style={{ width: 150, textTransform: 'uppercase' }}
                  value={status}
                  onChange={handleChange}
                >
                  <Option value="em análise">Em Análise</Option>
                  <Option value="aprovado">Aprovado</Option>
                  <Option value="reprovado">Reprovado</Option>
                </Select>
                  :
                <Spin size='large' />
              }
            </Item>
            <Item span={3}>
              <Button type='primary' onClick={submitEvaluation}>Enviar avaliação</Button>
            </Item>
          </Descriptions>
				</Col>
			</Row>
		</>
	)
}

export default Submission
