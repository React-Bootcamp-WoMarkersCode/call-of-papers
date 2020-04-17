import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Row, Descriptions, Button, Divider, Spin, Tag } from 'antd'
import { getEnvironment } from './../../utils/environment'

const { Item } = Descriptions

const Lecture = () => {
  let { lectureId } = useParams()
  const environment = getEnvironment()
  const [lecture, setLecture] = useState([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    fetch(`${environment}/lectures`)
      .then(res => res.json())
      .then(data => {
        setLecture(data.find(lecture => lecture.id === lectureId))
        console.log(data.find(lecture => lecture.id === lectureId))
      })
      .then(setLoadingData(false))
      .catch(err => console.error(err, 'Nenhum palestra encontrada'))
  }, [])

  const StatusColor = (status) => {

    if (status === 'APROVADO') {
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
            <Row gutter={[16, 24]}>
              <Divider orientation='left'>
                {lecture.activityTitle}
              </Divider>
            </Row>
            <Row justify='center' className='row-table'>
              <Descriptions layout='vertical' style={{ textAlign: 'justify' }}>
                <Item label='Descrição' span={3}>
                  {lecture.activityDescription}
                </Item>
                <Item label='Apresentação do Palestrante' span={3}>
                  {lecture.miniBio}
                </Item>
                <Item label='Tipo' span={3}>
                  {lecture.activityType}
                </Item>
                <Item label='Categoria' span={3}>
                  {lecture.activityCategory}
                </Item>
                <Item label='Status' span={3}>
                  <Tag color={StatusColor(lecture.status)} key={lecture.status}>
                    {lecture.status}
                  </Tag>
                </Item>
              </Descriptions>
            </Row>
            <Row justify='center' className='row-table'>
              {
                lecture.status === 'EM ANÁLISE' ?
                  <Button type='primary'>
                    <Link to="/lectures/form">Editar</Link>
                  </Button>
                  :
                  <Button type='primary' disabled='true'>
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
