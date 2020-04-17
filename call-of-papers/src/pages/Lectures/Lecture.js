import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Row, Descriptions, Button, Divider, Spin } from 'antd'
import { getEnvironment } from './../../utils/environment'

const { Item } = Descriptions

const Lecture = () => {
  let { lectureId } = useParams()
  const environment = getEnvironment()
  const [ lecture, setLecture ] = useState([])
  const [ loadingData, setLoadingData ] = useState(true)

  useEffect(() => {
    fetch(`${environment}/lectures`)
      .then(res => res.json())
      .then(data => {
        setLecture(data.find(lecture => lecture.id === lectureId))
        console.log(data.find(lecture => lecture.id === lectureId))
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
            <Divider orientation='left'>
              {lecture.activityTitle}
            </Divider>
          </Row>
          <Row justify='center' className='row-table'>
            <Descriptions layout='vertical'>
              <Item label='Descrição' span={3}>
                {lecture.activityDescription}
              </Item>
              <Item label='Apresentação do Palestrante' span={3}>
                {lecture.apresentation}
              </Item>
            </Descriptions>
          </Row>
          <Row justify='center' className='row-table'>
            <Button type='primary'>Editar</Button>
          </Row>
          </>
        )
      }
    </>
  )
}

export default Lecture
