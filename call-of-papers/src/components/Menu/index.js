import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import { CalendarOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import '../../App.css';

const { SubMenu } = Menu;

const smallIcon = {
	fontSize: '15px'
};

const largeIcon = {
	fontSize: '25px',
	verticalAlign: 'middle'
};

const menuStyle = {
    lineHeight: '64px',
    float: 'right'
}

function HeaderComponent() {
	return (        
        <>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                style={menuStyle}
            >
                <Menu.Item key="events">
                    <CalendarOutlined style={smallIcon} />
                    Meus eventos
                </Menu.Item>
                <Menu.Item key="lectures">
                    <BookOutlined style={smallIcon} />
                    Minhas palestras
                </Menu.Item>
                <SubMenu title={<UserOutlined style={largeIcon} />}>
                    <Menu.Item key="my-profile">Meu perfil</Menu.Item>
                    <Menu.Item key="logout">Sair</Menu.Item>
                </SubMenu>
            </Menu>
      </>
	);
}

export default HeaderComponent;
