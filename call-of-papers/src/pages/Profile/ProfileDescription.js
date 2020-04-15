import React from 'react'
import { Descriptions, Tag, Button } from 'antd'
import {
  GithubOutlined,
  MediumOutlined,
  LinkedinOutlined,
  FacebookOutlined,
  TwitterOutlined
} from '@ant-design/icons'
import './style.scss'

const { Item } = Descriptions;

const ProfileDescription = ({ profile, userEmail }) => {
  return (
    <Descriptions layout="vertical">
      <Item label="Apresentação" span={3}>
        <i>{profile.apresentation? `${profile.apresentation}` : 'Sem dados'}</i>
      </Item>
      <Item label="Interesses" span={3}>
        {profile.interests ? profile.interests && profile.interests.map(item => <Tag style={{ marginBottom: '8px' }}>{item}</Tag>) : "Sem dados"}
      </Item>
      <Item label="E-mail" span={1}>
        {(userEmail !== 'undefined') ? `${userEmail}` : 'Sem dados'}
      </Item>
      <Item label="Data de cadastro" span={1}>
        {profile.registerDate? `${(profile.registerDate)}` : 'Sem dados'}
      </Item>
      <Item label="Redes Sociais" span={1}>
        <Button
          icon={<GithubOutlined />}
          disabled={profile.githubLink === 'undefined' || profile.githubLink === ''}
          onClick={() => window.open(`${profile.githubLink}`, '_blank')} />
        <Button
          icon={<MediumOutlined />}
          disabled={profile.mediumLink === 'undefined' || profile.mediumLink === ''}
          onClick={() => window.open(`${profile.mediumLink}`, '_blank')} />
        <Button
          icon={<LinkedinOutlined />}
          disabled={profile.linkedinLink === 'undefined' || profile.linkedinLink === ''}
          onClick={() => window.open(`${profile.linkedinLink}`, '_blank')} />
        <Button
          icon={<FacebookOutlined />}
          disabled={profile.facebookLink === 'undefined' || profile.facebookLink === ''}
          onClick={() => window.open(`${profile.facebookLink}`, '_blank')} />
        <Button
          icon={<TwitterOutlined />}
          disabled={profile.twitterLink === 'undefined' || profile.twitterLink === ''}
          onClick={() => window.open(`${profile.twitterLink}`, '_blank')} />
      </Item>
    </Descriptions>
  );
};

export default ProfileDescription
