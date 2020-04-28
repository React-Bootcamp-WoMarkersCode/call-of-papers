import React from 'react'
import { Menu, Avatar, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

const { SubMenu } = Menu

const HorizontalMenu = ({ history, userPicture, userRole, logout }) => {
  return (
    !localStorage.getItem('userId') ?
      (<>
        <Menu theme='light' mode='horizontal'>
          <Menu.Item key='/events'>
            <a href="#events">
              Produtores de eventos
            </a>
          </Menu.Item>
          <Menu.Item key='/lectures'>
            <a href="#lectures">
              Palestrantes
            </a>
          </Menu.Item>
          <Menu.Item key='/highlights'>
            <a href="#highlights">
              Destaques
            </a>
          </Menu.Item>
        </Menu>
        <Button type='default' className='btn-outline' onClick={() => history.push('/login')}>Login</Button>
      </>)
      :
      (<Menu theme='light' mode='horizontal'>
        <Menu.Item
          key='/events'
          disabled={userRole === 'Speaker'}
          onClick={() => history.push('/events')}>
          Sou produtor de eventos
        </Menu.Item>
        <Menu.Item
          key='/lectures'
          disabled={userRole === 'Producer'}
          onClick={() => history.push('/lectures')}>
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
      </Menu>)
  )
}

export default HorizontalMenu
