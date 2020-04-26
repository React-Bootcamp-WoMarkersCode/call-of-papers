import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { Row, Table, Typography, Col } from 'antd'
import { Link } from 'react-router-dom'
import Header from './../../components/Header'

const { Paragraph, Title } = Typography

const useColumnsTable = () => {
  let location = useLocation()

  return [
    {
      title: 'Palestrante',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: name => {
        let tmp = name.split(" ");
        name = tmp[0] + " " + tmp[tmp.length - 1];
        return <Paragraph>{name}</Paragraph>
      }
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
      title: 'Ações',
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
}

const SubmissionsTable = ({ lectures }) => {
  const columnsTable = useColumnsTable()
  const [aprovadas, setAprovadas] = useState([])
  const [reprovadas, setReprovadas] = useState([])

  useEffect(() => {
    setAprovadas(lectures.filter(lecture => lecture.status === 'APROVADA'))
    setReprovadas(lectures.filter(lecture => lecture.status === 'REPROVADA'))
  }, [lectures])

  return (
    <>
      {
        aprovadas.length > 0 ?(
          <>
            <Row>
              <Col xs={{ span: 22, offset: 1 }} md={{ span: 16, offset: 4 }}>
                <Title level={3}>
                  Palestras aprovadas
                </Title>
                <Table columns={columnsTable} dataSource={aprovadas} rowKey='id' />
              </Col>
            </Row>
          </>
        ) : ('')
      }
      {
        reprovadas.length > 0 ?(
          <>
            <Row>
              <Col xs={{ span: 22, offset: 1 }} md={{ span: 16, offset: 4 }}>
                <Title level={3}>
                  Palestras reprovadas
                </Title>
                <Table columns={columnsTable} dataSource={reprovadas} rowKey='id' />
              </Col>
            </Row>
          </>
        ) : ('')
      }
    </>
  )
}

export default SubmissionsTable
