import React, { useState, useEffect } from 'react'
import { Row, Col, Avatar, Descriptions, Tag, List, Button } from 'antd';
import { UserOutlined, GithubOutlined, MediumOutlined, LinkedinOutlined, FacebookOutlined, TwitterOutlined, EditOutlined } from '@ant-design/icons';
import "./MyProfile.css"
import { getEnvironment } from './../../utils/environment'
import { useHistory } from 'react-router-dom'

const { Item } = Descriptions;

const MyProfile = () => {
  let history = useHistory()
  const [profile, setProfile] = useState([])
  const environment = getEnvironment()

  useEffect(() => {
    fetch(`${environment}/profiles`)
      .then(res => res.json())
      .then(data => {
        setProfile(data.find(profile => profile.id === localStorage.getItem('userId')))
      })
      .catch(err => console.error(err, 'Nenhum usuário encontrado'))
  }, [])


  let userPicture = localStorage.getItem('userPicture')
  let userName = localStorage.getItem('userName')
  let userEmail = localStorage.getItem('userEmail')

  return (
    <>
      <Row>
        <Col span={16} offset={4} style={{ backgroundColor: '#FFF', borderRadius: '6px', padding: '15px' }}>
          <Row>
            <Col span={4} style={{ textAlign: 'center' }}>
              <br />
              <Avatar shape="square" size={50} src={userPicture} />
              <br />
              <Button type="primary" onClick={() => history.push('/profileForm')} icon={<EditOutlined />} size="small" style={{ marginTop: '20px' }}>
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
                  {profile.registerDate? `${(profile.registerDate)}` : 'Sem dados'}
                </Item>
                <Item label="Interesses" span={3}>
                  {profile.interests? profile.interests && profile.interests.map(item => <Tag style={{ marginBottom: '8px' }}>{item}</Tag>) : "Sem dados"}
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
