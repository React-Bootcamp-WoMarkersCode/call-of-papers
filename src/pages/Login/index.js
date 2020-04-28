import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Row, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt } from "@fortawesome/free-solid-svg-icons"
import './style.scss'
import FBLogin from './FBLogin'
import GglLogin from './GglLogin'
import Header from './../../components/Header'
import MailLogin from './MailLogin'

const Login = () => {

  const { eventId } = useParams()
  const [mailLogin, setMailLogin] = useState(false)
  const [displayButtons, setDisplayButtons] = useState(true)

  return(
    <>
      <Header text="Seja bem-vinda(o)!" />
      { displayButtons &&
        <Row className='btn-group' justify='center'>
          <FBLogin event={eventId} />
          <GglLogin />
          <Button className='mail-button'
            onClick={() => {
              setMailLogin(true)
              setDisplayButtons(false)
            }}
          >
            <FontAwesomeIcon icon={faAt} />
            <span>Continuar com o seu e-mail</span>
          </Button>
          <p>Ao entrar, você concorda com os nossos <Link to="/termos-de-uso">Termos</Link> e <Link to="/politica-de-privacidade">Política de Privacidade</Link>.</p>
        </Row>
      }

      <Row justify='center'>
        {mailLogin && <MailLogin />}
      </Row>
    </>
  )
}

export default Login
