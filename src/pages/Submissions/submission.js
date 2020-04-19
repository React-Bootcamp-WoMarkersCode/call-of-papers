import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import { Row, Col, Select, Button, Divider, Descriptions, Spin } from 'antd'
import { FolderOutlined, LinkedinOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons'
import './style.scss'
import Email from '../../utils/Email/Email'

const { Option } = Select
const { Item } = Descriptions

const Submission = () => {
  let { submissionId } = useParams()
  let history = useHistory()
  console.log(history)
	const [api, setApi] = useState([])
  const [status, setStatus] = useState('')
  const [desabilitado, setDesabilitado] = useState(false)
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
    setDesabilitado(true)

		fetch(`${environment}/lectures/${submissionId}`, {
			method: 'put',
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify(api)
    })

    let message = ''

    if (api.status === 'APROVADA') {
      message =
        `<p>Olá ${api.name}, tudo bem?</p>
        <p>Parabéns! A palestra "${api.activityTitle}" foi aprovada. Consulte mais informações no site.</p>
        <p><i>Sharing Talks</i></p>`
    } else {
      message =
        `<p>Olá ${api.name}, tudo bem?</p>
        <p>Infelizmente a palestra "${api.activityTitle}" foi reprovada. Consulte mais informações no site.</p>
        <p><i>Sharing Talks</i></p>`
    }

    Email(api.name, api.email, message)
    alert(`Palestra ${api.status.toLowerCase()}!`)
    history.goBack()
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
          <Descriptions layout="vertical" style={{textAlign:'justify'}}>
            <Item label="Palestrante" span={3}>
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
          <Descriptions layout="vertical" title={api.activityTitle} style={{textAlign:'justify'}}>
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
                  <Option value="APROVADA">APROVADA</Option>
                  <Option value="REPROVADA">REPROVADA</Option>
                </Select>
                  :
                <Spin size='large' />
              }
            </Item>
            <Item span={3}>
              {
                api.status ==='EM ANÁLISE'?
                <Button type='primary' onClick={submitEvaluation} disabled={desabilitado}>Enviar avaliação</Button>
                :
                <Button type='primary' onClick={submitEvaluation} disabled='true'>Enviar avaliação</Button>
              }
            </Item>
          </Descriptions>
				</Col>
			</Row>
		</>
	)
}

export default Submission
