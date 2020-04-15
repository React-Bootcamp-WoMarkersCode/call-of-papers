import React, { useState, useEffect } from 'react'
import { Row, Avatar, Divider, Button, Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { getEnvironment } from './../../utils/environment'
import { useHistory } from 'react-router-dom'
import ProfileDescription from './ProfileDescription'
import './MyProfile.css'

const { Meta } = Card;

const MyProfile = () => {
  const history = useHistory()
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

  const userPicture = localStorage.getItem('userPicture')
  const userName = localStorage.getItem('userName')
  const userEmail = localStorage.getItem('userEmail')

  return (
    <>
      <Row gutter={[16, 24]}>
        <Divider orientation='left'>
          Meu Perfil
        </Divider>
      </Row>
      <Row justify='center' gutter={[16, 24]}>
        <Card
          style={{ width: '70%' }}
          actions={[
            <Button
              type='primary'
              onClick={() => history.push('/profileForm')}
              icon={<EditOutlined />}
              size='small'>
              Editar perfil
            </Button>
          ]}
        >
          <Meta
            avatar={<Avatar size={50} src={userPicture} />}
            title={`${userName.toUpperCase()}`}
            description={<ProfileDescription profile={profile} userEmail={userEmail} />}
          />
        </Card>
      </Row>
    </>
  );
};

export default MyProfile
