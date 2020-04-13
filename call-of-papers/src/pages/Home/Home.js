import React from 'react'
import { Row } from 'antd'
import { events } from '../Events/events-list-test'
import CardEvent from './CardEvent'
import FBLogin from '../Login/FBLogin'
import './style.scss'

function Home() {
  return (
    <>
      <div style={{float:'right'}}><FBLogin /></div>
      <br></br>
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
