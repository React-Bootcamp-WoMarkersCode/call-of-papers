import React, { useEffect, useState } from 'react'
import { Row, Divider} from 'antd'
import CardEvent from './CardEvent'
import { getEnvironment } from './../../utils/environment'
import './style.scss'

const Home = () => {
  const [events, setEvents] = useState([])

  const environment = getEnvironment();

  useEffect(() => {
    fetch(`${environment}/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(data)
      })
      .catch(err => console.error(err, 'Nenhum evento por aqui!'))
  }, [])

  return (
    <>
      <Row gutter={[16, 24]}>
        <Divider orientation="left">
          Eventos
        </Divider>
      </Row>
      <Row justify="center" gutter={[16, 24]} className='home-cards-container'>
        {events.map((event) => {
          return (
            <CardEvent key={event.id} event={event} />
          )
        })}
      </Row>
    </>
  )
}

export default Home
