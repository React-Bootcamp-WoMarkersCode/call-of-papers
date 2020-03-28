import React from 'react'
import { Avatar, List, Card, Col, Row } from 'antd'
import data from './partners-list-test.json'

let db = data
const {Meta} = Card

const event = db[0]
db = db.splice(1, db.length)

const Partners = () => (
    <div>
        <Row>
            <Col span={16} offset={4}>
                <h1>{event} » Call for partners</h1>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={16} offset={4}>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={db}
                    renderItem={item => (
                    <List.Item>
                        <a href={item.website} target="_blank" rel="noopener noreferrer">
                            <Card 
                            hoverable
                            style={{height: 210}, {marginBottom: 20}} 
                            cover={<img src={item.avatar}/>}>
                            <Meta title={item.title}
                            />
                            </Card>
                        </a>
                    </List.Item>
                    )} 
                />
            </Col>
        </Row>
        
    </div>
);

export default Partners
