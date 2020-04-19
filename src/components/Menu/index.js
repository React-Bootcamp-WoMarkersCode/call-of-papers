import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Menu, Avatar, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCalendarAlt, faBookmark, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import FBLogin from '../../pages/Login/FBLogin'
import './style.scss'

const { SubMenu } = Menu

const HeaderComponent = () => {
  const history = useHistory()
  const userPicture = localStorage.getItem('userPicture');

  const logout = () => {
    localStorage.clear()
    history.push('/');
  }

  return (
    <>
      <Link to='/'>
        <img src={require('../../assets/logo.png')} alt='Sharing Talks' className='logo' />
        <img src={require('../../assets/logo-mobile.png')} alt='Sharing Talks' className='logo-mobile' />
      </Link>
      <div class='menu'>
      {
        !localStorage.getItem('userId') ?
          (<>
            <Menu theme='light' mode='horizontal'>
              <Menu.Item key='/events' onClick={() => history.push('/events')}>
                Produtores de eventos
              </Menu.Item>
              <Menu.Item key='/lectures' onClick={() => history.push('/lectures')}>
                Palestrantes
              </Menu.Item>
            </Menu>
            <Button type='default' onClick={() => history.push('/login')}>Login</Button>
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
          </Menu>)
      }
      </div>
    </>
  )
}

export default HeaderComponent
