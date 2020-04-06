import React from 'react'
import { useParams } from 'react-router'
import { Row, Col, Button } from 'antd'

const Lecture = () => {
  let { lectureId } = useParams()

  return (
    <>
      <h2>Lecture Page ID: {lectureId}</h2>
      <Row justify='center'>
        <Col span={16}>
          <div>
            <h1>Lecture Title 22</h1>
          </div>
          <div>
            <h2 style={{ fontWeight: 300 }}>Descrição da palestra</h2>
            <p style={{ textAlign: 'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Praesent et vestibulum massa, efficitur malesuada elit.
            Nullam urna turpis, convallis ut tincidunt non, ultrices sit amet libero.
            Donec non massa ex. Morbi enim sem, finibus a tristique at, viverra vel urna.
            Mauris a urna tempor, luctus tellus eget, pulvinar lacus.
            Donec ex lorem, auctor vitae luctus at, convallis vitae ipsum.
            Maecenas imperdiet tempor dui eu rhoncus.
            Integer viverra mauris ut mattis finibus.
            Proin eget metus euismod, iaculis felis in, mattis risus.
            Nunc in nunc blandit, blandit elit at, porta orci.
            Aenean lobortis tincidunt porta.
            Vivamus vulputate diam quis orci porta ultrices.
            Phasellus nec sapien turpis. Duis nec eros molestie,
            tristique massa eu, accumsan nisl.
                   Vivamus aliquam lorem volutpat, convallis leo hendrerit, malesuada magna.</p>
          </div>
          <div>
            <Button>Editar</Button>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Lecture
