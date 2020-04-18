import React, { useState, useEffect } from 'react'
import { Row, Divider, Tag, Button, Typography, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { getEnvironment } from './../../utils/environment'
import TableComponent from '../../components/Table'
import './lectures-list.scss'

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

      if (status.toLowerCase() === 'aprovado') {
        color = 'green';
      } else if (status.toLowerCase() === 'em análise') {
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
  const [ loadingData, setLoadingData ] = useState(true)
  const environment = getEnvironment()
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    fetch(`${environment}/lectures`)
      .then(res => res.json())
      .then(data => {
        let filter = data.filter(lecture => lecture.userId === userId)
        setLectures(filter)
      })
      .then(setLoadingData(false))
      .catch(err => console.error(err, 'Nenhum usuário encontrado'))
  }, [])

  return (
    <>
      { loadingData ?
        (
          <Row gutter={[16, 24]}>
            <Spin size='large' />
          </Row>
        )
          :
        (
          <>
            <Row gutter={[16, 24]}>
              <Divider orientation="left">
                Minhas palestras
              </Divider>
            </Row>
            <Row justify="end" className='row-table'>
              <Button type='default'>
                <Link to='/download-lectures'><span>Faça o download de suas palestras!</span></Link>
              </Button>
            </Row>
            <Row justify="center" className='row-table'>
              <TableComponent columns={columnsTable} dataSource={ loadingData ? [] : lectures } />
            </Row>
          </>
        )
      }
    </>
  )
}

export default LecturesList
