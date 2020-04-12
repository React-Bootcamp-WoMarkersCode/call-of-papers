import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Menu, Avatar } from 'antd'
import {
  CalendarOutlined,
  BookOutlined,
  UserOutlined
} from '@ant-design/icons'
import './style.scss'

const { SubMenu } = Menu

const smallIcon = {
  fontSize: '15px'
}

const menuStyle = {
  height: 'inherit',
  lineHeight: '64px',
  float: 'right'
}

function HeaderComponent() {
  let history = useHistory()
  let userPicture = localStorage.getItem('userPicture');

  function logout () {
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
      <Menu theme='light' mode='horizontal' style={menuStyle}>
        <Menu.Item key='events' onClick={() => history.push('/events')}>
          <CalendarOutlined style={smallIcon} />
          Meus eventos
        </Menu.Item>
        <Menu.Item key='lectures' onClick={() => history.push('/lectures')}>
          <BookOutlined style={smallIcon} />
          Minhas palestras
        </Menu.Item>
        <SubMenu
          title={
            <Avatar src={userPicture} />
          }
        >
          <Menu.Item
            key='my-profile'
            style={{color: 'black'}}
            onClick={() => history.push('/profile/1')}
          >
            Meu perfil
          </Menu.Item>
          <Menu.Item key='logout' onClick={() => logout()} style={{color: 'black'}}>Sair</Menu.Item>
        </SubMenu>
      </Menu>
    </>
  )
}

export default HeaderComponent
