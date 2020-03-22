import React from 'react';
import { useParams } from 'react-router';
import { Row, Col, Avatar, Descriptions, Tag, List } from 'antd';
import { UserOutlined, GithubOutlined, MediumOutlined, LinkedinOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';

const { Item } = Descriptions;

const MyProfile = () => {
    let { profileId } = useParams();

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
        <Col span={16} offset={4} style={{backgroundColor: '#FFF'}}>
          <Row>
            <Col span={6} style={{backgroundColor: '#000', textAlign: 'center'}}>
              <Avatar shape="square" size={100} icon={<UserOutlined />} />
            </Col>
            <Col span={18}>
              <Descriptions title={`Nome do usuário ${profileId}`} layout="vertical">
                <Item label="Apresentação" span={3}>
                  Adicione sua apresentação
                </Item>
                <Item label="Interesses" span={3}>
                  {interests && interests.map(item => <Tag style={{marginBottom: '8px'}}>{item}</Tag>)}
                </Item>
                <Item label="Comunidades">
                <List
                  itemLayout="horizontal"
                  dataSource={communities}
                  renderItem={item => (
                    <List.Item style={{borderBottom: '0px', padding: '0 0 8px 0'}}>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" src={item.avatar} />}
                        title={item.title}
                      />
                    </List.Item>
                  )}
                />
                </Item>
                <Item label="Redes Sociais" style={{verticalAlign: 'baseline'}}>
                  <GithubOutlined style={{fontSize: '25px', marginRight: '8px'}} />
                  <MediumOutlined style={{fontSize: '25px', marginRight: '8px'}} />
                  <LinkedinOutlined style={{fontSize: '25px', marginRight: '8px'}} />
                  <FacebookOutlined style={{fontSize: '25px', marginRight: '8px'}} />
                  <TwitterOutlined style={{fontSize: '25px', marginRight: '8px'}} />
                </Item>
              </Descriptions>
            </Col>
          </Row>
        </Col>
      </Row>
      </>
    );
};

export default MyProfile;
