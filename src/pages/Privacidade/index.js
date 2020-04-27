import React from 'react'
import { Row, Col, Typography, Descriptions } from 'antd'

const { Title } = Typography

const Privacidade = () => {
  return (
    <>
      <Row>
        <Col span={20} offset={2}>
          <Title>Política de Privacidade de Dados</Title>
          <Descriptions title="Levamos sua privacidade a sério. Veja aqui nosso compromisso com a proteção de seus dados pessoais." layout='vertical' style={{ textAlign: 'justify' }}>
            <Descriptions.Item span={16}>
              <p>Ao acessar o site e serviços da <i>Sharing Talks</i> e tendo essas informações disponíveis, bem como seus direitos aqui expostos, você outorga o direito de uso sobre os dados coletados e compartilhados nos moldes das finalidades condições e formas aqui expostas.</p>
            </Descriptions.Item>
            <Descriptions.Item label="Quais dados são coletados?" span={16}>
              Ao criar uma conta própria para navegar no site e ao enviar formulários de eventos ou palestras estes dados são armazenados pela <i>Sharing Talks</i>.
            </Descriptions.Item>
            <Descriptions.Item label="Para que os Dados são Utilizados?" span={16}>
              As informações que você compartilha com a <i>Sharing Talks</i> têm como finalidade a gestão, administração, prestação, ampliação e melhoramento dos Sites e dos Serviços.
            </Descriptions.Item>
            <Descriptions.Item label="Com quem meus dados serão compartilhados?" span={16}>
              O organizador de eventos terá acesso as infomações cadastradas pelo palestrante a fim de analisar uma possivel aprovação da palestra cadastrada no evento.
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </>
  )
}

export default Privacidade
