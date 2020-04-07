import React, { useState } from 'react';
import { Row, Col, Form, Input, Checkbox, Radio, Button } from 'antd';
import { useFormik } from 'formik';

const initialValues = {
    event: '',
    description: '',
    schedule: '',
    organizer: '',
    categories: [],
    limited_spaces: '',
    partners: []
}

function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
}

const EventForm = () => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('vertical');

    const formItemLayout = null;

    const { TextArea } = Input;

    const formik = useFormik({
        initialValues
    })
    return (
        <Row>
            <Col span={16} offset={4}>
                <h1>Crie um evento</h1>
                <Form
                    {...formItemLayout}
                    layout={formLayout}
                    form={form}
                    initialValues={{ layout: formLayout }}>
                    <Form.Item
                        label="Evento"
                        name="event"
                        rules={[{ required: true, message: 'Preencha corretamente o campo de evento!' }]}>
                        <Input {...formik.getFieldProps("event")} />
                    </Form.Item>
                    <Form.Item
                        label="Descrição"
                        name="description"
                        rules={[{ required: false }]}>
                        <TextArea {...formik.getFieldProps("description")} />
                    </Form.Item>
                    <Form.Item
                        label="Data/Horário"
                        name="schedule"
                        rules={[{ required: false }]}>
                        <Input {...formik.getFieldProps("schedule")} />
                    </Form.Item>
                    <Form.Item
                        label="Organizador"
                        name="organizer"
                        rules={[{ required: true, message: 'Preencha corretamente o campo de organizador!' }]}>
                        <Input {...formik.getFieldProps("organizer")} />
                    </Form.Item>

                    <Form.Item
                        label="Categoria do evento"
                        name="categories"
                        rules={[{ required: true, message: 'Preencha corretamente o campo de categoria!' }]}>
                        <Checkbox.Group style={{ width: '50%' }} onChange={onChange}>
                            <Row>
                                <Col span={6}>
                                    <Checkbox value="workshop">Workshop</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="bootcamp">Bootscamp</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="frontend">Front-end</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="backend">Back-end</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item
                        label="Vagas limitadas"
                        name="limited_spaces"
                        rules={[{ required: false }]}>
                        <Input {...formik.getFieldProps("limited_spaces")} />
                    </Form.Item>
                    
                    <Form.Item
                        label="Aceita parceiros"
                        name="partners"
                        rules={[{ required: false }]}>
                        <Radio.Group name="radiogroup" defaultValue={1}>
                            <Radio value={1}>Sim</Radio>
                            <Radio value={2}>Não</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">Cadastrar evento</Button>
                    </Form.Item>

                </Form>
                <div>
                    <pre>{JSON.stringify(formik.values, null, 2)}</pre>
                </div>
            </Col>
        </Row>
    );
};

export default EventForm;
