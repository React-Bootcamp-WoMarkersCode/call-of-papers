import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'

const { Meta } = Card;

const CardEvent = ({ event }) => {
  const description = `
    <div>${event.schedule}</div>
    <div>${event.local}</div>
  `
	return (
    <Card actions={[<Link to={`/events/${event.id}`} >Submeta sua palestra</Link>]} >
      <Meta title={event.event} description={description} />
    </Card>
	);
}

export default CardEvent;

