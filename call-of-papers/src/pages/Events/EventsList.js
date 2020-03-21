import React from 'react';
import { Row, Col, Table, Tag } from 'antd';

const EventsList = () => {

    const columns = [
        {
            title: 'Data/Horário',
            dataIndex: 'data',
            key: 'data'
        },
        {
            title: 'Eventos',
            dataIndex: 'evento',
            key: 'evento'
        },
        {
            title: 'Local',
            dataIndex: 'local',
            key: 'local'
        },
        {
            title: '',
            dataIndex: 'acao',
            key: 'acao',
            render: (text) => (
                <span>
                    <a>Detalhes</a>
                </span>
            )
        },
    ];

    const data = [
        {
            key: '1',
            data: '21 Mar, 07:30',
            evento: 'Women Dev Summit',
            local: 'Secretaria',
        },
        {
            key: '2',
            data: '21 Mar, 07:30',
            evento: 'Women Dev Summit',
            local: 'Secretaria',
        },
    ]

    return (
        <>
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <h1>Meus eventos</h1>
                </Col>
                <Col span={4}></Col>
            </Row>
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <Table columns={columns} dataSource={data} />
                </Col>
                <Col span={4}></Col>
            </Row>
        </>
    );
}

export default EventsList;
