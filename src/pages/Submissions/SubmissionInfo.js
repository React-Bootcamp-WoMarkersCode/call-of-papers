import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Descriptions, Typography, Tag, Avatar, Space, Card } from 'antd'
import { faEnvelope, faPhoneAlt, faUser } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faLinkedin, faTwitter, faInstagram, faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons"
import './style.scss'

const { Item } = Descriptions
const { Title } = Typography

const SubmissionInfo = ({ lecture, headerCard, footerCard }) => {
  return (
    <>
      <Row style={{ marginBottom: '20px' }} className='submission-info-container'>
        <Col xs={{ span: 22, offset:1 }} md={{ span:16, offset:4 }}>
          <Card>
            <Col style={{ marginBottom: '8px' }}>
              {headerCard && headerCard(lecture)}
            </Col>
            <Row justify='start'>
              <Title level={4}>
                Palestrante
              </Title>
            </Row>
            <Row style={{ marginBottom: '2em' }}>
              <Col xs={{ span: 24 }} md={{ span: 7 }}>
                <Space direction='vertical'>
                  <Space>
                    <Avatar size={50} src={lecture.userPicture && lecture.userPicture} ><FontAwesomeIcon icon={faUser} /></Avatar>
                    <Item>
                      {lecture.name ? `${lecture.name}` : 'Sem dados'}
                    </Item>
                  </Space>
                  <Space direction='horizontal'>
                    <FontAwesomeIcon icon={faPhoneAlt} />
                    <Item label="Telefone" span={3}>
                      {lecture.cellphone ? `${lecture.cellphone}` : 'Sem dados'}
                    </Item>
                  </Space>
                  <Space direction='horizontal'>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <Item label="E-mail" span={3} style={{ wordBreak: 'break-word' }}>
                      {lecture.email ? `${lecture.email}` : 'Sem dados'}
                    </Item>
                  </Space>
                  <Item justify='center'>
                    <Tag
                      style={{ marginBottom: '8px' }}
                      key={lecture.haveLecturedBefore === "Não" ? 'nao' : 'sim'}
                    >
                      Primeira palestra
                    </Tag>
                  </Item>
                </Space>
              </Col>
              <Col>
                <div className="line-vertical"></div>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 15, offset: 1 }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Item span={3} style={{ textAlign: 'justify' }}>
                  {lecture.apresentation ? `${lecture.apresentation}` : 'Sem dados'}
                </Item>
                <Item >
                  <Space direction='horizontal' style={{ fontSize: '1.75em' }}>
                    {lecture.facebookLink ?
                      <a target="_blank" rel="noopener noreferrer" href={`${lecture.facebookLink}`}><FontAwesomeIcon icon={faFacebook} /> </a>
                      : <FontAwesomeIcon icon={faFacebook} />}
                    {lecture.linkedinLink ?
                      <a target="_blank" rel="noopener noreferrer" href={`${lecture.linkedinLink}`}><FontAwesomeIcon icon={faLinkedin} /></a>
                      : <FontAwesomeIcon icon={faLinkedin} />}
                    {lecture.githubLink ?
                      <a target="_blank" rel="noopener noreferrer" href={`${lecture.githubLink}`}><FontAwesomeIcon icon={faGithub} /></a>
                      : <FontAwesomeIcon icon={faGithub} />}
                    {lecture.twitter ?
                      <a target="_blank" rel="noopener noreferrer" href={`${lecture.twitter}`}><FontAwesomeIcon icon={faTwitter} /></a>
                      : <FontAwesomeIcon icon={faTwitter} />}
                    {lecture.instagram ?
                      <a target="_blank" rel="noopener noreferrer" href={`${lecture.instagram}`}><FontAwesomeIcon icon={faInstagram} /></a>
                      : <FontAwesomeIcon icon={faInstagram} />}
                    {lecture.youtube ?
                      <a target="_blank" rel="noopener noreferrer" href={`${lecture.youtube}`}><FontAwesomeIcon icon={faYoutube} /></a>
                      : <FontAwesomeIcon icon={faYoutube} />}
                  </Space>
                </Item>
              </Col>
            </Row>
            <Row justify='start'>
              <Title level={4}>Atividade</Title>
            </Row>
            <Row justify='center' >
              <Col>
                <Descriptions layout="vertical" title={lecture.activityTitle} type='secundary' style={{ textAlign: 'justify' }}>
                  <Item span={3}>
                    {lecture.activityDescription ? `${lecture.activityDescription}` : 'Sem dados'}
                  </Item>
                  <Item>
                    <Tag style={{ marginBottom: '8px' }} key='tipo-atividade'>{lecture.activityType}</Tag>
                    {lecture.activityCategory ? lecture.activityCategory.map(category => <Tag style={{ marginBottom: '8px' }} key={category}>{category}</Tag>) : ''}
                  </Item>
                </Descriptions>
              </Col>
            </Row>
            {footerCard && footerCard(lecture)}
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default SubmissionInfo
