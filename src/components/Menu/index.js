import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'
import { Menu, Avatar, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

const { SubMenu } = Menu

const HeaderComponent = () => {
  const history = useHistory()
  const location = useLocation()
  const userPicture = localStorage.getItem('userPicture')
  const userRole = localStorage.getItem('userId') ? localStorage.getItem('userRole') : ''

  const logout = () => {
    localStorage.clear()
    history.push('/');
  }

  return (
    <div className="menu-container">
      <Link to='/'>
        <img src={require('../../assets/logo.png')} alt='Sharing Talks' className='logo' />
        <img src={require('../../assets/logo-mobile.png')} alt='Sharing Talks' className='logo-mobile' />
      </Link>
      <div className='menu'>
      {
        location.pathname === '/login' ?
          <></>
            :
          (!localStorage.getItem('userId') ?
            (<>
              <Menu theme='light' mode='horizontal'>
                <Menu.Item key='/events' onClick={() => window.location.href='#events'}>
                  Produtores de eventos
                </Menu.Item>
                <Menu.Item key='/lectures' onClick={() => window.location.href='#lectures'}>
                  Palestrantes
                </Menu.Item>
                <Menu.Item key='/highlights' onClick={() => window.location.href='#highlights'}>
                  Destaques
                </Menu.Item>
              </Menu>
              <Button type='default' className='login-btn' onClick={() => history.push('/login')}>Login</Button>
            </>)
              :
            (<Menu theme='light' mode='horizontal'>
              <Menu.Item key='/events' onClick={() => history.push('/events')}>
                Sou produtor de eventos
              </Menu.Item>
              <Menu.Item key='/lectures' onClick={() => history.push('/lectures')}>
                Sou palestrante
              </Menu.Item>
              <SubMenu title={<Avatar src={userPicture} />}>
                <Menu.Item key='/profile' onClick={() => history.push('/profile')}>
                  <FontAwesomeIcon icon={faUser} />
                  Meu perfil
                </Menu.Item>
                <Menu.Item key='logout' onClick={() => logout()}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Sair
                </Menu.Item>
              </SubMenu>
            </Menu>))
      }
      </div>
    </div>
  )
}

export default HeaderComponent
