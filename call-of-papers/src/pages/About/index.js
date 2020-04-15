import React from 'react';
import { Row, Divider, List, Col } from 'antd'

const About = () => {
    return(
      <>
        <Row gutter={[16, 24]}>
          <Divider orientation="left">
            Sobre <i>Call for Papers</i>
          </Divider>
        </Row>
        <Row gutter={[16, 24]} className='home-cards-container'>
          <Col span={16} offset={2}>
            <p>Projeto final para conclusão do React Bootcamp da WoMakersCode.</p>
            <p>
              <a href="https://github.com/React-Bootcamp-WoMarkersCode/call-of-papers/tree/master/call-of-papers">
                Link do projeto no Github
              </a>
            </p>
          </Col>
          <Col span={16} offset={2}>
            <List>
              <h3>Desenvolvidor por:</h3>
              <List.Item>Alessandra Nastassja: <a href="https://github.com/Alessandra-Nastassja">Github</a> e <a href="https://www.linkedin.com/in/alessandra-nastassja/">Linkedin</a></List.Item>
              <List.Item>Isabella Soares: <a href="https://github.com/IsabellaSoares">Github</a> e <a href="https://www.linkedin.com/in/isabella-soares-lima/">Linkedin</a></List.Item>
              <List.Item>Kathleen Pallotta: <a href="https://github.com/kathleenpallotta">Github</a> e <a href="https://www.linkedin.com/in/kathleen-pallotta-ab8346199/">Linkedin</a></List.Item>
              <List.Item>Mariana Tancredi: <a href="https://github.com/matancredi">Github</a> e <a href="https://www.linkedin.com/in/mariana-t-52aa8b8b/">Linkedin</a></List.Item>
              <List.Item>Olívia Resende: <a href="https://github.com/oliviaresende">Github</a> e <a href="https://www.linkedin.com/in/oliviasilvaresende/">Linkedin</a></List.Item>
            </List>
          </Col>
        </Row>
      </>
    )
}

export default About;
