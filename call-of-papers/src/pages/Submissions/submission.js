import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Row, Col, Select, Avatar, Button } from 'antd'
import { FolderOutlined, LinkedinOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
import './style.scss'

const { Option } = Select;

const Submission = () => {
    let { submissionId } = useParams()
    const [api, setApi] = useState([])
    const [status, setStatus] = useState('')
    const [habilitado, setHabilitado] = useState(false)
    let userPicture = localStorage.getItem('userPicture')
    const environment = 'http://localhost:3001';

    useEffect(() => {
        fetch(`${environment}/lectures/${submissionId}`)
            .then(res => res.json())
            .then(data => {
                setApi(data)
            })
            .catch(err => console.error(err, 'Nenhuma palestra por aqui!'))
    }, [])
    const handleChange = () => {
        api.status = status;
        setHabilitado(true)
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
            <Row justify='center'>
                <Col span={4} style={{ textAlign: 'center', paddingRight: '10px' }}>
                    <br />
                    <Avatar shape="square" size={50} src={userPicture} />
                    <br />
                    <p className="palestrante-infos">Nome: {api.name}</p>
                    <p className="palestrante-infos">Telefone: {api.cellphone}</p>
                    <p className="palestrante-infos">Email: {api.email}</p>
                    <p className="palestrante-infos">Minibiografia: {api.miniBio}</p>
                    <div>
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
                    </div>


                </Col>
                <Col span={12}>
                    <div>
                        <h1>{api.activityTitle}</h1>
                    </div>
                    <div style={{ textAlign: 'justify' }}>
                        <h3 className="palestra-infos">Descrição:</h3>
                        <p>{api.activityDescription}</p>
                        <h3 className="palestra-infos">Tipo:</h3>
                        <p>{api.activityType}</p>
                        <h3 className="palestra-infos">Categoria:</h3>
                        <p>{api.activityCategory}</p>
                        <h3 className="palestra-infos">Já palestrou?</h3>
                        <p>{api.haveLecturedBefore}</p>
                    </div>
                    <div>
                        <h3 className="palestra-infos">Status:</h3>
                        {
                            api.status === "in-analysis" ?
                                <Select
                                    style={{ width: 150, textTransform:'uppercase' }}
                                    value={api.status}
                                    onChange={setStatus}
                                    defaultValue={api.status}
                                    disabled={habilitado}
                                >
                                    <Option value="in-analysis">in-analysis</Option>
                                    <Option value="approved">approved</Option>
                                    <Option value="rejected">rejected</Option>
                                </Select>
                                :
                                <Select
                                    style={{ width: 150, textTransform:'uppercase' }}
                                    value={api.status}
                                    defaultValue={api.status}
                                    disabled='true'
                                />
                        }

                        <Button onClick={handleChange}>Enviar avaliação</Button>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Submission