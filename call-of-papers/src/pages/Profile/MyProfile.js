import React, { useState, useEffect } from 'react'
import { Row, Col, Avatar, Descriptions, Tag, List, Button, Table } from 'antd';
import { UserOutlined, GithubOutlined, MediumOutlined, LinkedinOutlined, FacebookOutlined, TwitterOutlined, EditOutlined } from '@ant-design/icons';
import "./MyProfile.css"

const { Item } = Descriptions;

const MyProfile = () => {
  const [profile, setProfile] = useState([])
  const environment = 'http://localhost:3001';

  useEffect(() => {
    fetch(`${environment}/profiles`)
      .then(res => res.json())
      .then(data => {
        setProfile(data.find(profile => profile.id == localStorage.getItem('userId')))
      })
      .catch(err => console.error(err, 'Nenhum usuário encontrado'))
  }, [])


  let userPicture = localStorage.getItem('userPicture')
  let userName = localStorage.getItem('userName')
  let userEmail = localStorage.getItem('userEmail')

  const interests = ['ReactJS', 'Javascript', 'CSS', 'Front-end'];
  const communities = [
    {
      title: 'WoMakersCode',
      avatar: 'https://pbs.twimg.com/profile_images/954454393558110208/NTw8KDFK.jpg'
    },
    {
      title: 'SorocabaCSS',
      avatar: 'https://secure.meetupstatic.com/photos/event/5/4/4/9/600_456681577.jpeg'
    }
  ];

  return (
    <>
      <Row>
        <Col span={16} offset={4} style={{ backgroundColor: '#FFF', borderRadius: '6px', padding: '15px' }}>
          <Row>
            <Col span={4} style={{ textAlign: 'center' }}>
              <br />
              <Avatar shape="square" size={50} src={userPicture} />
              <br />
              <Button type="primary" icon={<EditOutlined />} size="small" style={{ marginTop: '20px' }}>
                Editar perfil
              </Button>
            </Col>
            <Col span={18}>
              <Descriptions layout="vertical">
                <Item label="" span={3}>
                  <strong>{`${userName.toUpperCase()}`}</strong>
                  <br />
                  {`${userEmail}`}
                </Item>
                <Item label="Apresentação" span={3}>
                  <i>{profile.apresentation? `${profile.apresentation}` : 'Sem dados'}{console.log()}</i>
                </Item>
                <Item label="Data de cadastro" span={3}>
                  {profile.registerDate? `${profile.registerDate}` : 'Sem dados'}
                </Item>
                <Item label="Interesses" span={3}>
                  {profile.interests? profile.interests && profile.interests.map(item => <Tag style={{ marginBottom: '8px' }}>{item}</Tag>) : "Sem dados"}
                </Item>
                <Item label="Comunidades">
                  <List
                    itemLayout="horizontal"
                    dataSource={communities}
                    renderItem={item => (
                      <List.Item style={{ borderBottom: '0px', padding: '0 0 8px 0' }}>
                        <List.Item.Meta
                          avatar={<Avatar shape="square" src={item.avatar} />}
                          title={item.title}
                        />
                      </List.Item>
                    )}
                  />
                </Item>
                <Item label="Redes Sociais" style={{ verticalAlign: 'baseline' }}>
                  {profile.githubLink ?
                    <a href={`${profile.githubLink}`}><GithubOutlined className="social-network" /></a>
                    : <GithubOutlined className="social-network"></GithubOutlined>}
                  {profile.mediumLink ?
                    <a href={`${profile.mediumLink}`}><MediumOutlined className="social-network" /></a>
                    : <MediumOutlined className="social-network" />}
                  {profile.linkedinLink ?
                    <a href={`${profile.linkedinLink}`}><LinkedinOutlined className="social-network" /></a>
                    : <LinkedinOutlined className="social-network" />}
                  {profile.facebookLink ?
                   <a href={`${profile.facebookLink}`}><FacebookOutlined className="social-network" /></a>
                    : <FacebookOutlined className="social-network" />}
                  {profile.twitterLink ? 
                  <a href={`${profile.twitterLink}`}><TwitterOutlined className="social-network" /></a>
                    : <TwitterOutlined className="social-network" />}
                </Item>
              </Descriptions>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default MyProfile
