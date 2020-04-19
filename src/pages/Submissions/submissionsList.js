import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router'
import { Row, Divider, Table, Tag, Spin } from 'antd'
import { Link } from 'react-router-dom'

const SubmissionsList = () => {
  let { eventId } = useParams()
  let location = useLocation()
  const columnsTable = [
    {
      title: 'Palestrante',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Título da Palestra',
      dataIndex: 'activityTitle',
      key: 'activityTitle'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'status-cell',
      filters: [
        {
          text: 'EM ANÁLISE',
          value: 'EM ANÁLISE'
        },
        {
          text: 'APROVADO',
          value: 'APROVADO'
        },
        {
          text: 'REPROVADO',
          value: 'REPROVADO'
        }
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
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
          <Link to={`${location.pathname}/${key}`}>Mais detalhes</Link>
        </span>
      )
    },
  ]

  const [api, setApi] = useState([])

  const environment = 'http://localhost:3001';

  useEffect(() => {
    fetch(`${environment}/lectures`)
      .then(res => res.json())
      .then(data => {
        let filter = data.filter(lecture => lecture.eventId === eventId)
        setApi(filter)
      })
      .catch(err => console.error(err, 'Nenhuma palestra por aqui!'))
  }, [])

  return (
    <>
      <Row gutter={[16, 24]}>
        <Divider orientation="left">
          Propostas de Atividades
        </Divider>
      </Row>
      <Row justify="center" className='row-table'>
        <Table columns={columnsTable} dataSource={api} rowKey='id' onFilter/>
      </Row>
    </>
  )
}

export default SubmissionsList
