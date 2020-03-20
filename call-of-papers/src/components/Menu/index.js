import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Menu, Avatar } from 'antd';
import { CalendarOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import './style.css';

const { SubMenu } = Menu;

const smallIcon = {
	fontSize: '15px'
};

const menuStyle = {
    lineHeight: '64px',
    float: 'right'
}

function HeaderComponent() {
    let history = useHistory();

	return (        
        <>
            <Link to="/"><div className="logo" /></Link>
            <Menu
                theme="dark"
                mode="horizontal"
                style={menuStyle}
            >
                <Menu.Item key="events" onClick={() => history.push("/events")}>
                    <CalendarOutlined style={smallIcon} />
                    Meus eventos
                </Menu.Item>
                <Menu.Item key="lectures" onClick={() => history.push("/lectures")}>
                    <BookOutlined style={smallIcon} />
                    Minhas palestras
                </Menu.Item>
                <SubMenu title={<Avatar icon={<UserOutlined style={{fontSize: '18px'}} />} />}>
                    <Menu.Item key="my-profile" onClick={() => history.push("/profile/1")}>Meu perfil</Menu.Item>
                    <Menu.Item key="logout">Sair</Menu.Item>
                </SubMenu>
            </Menu>
      </>
	);
}

export default HeaderComponent;
