import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Row, Button, Col, Typography } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt } from "@fortawesome/free-solid-svg-icons"
import './style.scss'
import FBLogin from './FBLogin'
import GglLogin from './GglLogin'
import Header from './../../components/Header'
import MailLogin from './MailLogin'

const { Title } = Typography

const Login = () => {

  const { eventId } = useParams()
  const [mailLogin, setMailLogin] = useState(false)
  const [register, setRegister] = useState(false)

  const setCookiesLocalStorage = (user) => {
    localStorage.setItem('userId', user.id)
    localStorage.setItem('userPicture', user.userPicture)
    localStorage.setItem('userName', user.name)
    localStorage.setItem('userEmail', user.email)
    localStorage.setItem('userRole', user?.role)
  }

  return(
    <>
      <Header text="Seja bem-vinda(o)!" />
      <Row style={{marginTop: '3em', alignItems: 'center'}}>
        <Col xs={24} md={12} className='btn-group' justify='center' style={{padding: '2em 0'}}>
          <FBLogin event={eventId} setCookiesLocalStorage={setCookiesLocalStorage} />
          <GglLogin setCookiesLocalStorage={setCookiesLocalStorage} />
          <Button className='mail-button' onClick={() => setMailLogin(true)} >
            <FontAwesomeIcon icon={faAt} />
            Continuar com o seu e-mail
          </Button>
          <p>Ao entrar, você concorda com os nossos <Link to="/termos-de-uso">Termos</Link> e <Link to="/politica-de-privacidade">Política de Privacidade</Link>.</p>
        </Col>
        <Col xs={24} md={12} style={{textAlign: 'center'}}>
          { mailLogin ?
            <MailLogin register={register} /> : (
              <div style={{marginTop: '-80px'}}>
                <Title level={3}>Ainda não tem cadastro?</Title>
                <Button className='btn-outline'
                  onClick={() => {
                    setMailLogin(true)
                    setRegister(true)
                  }} >
                  Cadastre-se aqui!
                </Button>
              </div>
            )
          }
        </Col>
      </Row>
    </>
  )
}

export default Login
