import React, { useState, useEffect } from 'react'
import { Row, Tag, Button, Typography, Card } from 'antd'
import { Link, useHistory } from 'react-router-dom'
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
  const [ lectures, setLectures ] = useState([])
  const environment = getEnvironment()
  const history = useHistory()
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    fetch(`${environment}/lectures`)
      .then(res => res.json())
      .then(data => {
        let filter = data.filter(lecture => lecture.userId === Number(userId))
        setLectures(filter)
      })
      .catch(err => console.error(err, 'Nenhum usuário encontrado'))
  }, [environment, userId])

  return (
    <>
      { lectures.length > 0 ?
        (<>
          <Header text="Minhas palestras" />
          <Row justify="end" className='row-table'>
            <Button type='default'>
              <Link to='/download-lectures'><span>Faça o download de suas palestras!</span></Link>
            </Button>
          </Row>
          <Row justify="center" className='row-table'>
            <TableComponent columns={columnsTable} dataSource={ lectures } />
          </Row>
        </>) : (
          <Row justify="center" className='empty-box'>
            <Card>
              <p>Você ainda não possui palestras!</p>
              <Button
                type='default'
                className='btn-outline'
                onClick={() => history.push('/lectures/form')}>
                  Cadastrar uma nova palestra
              </Button>
            </Card>
          </Row>)
      }
    </>
  )
}

export default LecturesList
