import React from 'react'
import { Row } from 'antd'
import { events } from '../Events/events-list-test'
import CardEvent from './CardEvent'
import './style.scss'

const Home = () => {
  return (
    <>
      <Row gutter={[16, 24]}>
        <h1>Eventos</h1>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
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
