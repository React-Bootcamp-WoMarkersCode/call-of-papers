import React from 'react'
import { Row, Divider} from 'antd'
import { events } from '../Events/events-list-test'
import CardEvent from './CardEvent'
import './style.scss'

const Home = () => {
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
            <CardEvent event={event} />
          )
        })}
      </Row>
    </>
  )
}

export default Home
