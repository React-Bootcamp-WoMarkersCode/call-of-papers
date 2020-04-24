import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { Row, Table, Typography, Col } from 'antd'
import { Link } from 'react-router-dom'
import Header from './../../components/Header'

const { Paragraph } = Typography

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

  useEffect(() => {
    setAprovadas(lectures.filter(lecture => lecture.status === 'APROVADA'))
  }, [lectures])

  return (
    <>
      {
        aprovadas.length > 0 ?
          (
            <>
              <Header text="Palestras aprovadas" />
              <Row>
                <Col span={16} offset={4} justify="center">
                  <Table columns={columnsTable} dataSource={aprovadas} rowKey='id' />
                </Col>
              </Row>
            </>
          )
          :
          ('')
      }

    </>
  )
}

export default SubmissionsTable
