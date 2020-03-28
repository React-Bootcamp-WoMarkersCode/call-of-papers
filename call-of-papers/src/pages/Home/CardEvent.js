import React from 'react'
import { Col, Card } from 'antd'

function CardEvent({ event }) {
    return (
        <Col span={8}>
            <Card
                hoverable
                title={event.evento}
                bordered={true}
                bodyStyle={{ maxHeight: '150px' }}
            >
                <p >{event.data}</p>
            </Card>
        </Col>
    )
}

export default CardEvent