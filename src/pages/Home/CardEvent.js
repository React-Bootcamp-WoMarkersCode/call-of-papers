import React from 'react'
import { Card, Typography, Space } from 'antd'
import { Link } from 'react-router-dom'

const { Text } = Typography;

const CardEvent = ({ event }) => {

	return (
    <Card actions={[<Link to={`/events/${event.id}`} >Submeta sua palestra</Link>]} >
      <Space direction="vertical">
        <Text strong>{event.event}</Text>
        <Space direction="vertical" size={0}>
          <Text type="secondary">{event.schedule}</Text>
          <Text type="secondary">{event.local}</Text>
        </Space>
      </Space>
    </Card>
	);
}

export default CardEvent;

