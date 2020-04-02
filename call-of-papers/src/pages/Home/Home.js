import React from 'react'
import { Row } from 'antd'
import { events } from '../Events/events-list-test'
import CardEvent from './CardEvent'
import FBLogin from '../Login/FBLogin'

function Home() {

    return (
        <>
            <div style={{float:'right'}}><FBLogin /></div>
            <br></br>
            <div><h1 style={{padding: '10px', marginLeft:'200px'}}>Eventos </h1></div>
            <Row justify="center" gutter={[16, 24]} style={{ margin: '0 70px' }}>
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
