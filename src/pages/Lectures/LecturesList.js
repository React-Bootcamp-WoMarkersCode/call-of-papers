import React, { useState, useEffect } from 'react'
import { Row, Col, Tag, Button, Typography, Card, Spin } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

import { getEnvironment } from './../../utils/environment'
import TableComponent from '../../components/Table'
import './lectures-list.scss'
import Header from '../../components/Header'

const { Paragraph } = Typography

const columnsTable = [
  {
    title: 'Título',
    dataIndex: 'activityTitle',
    key: 'title',
    width: '20%',
    className: 'title-cell'
  },
  {
    title: 'Descrição',
    dataIndex: 'activityDescription',
    key: 'description',
    width: '55%',
    render: status => {
      return (
        <Paragraph ellipsis={{ rows: 2, expandable: false }} >
          {status}
        </Paragraph>
      );
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    className: 'status-cell',
    render: status => {
      let color = '';

      if (status === 'APROVADA') {
        color = 'green';
      } else if (status === 'EM ANÁLISE') {
        color = 'geekblue';
      } else {
        color = 'volcano';
      }

      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    }
  },
  {
    dataIndex: 'id',
    key: 'id',
    render: (key) => (
      <span>
        <Link to={`/lectures/${key}`}>Mais detalhes</Link>
      </span>
    )
  },
]

const LecturesList = () => {
  const [lectures, setLectures] = useState([])
  const [loading, setLoading] = useState(true)
  const environment = getEnvironment()
  const history = useHistory()
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    fetch(`${environment}/lectures`)
      .then(res => res.json())
      .then(data => {
        let filter = data.filter(lecture => lecture.userId === userId)
        setLectures(filter)
      })
      .then(setTimeout(() => { setLoading(false) }, 200))
      .catch(err => console.error(err, 'Nenhum usuário encontrado'))
  }, [environment, userId])

  return (
    <>
      {loading ? (
        <Row gutter={[16, 24]}>
          <Spin size='large' />
        </Row>
        ) :
        lectures.length > 0 ? (
          <Row>
            <Col>
              <Row justify="space-between">
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Header text="Minhas palestras" />
                </Col>
                <Col>
                  <Button
                    type='default'
                    className='btn-outline'
                    onClick={() => history.push('/download-lectures')}
                  >
                    <FontAwesomeIcon icon={faDownload} /> Excel
                </Button>
                  <Button
                    type='default'
                    className='btn-outline'
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => history.push('/lectures/form')}>
                    Nova palestra
                </Button>
                </Col>
              </Row>
              <Row style={{ marginTop: '1rem' }}>
                <TableComponent columns={columnsTable} dataSource={lectures} />
              </Row>
            </Col>
          </Row>
        ) : (
            <Row>
              <Col xs={{ span: 24 }} className='empty-box'>
                <Card>
                  <p>Você ainda não possui palestras!</p>
                  <Button
                    type='default'
                    className='btn-outline'
                    onClick={() => history.push('/lectures/form')}>
                    Cadastrar uma nova palestra
              </Button>
                </Card>
              </Col>
            </Row>
          )}
    </>
  )
}

export default LecturesList
