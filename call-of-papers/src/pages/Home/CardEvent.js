import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'

const { Meta } = Card;

const CardEvent = ({ event }) => {
	return (
    <Card actions={[<Link to={`/events/${event.id}`}>Saiba mais!</Link>]} >
      <Meta title={event.event} description={event.description} />
    </Card>
	);
}

export default CardEvent;

