import React, { useState } from 'react'
import { Row, Col, Form, Input, Checkbox, Radio, Button } from 'antd'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'

let bodyApi = {}

const formItemLayout = null;

const { TextArea } = Input;

const initialValues = {
    event: '',
    description: '',
    local: '',
    schedule: '',
    organizer: '',
    categories: [],
    limited_spaces: '',
    partners: []
}

const EventForm = () => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('vertical');
    const [values, setValuesChecked] = useState([]);
    const [radio, setValuesRadio] = useState([]);
    const [partner, setValuesPartner] = useState([]);

    const history = useHistory();

    const environment = 'http://localhost:3001';

    const formik = useFormik({
        initialValues
    })

    function onChangeCategories(categories) {
        setValuesChecked(categories)
    }
    function onChangeSpaces(spaces) {
        setValuesRadio(spaces.target.value);
    }
    function onChangePartners(partners) {
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
                <h1>Crie um evento</h1>
                <Form
                    {...formItemLayout}
                    layout={formLayout}
                    form={form}
                    initialValues={{ layout: formLayout }}>
                    <Form.Item
                        label="Nome do evento:"
                        name="event"
                        rules={[{ required: true, message: 'Preencha corretamente o campo de evento!' }]}>
                        <Input {...formik.getFieldProps("event")} placeholder="Digite o nome do evento" />
                    </Form.Item>
                    <Form.Item
                        label="Descrição do evento:"
                        name="description"
                        rules={[{ required: true, message: 'Preencha corretamente o campo de descrição do evento.' }]}>
                        <TextArea {...formik.getFieldProps("description")} placeholder="Digite a descrição do evento (sobre o evento, agenda, regras...)" />
                    </Form.Item>
                    <Row>
                        <Col span={12} style={{ paddingRight: 10 }}>
                            <Form.Item
                                label="Data/Horário do evento:"
                                name="schedule"
                                rules={[{ required: false }]}>
                                <Input {...formik.getFieldProps("schedule")} placeholder="Digite a data e horário" />
                                <small>Exemplo: 18 Abril, 07:30</small>
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ paddingLeft: 10 }}>
                            <Form.Item
                                label="Local do evento:"
                                name="local"
                                rules={[{ required: false }]}>
                                <Input {...formik.getFieldProps("local")} placeholder="Digite o local do evento" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="Organizador do evento:"
                        name="organizer"
                        rules={[{ required: true, message: 'Preencha corretamente o campo de organizador!' }]}>
                        <Input {...formik.getFieldProps("organizer")} placeholder="Digite o nome do organizador responsável" />
                    </Form.Item>

                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Categoria do evento: "
                                name="categories"
                                rules={[{ required: true, message: 'Preencha corretamente o campo de categoria!' }]}>
                                <Checkbox.Group
                                    onChange={onChangeCategories}>
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
                                name="partners"
                                rules={[{ required: false }]}>
                                <Checkbox.Group
                                    onChange={onChangePartners}>
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
                        name="limited_spaces"
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
