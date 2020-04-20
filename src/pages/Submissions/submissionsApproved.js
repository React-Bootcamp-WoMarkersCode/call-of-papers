import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router'
import { Row, Divider, Table, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Paragraph } = Typography

const SubmissionsApproved = () => {
  let { eventId } = useParams()
  let location = useLocation()
  const columnsTable = [
    {
      title: 'Palestrante',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: name => (
        <Paragraph ellipsis={{ rows: 2, expandable: false }}>{name}</Paragraph>
      )
    },
    {
      title: 'Título da Palestra',
      dataIndex: 'activityTitle',
      key: 'activityTitle',
      width: '30%',
      render: title => (
        <Paragraph ellipsis={{ rows: 2, expandable: false }}>{title}</Paragraph>
      )
    },
    {
      title: 'Descrição',
      dataIndex: 'activityDescription',
      key: 'activityDescription',
      width: '30%',
      render: description => (
        <Paragraph ellipsis={{ rows: 2, expandable: false }}>{description}</Paragraph>
      )
    },
    {
      dataIndex: 'id',
      key: 'id',
      width: '10%',

      render: (key) => (
        <span>
          <Link to={`${location.pathname}/${key}`}>Mais detalhes</Link>
        </span>
      )
    },
  ]

  const [aprovadas, setAprovadas] = useState([])
  const environment = 'http://localhost:3001';

  useEffect(() => {
    fetch(`${environment}/lectures`)
      .then(res => res.json())
      .then(data => {
        let filter = data.filter(lecture => lecture.eventId === eventId && lecture.status === 'APROVADA')
        setAprovadas(filter)
      })
      .catch(err => console.error(err, 'Nenhuma palestra por aqui!'))
  }, [eventId])

  return (
    <>
      <Row gutter={[16, 24]}>
        <Divider orientation="left">
          Palestras aprovadas
        </Divider>
      </Row>
      <Row justify="center" className='row-table'>
        <Table columns={columnsTable} dataSource={aprovadas} rowKey='id' />
      </Row>
    </>
  )
}

export default SubmissionsApproved
