import React, { useState, useEffect } from 'react'
import { Row, Divider, Table, Tag } from 'antd'
import { Link } from 'react-router-dom'

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
        text: 'Em análise',
        value: 'em análise'
      },
      {
        text: 'Aprovado',
        value: 'aprovado'
      },
      {
        text: 'Reprovado',
        value: 'reprovado'
      }
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.status.indexOf(value) === 0,
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

const SubmissionsList = () => {
  const [api, setApi] = useState([])

  const environment = 'http://localhost:3001';

  useEffect(() => {
    fetch(`${environment}/lectures`)
      .then(res => res.json())
      .then(data => {
        setApi(data)
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
        <Table columns={columnsTable} dataSource={api} rowKey='id' onFilter />
      </Row>
    </>
  )
}

export default SubmissionsList
