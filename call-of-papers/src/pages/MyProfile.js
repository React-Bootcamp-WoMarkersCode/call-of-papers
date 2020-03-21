import React from 'react';
import { useParams } from 'react-router';
import { Row, Col, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

const MyProfile = () => {
    let { profileId } = useParams();

    return (
      <>
      <Row>
        <Col span={16} offset={4}>
          <h2>My Profile ID: {profileId}</h2>
        </Col>
        <Col span={16} offset={4} style={{backgroundColor: '#FFF'}}>
          <Row>
            <Col span={6} style={{backgroundColor: '#000', textAlign: 'center'}}>
              <Avatar shape="square" size={100} icon={<UserOutlined />} />
            </Col>
            <Col span={18}>
              <Title level={4}>Username</Title>
            </Col>
          </Row>
        </Col>
      </Row>
      </>
    );
};

export default MyProfile;
