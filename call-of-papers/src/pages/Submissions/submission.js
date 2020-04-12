import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Row, Col, Select } from 'antd'

const { Option } = Select;

const Submission = () => {
    let { submissionId } = useParams()
    const [api, setApi] = useState([])

    const environment = 'http://localhost:3001';

    useEffect(() => {
        fetch(`${environment}/lectures/${submissionId}`)
            .then(res => res.json())
            .then(data => {
                setApi(data)
            })
            .catch(err => console.error(err, 'Nenhuma palestra por aqui!'))
    }, [])

    const handleChange = (value) => {
        api.status = value;
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
                <Col span={16}>
                    <div>
                        <h1>{api.lecture}</h1>
                    </div>
                    <div>
                        <h2 style={{ fontWeight: 300 }}>Descrição da palestra</h2>
                        <p style={{ textAlign: 'justify' }}>{api.description}</p>
                    </div>
                    <div>
                        <Select
                            style={{ width: 120 }}
                            onChange={handleChange}
                        >
                            <Option value="in-analysis">In-Analysis</Option>
                            <Option value="approved">Approved</Option>
                            <Option value="rejected">Rejected</Option>
                        </Select>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Submission