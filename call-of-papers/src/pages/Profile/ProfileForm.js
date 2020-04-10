import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useHistory } from 'react-router-dom'
import { getEnvironment } from './../../utils/environment'
import { Form, Input, Row, Col, Button } from 'antd'

const ProfileForm = () => {
    let history = useHistory()

    const [profile, setProfile] = useState([])

    useEffect(() => {
        fetch(`${getEnvironment()}/profiles`)
            .then(res => res.json())
            .then(data => {
                setProfile(data.find(profile => profile.id === localStorage.getItem('userId')))
            })
            .catch(err => console.error(err, 'Nenhum usuário encontrado'))
    }, [])

    let formik = useFormik({
        initialValues: profile,
        enableReinitialize: true,
        onSubmit: values => {

            let interestsArray = values.interests? values.interests.split(',') : values.interests

            fetch(`${getEnvironment()}/profiles/` + values.id, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": values.id,
                    "localization": values.localization,
                    "registerDate": values.registerDate,
                    "apresentation": values.apresentation,
                    "githubLink": values.githubLink,
                    "linkedinLink": values.linkedinLink,
                    "twitterLink": values.twitterLink,
                    "facebookLink": values.facebookLink,
                    "mediumLink": values.mediumLink,
                    "interests": interestsArray
                })
            }).then((response) => {
                response.json().then((response) => {
                    console.log("Perfil atualizado com sucesso");
                    history.push('/profile')
                })
            }).catch(err => {
                console.error(err)
            })
        }
    })

    return (
        <div className='listed'>
            <Row>
                <Col span={16} offset={4}>
                    <h2>Edição de Perfil</h2>
                </Col>
            </Row>
            <Row style={{ marginBottom: 30 }}>
                <Col span={14} offset={5}>
                    <Form onFinish={formik.handleSubmit}
                        layout="vertical"
                    >
                        <p>Nome: {`${localStorage.getItem('userName')}`}</p>

                        <Form.Item label="Apresentação">
                            <Input.TextArea rows={4} name="apresentation" onChange={formik.handleChange} value={formik.values.apresentation} />
                        </Form.Item>

                        <Form.Item label="Localização">
                            <Input name="localization" onChange={formik.handleChange} value={formik.values.localization} />
                        </Form.Item>

                        <Form.Item label="Link do Github">
                            <Input name="githubLink" onChange={formik.handleChange} value={formik.values.githubLink} />
                        </Form.Item>

                        <Form.Item label="Link do Linkedin">
                            <Input name="linkedinLink" onChange={formik.handleChange} value={formik.values.linkedinLink} />
                        </Form.Item>

                        <Form.Item label="Link do Twitter">
                            <Input name="twitterLink" onChange={formik.handleChange} value={formik.values.twitterLink} />
                        </Form.Item>

                        <Form.Item label="Link do Facebook">
                            <Input name="facebookLink" onChange={formik.handleChange} value={formik.values.facebookLink} />
                        </Form.Item>

                        <Form.Item label="Link do Medium">
                            <Input name="mediumLink" onChange={formik.handleChange} value={formik.values.mediumLink} />
                        </Form.Item>

                        <Form.Item label="Interesses (Separe com vírgulas, por ex.: react, angular, vue)">
                            <Input name="interests" onChange={formik.handleChange} value={formik.values.interests} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Enviar
                            </Button>

                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}


export default ProfileForm