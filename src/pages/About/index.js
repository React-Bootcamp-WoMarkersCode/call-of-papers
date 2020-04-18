import React from 'react';
import { Row, Divider, List, Col } from 'antd'
import { LinkedinOutlined, GithubOutlined} from '@ant-design/icons'
const About = () => {
    return(
      <>
        <Row gutter={[16, 24]}>
          <Divider orientation="left">
            Sobre <i>Sharing Talks</i>
          </Divider>
        </Row>
        <Row gutter={[16, 24]} className='home-cards-container'>
          <Col span={16} offset={4} style={{ textAlign: 'justify' }}>
            <p><i>Sharing Talks</i> é uma plataforma para conectar eventos a palestrantes.
              Possibilitando que organizadores criem eventos e encontrem palestrantes que tenham interesse em participar desse evento.
              Os palestrantes podem cadastrar na plataforma as suas propostas de atividades e enviá-las aos organizadores dos eventos.
              Os organizadores também podem divulgar o interesse por patrocinadores e voluntários.</p>
            <p>A plataforma <i>Sharing Talks</i> é o projeto final desenvolvido no <a href='https://womakerscode.org/'><strong>React Bootcamp da WoMakersCode</strong></a> como forma de aplicar os conhecimentos adquiridos ao longo do curso.
              O projeto está disponível no <a href="https://github.com/React-Bootcamp-WoMarkersCode/call-of-papers/tree/master/call-of-papers">GitHub <GithubOutlined />.</a>
            </p>
            <List>
              <Col span={12}>
              <h3>Desenvolvedoras</h3>
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
}

export default About;
