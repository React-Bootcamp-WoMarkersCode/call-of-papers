import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Menu, Avatar } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCalendarAlt, faBookmark, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import FBLogin from '../../pages/Login/FBLogin'
import './style.scss'

const { SubMenu } = Menu

const HeaderComponent = () => {
  const history = useHistory()
  const userPicture = localStorage.getItem('userPicture');

  const logout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('userPicture')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    history.push("/");
  }

  return (
    <>
      <Link to='/'>
        <img src={require('../../assets/logo.jpeg')} alt='Call for Papers' className='logo' />
      </Link>
      {
        !localStorage.getItem('userId') ?
          (<FBLogin />)
            :
          (<Menu theme='light' mode='horizontal'>
            <SubMenu title={<Avatar src={userPicture} />}>
              <Menu.Item key='/events' onClick={() => history.push('/events')}>
                <FontAwesomeIcon icon={faCalendarAlt} />
                Meus eventos
              </Menu.Item>
              <Menu.Item key='/lectures' onClick={() => history.push('/lectures')}>
                <FontAwesomeIcon icon={faBookmark} />
                Minhas palestras
              </Menu.Item>
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
    </>
  )
}

export default HeaderComponent
