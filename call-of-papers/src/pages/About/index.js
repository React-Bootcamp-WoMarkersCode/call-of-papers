import React from 'react';
<<<<<<< Updated upstream
import { Row, Col, List } from 'antd'

function About(){
    return(
        <>
      <Row justify='center'>
        <Col span={16}>
          <div>
            <h1>Call For Papers</h1>
          </div>
          <div>
            <p style={{ textAlign: 'justify'}}>
                Projeto final para conclusão do React Bootcamp da WoMakersCode. 
                <br></br>
                Link do projeto no Github: <a href="https://github.com/React-Bootcamp-WoMarkersCode/call-of-papers/tree/master/call-of-papers">Clique Aqui</a>
            </p>
            <List>
                <h3>Desenvolvidor por:</h3>
                <List.Item>Alessandra Nastassja: <a href="https://github.com/Alessandra-Nastassja">Github</a> e <a href="https://www.linkedin.com/in/alessandra-nastassja/">Linkedin</a></List.Item>
                <List.Item>Fernanda Ramos: <a href="https://github.com/arfernanda">Github</a> e <a href="https://www.linkedin.com/in/fernanda-ramos-azevedo/">Linkedin</a></List.Item>
                <List.Item>Isabella Soares: <a href="https://github.com/IsabellaSoares">Github</a> e <a href="https://www.linkedin.com/in/isabella-soares-lima/">Linkedin</a></List.Item>
                <List.Item>Kathleen Pallotta: <a href="https://github.com/kathleenpallotta">Github</a> e <a href="https://www.linkedin.com/in/kathleen-pallotta-ab8346199/">Linkedin</a></List.Item>
                <List.Item>Mariana Tancredi: <a href="https://github.com/matancredi">Github</a> e <a href="https://www.linkedin.com/in/mariana-t-52aa8b8b/">Linkedin</a></List.Item>
                <List.Item>Olívia Resende: <a href="https://github.com/oliviaresende">Github</a> e <a href="https://www.linkedin.com/in/oliviasilvaresende/">Linkedin</a></List.Item>
            </List>
          </div>
        </Col>
      </Row>
    </>
    )
=======
import { Row, Divider, List, Col } from 'antd'
import { LinkedinOutlined, GithubOutlined } from '@ant-design/icons';

const About = () => {
  return (
    <>
      <Row gutter={[16, 24]}>
        <Divider orientation="left">
          Sobre <i>Call for Papers</i>
        </Divider>
      </Row>
      <Row gutter={[16, 24]} className='home-cards-container'>
        <Col span={12} offset={4} style={{ textAlign: 'justify' }}>
          <p>O Call For Papers é uma platarforma para conectar eventos a palestrantes. Permite que organizadores criem eventos e abra para cadastro de palestrantes que tenham interesse naquele evento.</p>
          <p>Projeto final desenvolvido no React Bootcamp da WoMakersCode como forma aplicar os conhecimentos adquiridos ao longo do curso. Para acessar o código desenvolvido no <a href="https://github.com/React-Bootcamp-WoMarkersCode/call-of-papers/tree/master/call-of-papers">
            GitHub <GithubOutlined /></a>.</p>
          <List>
            <Col span={12}>
            <p>Desenvolvido por:</p>
              <List.Item>Alessandra Nastassja: <a href="https://github.com/Alessandra-Nastassja">GitHub <GithubOutlined /></a> e <a href="https://www.linkedin.com/in/alessandra-nastassja/">Linkedin <LinkedinOutlined /></a></List.Item>
              <List.Item>Isabella Soares: <a href="https://github.com/IsabellaSoares">GitHub <GithubOutlined /></a> e <a href="https://www.linkedin.com/in/isabella-soares-lima/">Linkedin <LinkedinOutlined /></a></List.Item>
              <List.Item>Kathleen Pallotta: <a href="https://github.com/kathleenpallotta">GitHub <GithubOutlined /></a> e <a href="https://www.linkedin.com/in/kathleen-pallotta-ab8346199/">Linkedin <LinkedinOutlined /></a></List.Item>
              <List.Item>Mariana Tancredi: <a href="https://github.com/matancredi">GitHub <GithubOutlined /></a> e <a href="https://www.linkedin.com/in/mariana-t-52aa8b8b/">Linkedin <LinkedinOutlined /></a></List.Item>
              <List.Item>Olívia Resende: <a href="https://github.com/oliviaresende">GitHub <GithubOutlined /></a> e <a href="https://www.linkedin.com/in/oliviasilvaresende/">Linkedin <LinkedinOutlined /></a></List.Item>
            </Col>
          </List>
        </Col>
      </Row>
    </>
  )
>>>>>>> Stashed changes
}

export default About;