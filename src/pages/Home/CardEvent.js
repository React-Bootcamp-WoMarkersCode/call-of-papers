import React from 'react'
import { Card, Typography, Space } from 'antd'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

const { Text } = Typography;

const CardEvent = ({ event }) => {

  return (
    <Card actions={[<Link to={`/events/${event.id}`} >Submeta sua palestra</Link>]} >


      <Space direction='vertical' style={{width: '100%'}}>
        <div className='event-img'>
          { event.uploadedImage ?
            (<img src={event.uploadedImage} alt='Imagem do evento' width='100%' height='100%' />) :
            (<FontAwesomeIcon icon={faImage} />)
          }
        </div>
        <Text strong>{event.event}</Text>
        <Space direction='vertical' size={0}>
          <Text type='secondary'>{event.schedule}</Text>
          <Text type='secondary'>{event.local}</Text>
        </Space>
      </Space>
    </Card>
  );
}

export default CardEvent;

