import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'

const { Meta } = Card;

const CardEvent = ({ event }) => {
	return (
    <Card
      cover={<img alt={event.evento} src={event.img} />}
      actions={[<Link to={`/events/${event.id}`}>Saiba mais!</Link>]}
    >
      <Meta title={event.event} description={[event.schedule, <br/>, event.local]} />
    </Card>
	);
}

export default CardEvent;

