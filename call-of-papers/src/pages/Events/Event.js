import React from 'react'
import { useParams } from 'react-router'
import { Row, Col, Card } from 'antd'

import { events } from "../../mock";

const Event = () => {
  let { eventId } = useParams()

  return (
    <>
      <Row>
        {/* Banner */}
        <Col span={24}>
          <div className="site-card-border-less-wrapper" style={{ background: '#ececec', padding: 30 }}>
            <Col span={17} offset={3}>
              <Card bordered={false}>
                <img src="" />
              </Card>
            </Col>
          </div>
        </Col>
      </Row>

      {/* Descrição  */}
      <Row style={{ marginTop: 30 }}>
        <Col span={16} offset={4}>
          <Row>
            <Col span={16} style={{ paddingRight: 50 }}>
              <div>
                <span>21 Mar, 07:30</span>
                <h1>Women Dev Summit</h1>
                <small>Código do evento: {eventId}</small>
              </div>
              <div style={{ marginTop: 30 }}>
                <h2 style={{ fontWeight: 300 }}>Detalhes do evento</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
            </Col>
            <Col span={8}>
              <Card style={{ width: 300, marginTop: 15 }}>
                <small>Comunidade</small>
                <br />
                <b>WoMakersCode</b>
              </Card>
              <Card style={{ width: 300, marginTop: 15 }}>
                <small>Data/Horário</small>
                <br />
                <b>21 Mar, 07:30</b>
              </Card>
              <Card style={{ width: 300, marginTop: 15 }}>
                <small>Ingressos</small>
                <br />
                <b>Grátis</b>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Event
