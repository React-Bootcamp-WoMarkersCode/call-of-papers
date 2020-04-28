import React from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col, Button } from 'antd'
import { getEnvironment } from './../../utils/environment'
import { Formik } from 'formik'
import { Input, Form } from 'formik-antd'
import { getCurrentDate } from './../../utils/currentDate'

var CryptoJS = require("crypto-js");

const MailLoginForm = () => {
  let history = useHistory()
  const environment = getEnvironment()

  const validateUsername = (value) => {
    let error;
    if (value === '') {
      error = 'Obrigatório';
    }
    return error;
  }

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Obrigatório';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Endereço de e-mail inválido';
    }
    return error;
  }

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = 'Obrigatório';
    } else if (value.length < 6) {
      error = 'A senha deve conter pelo menos 6 dígitos';
    }
    return error;
  }

	const handleSubmit = (values) => {
    // Verifica se é um novo usuário ou não. Se for, adiciona no json de usuários
    fetch(`${environment}/profiles`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.find((profile) => profile.email === values.email)) {
          const cipherPassword = CryptoJS.AES.encrypt(JSON.stringify(values.password), process.env.REACT_APP_CIPHER_KEY).toString();

          let newProfile = {
            id: values.id,
            name: values.name,
            email: values.email? values.email : '',
            password: cipherPassword,
            localization: '',
            registerDate: `${getCurrentDate()}`,
            apresentation: '',
            githubLink: '',
            linkedinLink: '',
            twitterLink: '',
            facebookLink: '',
            mediumLink: '',
            interests: [],
            userPicture: ''
          }
          fetch(`${environment}/profiles`, {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProfile)
          })
            .then(response => response.json())
            .then(function(response) {
              localStorage.setItem('userId', response.id)
              localStorage.setItem('userName', response.name)
              localStorage.setItem('userEmail', response.email)
              localStorage.setItem('userRole', '')
              history.push('/welcome')
            })
            .catch((err) => console.error(err, 'Não foi possível criar usuário'))
        }
      })
      .catch((err) => console.error(err, 'Nenhum usuário encontrado'))
	}

  let initialValues = {
    id: String(Math.ceil(Math.random() * Math.pow(10,5))),
    name: '',
    email: '',
    password: ''
	}

  return (
    <>
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      render={() => (
        <Form layout="vertical" style={{textAlign: 'center'}}>
          <Row justify='center'>
            <Col xs={24} md={14}>
              <Form.Item
                label="Nome"
                name="name"
                validate={validateUsername}
              >
                <Input name="name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={14}>
              <Form.Item
                label="Email"
                name="email"
                validate={validateEmail}
              >
                <Input name="email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={14}>
              <Form.Item
                label="Senha"
                name="password"
                type="password"
                validate={validatePassword}
              >
                <Input.Password name="password" />
              </Form.Item>
            </Col>
            <Col xs={24} md={14}>
              <Button type='default' className='btn-outline' htmlType='submit'>
                Enviar
              </Button>
            </Col>
            <Col xs={24} md={14} style={{marginTop: '2em'}}>
              <Button type='default' className='btn-register'>
                Ainda não tem cadastro? Clique aqui e faça seu cadastro!
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    />
  </>)
}

export default MailLoginForm
