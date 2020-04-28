import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Row, Card, Button, Col } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt } from "@fortawesome/free-solid-svg-icons"
import './style.scss'
import FBLogin from './FBLogin'
import GglLogin from './GglLogin'
import Header from './../../components/Header'
import MailLogin from './MailLogin'

const Login = () => {

  const { eventId } = useParams()

  const [role, setRole] = useState('')
  const [mailLogin, setMailLogin] = useState(false)

  return(
    <>
      <Header text="QUEM É VOCÊ ?" />
      <Row style={{ marginBottom: '1rem'}}>
        Depois é possível mudar essa opção no seu perfil.
      </Row>
      <Row justify='space-between'>
        <Col xs={{ span: 12 }} md={{ span: 6 }}>
          <Card
            hoverable
            className={['login-card', (role === 'Producer' ? 'card-selected' : '')]}
            onClick={() => setRole('Producer')}>
            <Row justify='center'>
              <img
                src={require('../../assets/events-producer.png')}
                alt='Produtor de evento' />
              <span className='card-span'>Sou produtor de eventos</span>
            </Row>
          </Card>
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 6 }}>
          <Card
            hoverable
            className={['login-card', (role === 'Speaker' ? 'card-selected' : '')]}
            onClick={() => setRole('Speaker')}>
            <Row justify='center'>
              <img
                src={require('../../assets/speaker.png')}
                alt='Palestrante' />
              <span className='card-span'>Sou palestrante</span>
            </Row>
          </Card>
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 6 }}>
          <Card
            hoverable
            className={['login-card', (role === 'Both' ? 'card-selected' : '')]}
            onClick={() => setRole('Both')}>
            <Row justify='center'>
              <img
                src={require('../../assets/both.png')}
                alt='Produtor e palestrante' />
              <span className='card-span'>Sou ambos</span>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className='btn-group' justify='center'>
        <FBLogin isDisabled={role === ''} event={eventId} role={role} />
        <GglLogin disabled={role === ''}  role={role}/>
        <Button className='mail-button' disabled={role === ''} onClick={() => setMailLogin(true)}>
          <FontAwesomeIcon icon={faAt} />
          Continuar com o seu e-mail
        </Button>
        <p>Ao entrar, você concorda com os nossos <Link to="/termos-de-uso">Termos</Link> e <Link to="/politica-de-privacidade">Política de Privacidade</Link>.</p>
      </Row>
      <Row className='btn-group' justify='center'>
        {mailLogin && <MailLogin role={role} />}
      </Row>
    </>
  )
}

export default Login
