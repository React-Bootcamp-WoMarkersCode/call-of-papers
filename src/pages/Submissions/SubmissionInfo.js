import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Divider, Descriptions, Typography, Tag, Avatar, Space } from 'antd'
import { faEnvelope, faPhoneAlt, faUser } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faLinkedin, faTwitter, faInstagram, faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons"
import './style.scss'

const { Item } = Descriptions
const { Title } = Typography

const SubmissionInfo = ({ lecture }) => {
  return (
    <>
      <Row justify='start' style={{ marginLeft: '350px' }}>
        <Title level={4}>
          Palestrante
        </Title>
      </Row>
      <Row gutter={16} justify='center' style={{ marginBottom: '2em' }}>
        <Col span={5}>
          <Space direction='vertical'>
            <Space>
              <Avatar size={50} src={lecture.uploadedImage && lecture.uploadedImage} ><FontAwesomeIcon icon={faUser} /></Avatar>
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
        <Divider type='vertical' style={{ height: 'auto', border: '1px solid' }} orientation='center' />
        <Col span={7}>
          <Descriptions>
            <Item span={3} style={{ textAlign: 'justify' }}>
              {lecture.miniBio ? `${lecture.miniBio}` : 'Sem dados'}
            </Item>
            <Item >
              <Space direction='horizontal' style={{ fontSize: '1.75em' }}>
                {lecture.facebookLink ?
                  <a href={`${lecture.facebookLink}`}><FontAwesomeIcon icon={faFacebook} /> </a>
                  : <FontAwesomeIcon icon={faFacebook} />}
                {lecture.linkedinLink ?
                  <a href={`${lecture.linkedinLink}`}><FontAwesomeIcon icon={faLinkedin} /></a>
                  : <FontAwesomeIcon icon={faLinkedin} />}
                {lecture.githubLink ?
                  <a href={`${lecture.githubLink}`}><FontAwesomeIcon icon={faGithub} /></a>
                  : <FontAwesomeIcon icon={faGithub} />}
                {lecture.twitter ?
                  <a href={`${lecture.twitter}`}><FontAwesomeIcon icon={faTwitter} /></a>
                  : <FontAwesomeIcon icon={faTwitter} />}
                {lecture.instagram ?
                  <a href={`${lecture.instagram}`}><FontAwesomeIcon icon={faInstagram} /></a>
                  : <FontAwesomeIcon icon={faInstagram} />}
                {lecture.youtube ?
                  <a href={`${lecture.youtube}`}><FontAwesomeIcon icon={faYoutube} /></a>
                  : <FontAwesomeIcon icon={faYoutube} />}
              </Space>
            </Item>
          </Descriptions>
        </Col>
      </Row>
      <Row justify='start' style={{ marginLeft: '350px' }}>
        <Title level={4}>Atividade</Title>
      </Row>
      <Row justify='center' >
        <Col span={12}>
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
    </>
  )
}

export default SubmissionInfo
