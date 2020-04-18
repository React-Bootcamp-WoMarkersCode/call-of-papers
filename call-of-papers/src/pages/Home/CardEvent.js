import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'

const { Meta } = Card;

const CardEvent = ({ event }) => {
	return (
    <Card actions={[<Link to="/about">Saiba mais!</Link>]} >
      <Meta title={event.evento} description={event.data} />
    </Card>
	);
}

export default CardEvent;

