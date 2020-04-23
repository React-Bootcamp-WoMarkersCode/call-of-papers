import React, { useState } from 'react'
import { Menu, Button, Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import './style.scss'

const VerticalMenu = ({ history, userPicture, userRole, logout }) => {
  const [ visible, setVisible ] = useState(false)

  return (
    <div className='menu-hamburguer'>
      {
        !localStorage.getItem('userId') ?
          (<Button
            type='default'
            className='btn-outline'
            onClick={() => {
              history.push('/login')
              setVisible(false)
            }
          }>
            Login
          </Button>) : (<></>)
      }
      <Button className='btn-outline' onClick={() => setVisible(true)}>
        <MenuOutlined />
      </Button>
      <Drawer
        title={<img src={require('../../assets/logo-mobile.png')} alt='Sharing Talks' className='logo-mobile' />}
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {!localStorage.getItem('userId') ?
          (<Menu theme='light' mode='vertical'>
          <Menu.Item key='/events' onClick={() => {
            window.location.href='#events'
            setVisible(false)
          }}>
            Produtores de eventos
          </Menu.Item>
          <Menu.Item key='/lectures' onClick={() => {
            window.location.href='#lectures'
            setVisible(false)
          }}>
            Palestrantes
          </Menu.Item>
          <Menu.Item key='/highlights' onClick={() => {
            window.location.href='#highlights'
            setVisible(false)
          }}>
            Destaques
          </Menu.Item>
          </Menu>)
            :
          (<Menu theme='light' mode='vertical'>
          <Menu.Item
            key='/events'
            disabled={userRole === 'Speaker'}
            onClick={() => {
              history.push('/events')
              setVisible(false)
            }}>
            Sou produtor de eventos
          </Menu.Item>
          <Menu.Item
            key='/lectures'
            disabled={userRole === 'Producer'}
            onClick={() => {
              history.push('/lectures')
              setVisible(false)
            }}>
            Sou palestrante
          </Menu.Item>
          <Menu.Item key='/profile' onClick={() => {
            history.push('/profile')
            setVisible(false)
          }}>
            Meu perfil
          </Menu.Item>
          <Menu.Item key='logout' onClick={() => {
            logout()
            setVisible(false)
          }}>
            Sair
          </Menu.Item>
          </Menu>)
        }

      </Drawer>
    </div>
  )
}

export default VerticalMenu
