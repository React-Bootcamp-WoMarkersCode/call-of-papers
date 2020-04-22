import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { Row, Table, Typography, Card, Col, Button } from 'antd'
import { Link } from 'react-router-dom'
import Header from './../../components/Header'
import { copyToCliboard } from '../../utils/copyToCliboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

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
    lectures && setAprovadas(lectures.filter(lecture => lecture.status === 'APROVADA'))
  }, [lectures])

  return (
    <>
    <Header text="Palestras aprovadas" />
      {
        aprovadas.length > 0 ?
          (
            <Row justify="center" className='row-table'>
              <Table columns={columnsTable} dataSource={aprovadas} rowKey='id' />
            </Row>
          )
          :
          (
            <Row>
              <Col span={16} offset={4} justify="center">
                <Card style={{textAlign:'center'}}>
                  <p>Quando os palestrantes submeterem as palestas, você poderá gerenciá-las aqui.</p>
                  <p>Compartilhe o link do seu evento para realizar o Call of Papers.</p>
                  <Button type="link" onClick={() => copyToCliboard()} style={{ padding: 0 }}>
                  <FontAwesomeIcon icon={faLink} />Copiar link para Call of Papers
                </Button>
                </Card>
              </Col>
            </Row>)
      }

    </>
  )
}

export default SubmissionsTable
