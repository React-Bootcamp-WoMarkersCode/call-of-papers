import React, { useState } from 'react'
import { Row, Divider, Card, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons"
import './style.scss'

const Login = () => {

  const [role, setRole] = useState('')

  return(
    <>
      <Divider orientation='left'>
        QUEM É VOCÊ ?
      </Divider>
      <Row gutter={[16, 24]} className='content-login-padding'>
        Depois é possível mudar essa opção no seu perfil.
      </Row>
      <Row gutter={[16, 24]} className='content-padding' justify='space-around'>
        <Card
          hoverable
          style={{ width: '20%' }}
          className={['content-padding', 'login-card', (role === 'Producer' ? 'card-selected' : '')]}
          onClick={() => setRole('Producer')}>
          <Row justify='center'>
            <img
              style={{ width: 400, maxWidth: '100%' }}
              src={require('../../assets/events-producer.png')}
              alt='Produtor de evento' />
            <span className='card-span'>Sou produtor de eventos</span>
          </Row>
        </Card>
        <Card
          hoverable
          style={{ width: '20%' }}
          className={['content-padding', 'login-card', (role === 'Speaker' ? 'card-selected' : '')]}
          onClick={() => setRole('Speaker')}>
          <Row justify='center'>
            <img
              style={{ width: 400, maxWidth: '100%' }}
              src={require('../../assets/speaker.png')}
              alt='Palestrante' />
            <span className='card-span'>Sou palestrante</span>
          </Row>
        </Card>
        <Card
          hoverable
          style={{ width: '20%' }}
          className={['content-padding', 'login-card', (role === 'Both' ? 'card-selected' : '')]}
          onClick={() => setRole('Both')}>
          <Row justify='center'>
            <img
              style={{ width: 400, maxWidth: '100%' }}
              src={require('../../assets/both.png')}
              alt='Produtor e palestrante' />
            <span className='card-span'>Sou ambos</span>
          </Row>
        </Card>
      </Row>
      <Row gutter={[16, 24]} className='btn-group' justify='center'>
        <Button type='primary' className='facebook-button'>
          <FontAwesomeIcon icon={faFacebookF} />
          Continuar com o Facebook
        </Button>
        <Button type='primary' className='google-button'>
          <FontAwesomeIcon icon={faGoogle} />
          Continuar com o Google
        </Button>
      </Row>
    </>
  )
}

export default Login
