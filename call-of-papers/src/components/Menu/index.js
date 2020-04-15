import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Menu, Avatar } from 'antd'
import { CalendarOutlined, BookOutlined } from '@ant-design/icons'
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
          (<Menu theme='light' mode='horizontal' selectedKeys={[history.location.pathname]}>
            <Menu.Item key='/events' onClick={() => history.push('/events')}>
              <CalendarOutlined />
              Meus eventos
            </Menu.Item>
            <Menu.Item key='/lectures' onClick={() => history.push('/lectures')}>
              <BookOutlined />
              Minhas palestras
            </Menu.Item>
            <SubMenu title={<Avatar src={userPicture} />}>
              <Menu.Item key='/profile' onClick={() => history.push('/profile')}>
                Meu perfil
              </Menu.Item>
              <Menu.Item key='logout' onClick={() => logout()}>
                Sair
              </Menu.Item>
            </SubMenu>
          </Menu>)
      }
    </>
  )
}

export default HeaderComponent
