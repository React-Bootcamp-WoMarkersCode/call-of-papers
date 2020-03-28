import React from 'react'
import { Row } from 'antd'
import { events } from '../../mock'
import CardEvent from './CardEvent'

function Home() {

    return (
        <>
            <h1 style={{padding: '10px', marginLeft:'200px'}}>Eventos </h1>
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
