import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Row, Col, Divider, Descriptions, Typography, Tag, Avatar, Space } from 'antd'
import { FolderOutlined, LinkedinOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined, UserOutlined } from '@ant-design/icons'
import './style.scss'
import { auto } from 'async'

const { Item } = Descriptions
const { Title } = Typography

const SubmissionInAnalysis = () => {
    let { submissionId } = useParams()
    const [lecture, setLecture] = useState([])
    const environment = 'http://localhost:3001'

    useEffect(() => {
        fetch(`${environment}/lectures/${submissionId}`)
            .then(res => res.json())
            .then(lecture =>
                setLecture(lecture))
            .catch(err => console.error(err, 'Nenhuma palestra por aqui!'))
    }, [environment, submissionId])

    return (
        <>
            <Row gutter={[16, 24]}>
                <Divider orientation="left">
                    Palestra
                </Divider>
            </Row>
            <Row justify='start' style={{ marginLeft: '350px' }}>
                <Title level={4}>
                    Palestrante
                </Title>
            </Row>
            <Row justify='center' style={{ marginBottom: '2em' }}>
                <Col span={4}>
                    <Space>
                        <Avatar size={50} src={lecture.uploadedImage} />
                        <Descriptions layout="vertical" style={{ textAlign: 'justify' }}>
                            <Item>
                                {lecture.name ? `${lecture.name}` : 'Sem dados'}
                            </Item>
                        </Descriptions>
                    </Space>
                    <Descriptions layout="vertical" style={{ textAlign: 'justify' }}>

                        <Item label="Telefone" span={3}>
                            {lecture.cellphone ? `${lecture.cellphone}` : 'Sem dados'}
                        </Item>
                        <Item label="E-mail" span={3} style={{ wordBreak: 'break-word' }}>
                            {lecture.email ? `${lecture.email}` : 'Sem dados'}
                        </Item>
                    </Descriptions>
                </Col>
                <Col span={8}>
                    <Descriptions>
                        <Item label="Mini biografia" span={3}>
                            {lecture.miniBio ? `${lecture.miniBio}` : 'Sem dados'}
                        </Item>
                        <Item>
                            {lecture.linkedin ?
                                <a href={`${lecture.linkedin}`}><LinkedinOutlined className="social-network" /></a>
                                : <LinkedinOutlined className="social-network" />}
                            {lecture.facebook ?
                                <a href={`${lecture.facebook}`}><FacebookOutlined className="social-network" /></a>
                                : <FacebookOutlined className="social-network" />}
                            {lecture.twitter ?
                                <a href={`${lecture.twitter}`}><TwitterOutlined className="social-network" /></a>
                                : <TwitterOutlined className="social-network" />}
                            {lecture.instagram ?
                                <a href={`${lecture.instagram}`}><InstagramOutlined className="social-network" /></a>
                                : <InstagramOutlined className="social-network" />}
                            {lecture.youtube ?
                                <a href={`${lecture.youtube}`}><YoutubeOutlined className="social-network" /></a>
                                : <YoutubeOutlined className="social-network" />}
                            {lecture.portfolio ?
                                <a href={`${lecture.portfolio}`}><FolderOutlined className="social-network" /></a>
                                : <FolderOutlined className="social-network" />}
                        </Item>
                    </Descriptions>
                </Col>
            </Row>
            <Row justify='start' style={{ marginLeft: '350px' }}>
                <Title level={4}>
                    Atividade
                </Title>
            </Row>
            <Row justify='center' style={{ marginBottom: '2em' }}>
                <Col span={12}>
                    <Descriptions layout="vertical" title={lecture.activityTitle} style={{ textAlign: 'justify' }}>
                        <Item label="Descrição" span={3}>
                            {lecture.activityDescription ? `${lecture.activityDescription}` : 'Sem dados'}
                        </Item>
                        <Tag>{lecture.activityType}</Tag>
                        <Item label="Já palestrou?" span={2}>
                            {lecture.haveLecturedBefore ? `${(lecture.haveLecturedBefore)}` : 'Sem dados'}
                        </Item>
                        <Item label="Categorias" span={3}>
                            {lecture.activityCategory ? `${(lecture.activityCategory)} e ${(lecture.activityCategory)}` : 'Sem dados'}
                        </Item>
                    </Descriptions>
                </Col>
            </Row>


        </>
    )
}

export default SubmissionInAnalysis