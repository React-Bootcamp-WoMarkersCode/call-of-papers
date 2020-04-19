import React, { useEffect, useState } from 'react'
import { Row, Divider, Col } from 'antd'
import CardEvent from './CardEvent'
import { getEnvironment } from './../../utils/environment'
import './style.scss'

import student from "../../assets/home/student.jpg";
import woman from "../../assets/home/woman.jpg";
import people from "../../assets/home/people.jpg";
import bootcamps from "../../assets/home/bootcamps.jpg";
import young from "../../assets/home/young.jpg";
import online from "../../assets/home/online.jpg";

const Home = () => {
  const [events, setEvents] = useState([])

  const environment = getEnvironment();

  useEffect(() => {
    fetch(`${environment}/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(data)
      })
      .catch(err => console.error(err, 'Nenhum evento por aqui!'))
  }, [])

  return (
    <>
      {/* Melhores eventos */}
      <Row gutter={[16, 24]} className="events-content">
        <Divider orientation="left">
          Encontre os melhores eventos
        </Divider>
        <div className="home-card">
          <div className="card-content">
            <div class="card-img">
              <img src={student} />
            </div>
            <span>Aprender</span>
          </div>
          <div className="card-content">
            <div class="card-img">
              <img src={people} />
            </div>
            <span>Workshops</span>
          </div>
          <div className="card-content">
            <div class="card-img">
              <img src={bootcamps} />
            </div>
            <span>Bootcamps</span>
          </div>
          <div className="card-content">
            <div class="card-img">
              <img src={online} />
            </div>
            <span>Eventos Online</span>
          </div>
          <div className="card-content">
            <div class="card-img">
              <img src={people} />
            </div>
            <span>Eventos Tecnologia</span>
          </div>
          <div className="card-content">
            <div class="card-img">
              <img src={young} />
            </div>
            <span>Meetups</span>
          </div>
        </div>
      </Row>

      {/* Para produtores */}
      <Row gutter={[16, 24]} className="producers-content">
        <Divider orientation="center">
          <p>Sharing Talks para produtores de eventos</p>
        </Divider>
        <Col span={16} offset={4}>
          <p className="titulo-content">
            Plataforma que conecta eventos da comunidade a voluntários(as).
          </p>
        </Col>
        <Col span={12}>
          oi
        </Col>
        <Col span={12}>
          <div>
            <p>
              <i class="fa fa-check" aria-hidden="true"></i>
              Cadastre eventos para a sua comunidade
            </p>
            <p>
              <i class="fa fa-check" aria-hidden="true"></i>
              Seja encontrado pelos palestrantes
            </p>
            <p>
              <i class="fa fa-check" aria-hidden="true"></i>
              Gerencie facilmente os eventos, as palestras submetidas e aprovados
            </p>
            <p>
              <i class="fa fa-check" aria-hidden="true"></i>
              Adicione o Call of Papers no site de seu evento
            </p>
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 24]} className="communication-content">
        <Col span={12} offset={6}>
          <p className="titulo">Ainda sem <b>palestrante</b> para o seu evento ou <b>gerencia seus eventos</b> com a Sharing Talks?</p>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Divider orientation="left">
          Eventos em destaque
        </Divider>
      </Row>
      <Row justify="center" gutter={[16, 24]} className='home-cards-container'>
        {events.map((event) => {
          return (
            <CardEvent key={event.id} event={event} />
          )
        })}
      </Row>
    </>
  )
}

export default Home
