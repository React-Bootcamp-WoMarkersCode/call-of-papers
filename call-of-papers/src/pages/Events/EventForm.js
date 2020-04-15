import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Input, Checkbox, Radio, Button } from 'antd'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'

import { getEnvironment } from './../../utils/environment'

let bodyApi = {}

let idEventLocal;

const { TextArea } = Input;

const EventForm = () => {
    const [values, setValuesChecked] = useState([]);
    const [radio, setValuesRadio] = useState([]);
    const [partner, setValuesPartner] = useState([]);
    const [dados, setDados] = useState([]);

    const environment = getEnvironment();

    useEffect(() => {
        idEventLocal = JSON.parse(localStorage.getItem("idEvent"));

        fetch(`${environment}/events/`)
            .then(res => res.json())
            .then(data => {
                setDados(data.find(formEvent => formEvent.id === idEventLocal))                
            })
            .catch(err => console.error(err, 'Nenhum evento por aqui!'))
        }, [])

    let formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            event: '',
            description: '',
            local: '',
            schedule: '',
            organizer: '',
            categories: [],
            limited_spaces: '',
            partners: [],
            dados,
        }
    })
   

    const onChangeCategories = (categories) => {
        setValuesChecked(categories)
    }
    const onChangeSpaces = (spaces) => {
        setValuesRadio(spaces.target.value);
    }
    const onChangePartners = (partners) => {
        setValuesPartner(partners);
    }

    const { event, description, local, schedule, organizer } = formik.values;

    bodyApi = {
        event,
        description,
        schedule,
        local,
        organizer,
        categories: values,
        limited_spaces: radio,
        partners: partner
    }

    console.log(formik.values.dados);
    

    const history = useHistory();
    
    function onsubmit() {
        fetch(`${environment}/events`, {
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(bodyApi)
        }).then(function (response) {
            alert('Evento cadastrado com sucesso!');
            history.push("/events");
            return response.json();
        }).catch(function (error) {
            alert(`Erro ao cadastrar: ${error}`)
        })
    }

    return (
        <Row style={{ marginTop: 30 }}>
            <Col span={16} offset={4}>
                {
                    idEventLocal ?
                        <h1>Edite o evento</h1> :
                        <h1>Crie um evento</h1>
                }
                <Form layout="vertical">
                   
                   {/* Nome do evento */}
                    <Form.Item
                        label="Nome do evento:"
                        htmlFor="event"
                        rules={[{ required: true, message: 'Preencha corretamente o campo de evento!' }]}>
                        <Input name="event" placeholder="Digite o nome do evento" 
                            onChange={formik.handleChange} 
                            value={formik.values.dados? formik.values.dados.event: ''}/>
                    </Form.Item>

                    {/* Descrição do evento */}
                    <Form.Item
                        label="Descrição do evento:"
                        htmlFor="description"
                        rules={[{ required: true, message: 'Preencha corretamente o campo de descrição do evento.' }]}>
                        <TextArea name="description" placeholder="Digite a descrição do evento (sobre o evento, agenda, regras...)"
                            onChange={formik.handleChange}
                            value={formik.values.dados? formik.values.dados.description:''}/>
                    </Form.Item>
                    <Row>
                        <Col span={12} style={{ paddingRight: 10 }}>

                            {/* Data-Horário do evento */}
                            <Form.Item
                                label="Data/Horário do evento:"
                                htmlFor="schedule"
                                rules={[{ required: false }]}>
                                <Input name="schedule" placeholder="Digite a data e horário" 
                                    onChange={formik.handleChange}
                                    value={formik.values.dados? formik.values.dados.schedule: ''}/>
                                <small>Exemplo: 18 Abril, 07:30</small>
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ paddingLeft: 10 }}>

                            {/* Local do evento */}
                            <Form.Item
                                label="Local do evento:"
                                htmlFor="local"
                                rules={[{ required: false }]}>
                                <Input name="local" placeholder="Digite o local do evento" 
                                    onChange={formik.handleChange}
                                    value={formik.values.dados? formik.values.dados.local: ''}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Organizador do evento */}
                    <Form.Item
                        label="Organizador do evento:"
                        htmlFor="organizer"
                        rules={[{ required: true, message: 'Preencha corretamente o campo de organizador!' }]}>
                        <Input name={organizer} placeholder="Digite o nome do organizador responsável" 
                            onChange={formik.handleChange}
                            value={formik.values.dados? formik.values.dados.organizer:''}/>
                    </Form.Item>

                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Categoria do evento: "
                                htmlFor="categories"
                                rules={[{ required: true, message: 'Preencha corretamente o campo de categoria!' }]}>
                                <Checkbox.Group
                                    onChange={onChangeCategories}
                                    >
                                    <Row>
                                        <Col span={8}>
                                            <Checkbox
                                                value="workshop">Workshop</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="bootcamp">Bootcamp</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="frontend">Front-end</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="backend">Back-end</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Quais parceiros aceita ?"
                                htmlFor="partners"
                                rules={[{ required: false }]}>
                                <Checkbox.Group
                                    onChange={onChangePartners}
                                    >
                                    <Row>
                                        <Col span={10}>
                                            <Checkbox value="sponsors">Sponsors</Checkbox>
                                        </Col>
                                        <Col span={10}>
                                            <Checkbox value="universidade">Universidades</Checkbox>
                                        </Col>
                                        <Col span={10}>
                                            <Checkbox value="comunidades">Comunidades</Checkbox>
                                        </Col>
                                        <Col span={10}>
                                            <Checkbox value="startups">Startups</Checkbox>
                                        </Col>
                                        <Col span={10}>
                                            <Checkbox value="palestrantes">Palestrantes</Checkbox>
                                        </Col>
                                        <Col span={10}>
                                            <Checkbox value="impresa">Impresa</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="Nao">Não aceito parceiros</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="Vagas limitadas ?"
                        htmlFor="limited_spaces"
                        rules={[{ required: false }]}>
                        <Radio.Group name="limited_spaces" defaultValue={1} onChange={onChangeSpaces}>
                            <Radio value={"Sim"}>Sim</Radio>
                            <Radio value={"Não"}>Não</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={onsubmit}>Cadastrar evento</Button>
                    </Form.Item>

                </Form>
            </Col>
        </Row>
    );
};

export default EventForm;
