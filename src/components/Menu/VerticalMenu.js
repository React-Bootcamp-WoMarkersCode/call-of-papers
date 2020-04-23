import React, { useState } from 'react'
import { Menu, Avatar, Button, Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import './style.scss'

const VerticalMenu = ({ history, userPicture, userRole, logout }) => {
  const [ visible, setVisible ] = useState(false)

  return (
    !localStorage.getItem('userId') ?
      (<></>)
        :
      (<div className='menu-hamburguer'>
        <Button className='btn-outline' onClick={() => setVisible(true)}>
          <MenuOutlined />
        </Button>
        <Drawer
          title={<>
            <Avatar src={userPicture} style={{ marginRight: '1em' }} />
            <span>{localStorage.getItem('userName')}</span>
          </>}
          placement="right"
          closable={false}
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <Menu theme='light' mode='vertical'>
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
          </Menu>
        </Drawer>
      </div>)
  )
}

export default VerticalMenu
