import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Row, Descriptions, Button, Spin, Tag } from 'antd'
import { getEnvironment } from './../../utils/environment'
import { Header } from './../../components/Header'

const { Item } = Descriptions

const Lecture = () => {
  let { lectureId } = useParams()
  const environment = getEnvironment()
  const [lecture, setLecture] = useState([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    fetch(`${environment}/lectures/${lectureId}`)
      .then(res => res.json())
      .then(data => {
        setLecture(data)
      })
      .then(setLoadingData(false))
      .catch(err => console.error(err, 'Nenhum palestra encontrada'))
  }, [environment, lectureId])

  const StatusColor = (status) => {

    if (status === 'APROVADA') {
      return 'green';
    } else if (status === 'EM ANÁLISE') {
      return 'geekblue';
    } else {
      return 'volcano';
    }

  }

  return (
    <>
      {loadingData ?
        (
          <Row gutter={[16, 24]}>
            <Spin size='large' />
          </Row>
        )
        :
        (
          <>
            <Header text={lecture && lecture.activityTitle} />
            <Row justify='center' className='row-table'>
              <Descriptions layout='vertical' style={{ textAlign: 'justify' }}>
                <Item label='Descrição' span={3}>
                  {lecture && lecture.activityDescription}
                </Item>
                <Item label='Apresentação do Palestrante' span={3}>
                  {lecture && lecture.apresentation}
                </Item>
                <Item label='Tipo' span={3}>
                  {lecture && lecture.activityType}
                </Item>
                <Item label='Categoria' span={3}>
                  {lecture && lecture.activityCategory}
                </Item>
                <Item label='Status' span={3}>
                  <Tag color={StatusColor(lecture && lecture.status)} key={lecture && lecture.status}>
                    {lecture && lecture.status}
                  </Tag>
                </Item>
              </Descriptions>
            </Row>
            <Row justify='center' className='row-table'>
              {
                lecture && lecture.status === 'EM ANÁLISE' ?
                  <Button type='primary'>
                    <Link to="/lectures/form">Editar</Link>
                  </Button>
                  :
                  <Button type='primary' disabled={true}>
                    Editar
                  </Button>
              }
            </Row>
          </>
        )
      }
    </>
  )
}

export default Lecture
