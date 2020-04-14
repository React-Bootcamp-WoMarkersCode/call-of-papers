import React from 'react';
import { Row, Col, List } from 'antd'

const About = () => {
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
}

export default About;
