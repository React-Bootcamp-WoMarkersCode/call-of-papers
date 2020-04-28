import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { getCurrentDate } from './../../utils/currentDate'
import { getEnvironment } from './../../utils/environment'
import './style.scss'

const GglLogin = () => {
  const environment = getEnvironment()
  let history = useHistory()

  const responseGoogle = (response) => {
    // Verifica se é um novo usuário ou não. Se for, adiciona no json de usuários
    fetch(`${environment}/profiles`)
      .then((res) => res.json())
      .then((data) => {

        const user = data.find((profile) => profile.email === response.profileObj.email)

        if (!user) {
          let newProfile = {
            id: String(Math.ceil(Math.random() * Math.pow(10,5))),
            googleId: response.profileObj.googleId,
            name: response.profileObj.name,
            email: response.profileObj.email,
            password: '',
            localization: '',
            registerDate: `${getCurrentDate()}`,
            apresentation: '',
            githubLink: '',
            linkedinLink: '',
            twitterLink: '',
            facebookLink: '',
            mediumLink: '',
            interests: [],
            userPicture: response.profileObj.imageUrl
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
            .then(function (response) {
              localStorage.setItem('userId', response.id)
              localStorage.setItem('userName', response.name)
              localStorage.setItem('userEmail', response.email)
              localStorage.setItem('userRole', '')
              localStorage.setItem('userPicture', response.userPicture)
              history.push('/welcome')
            })
            .catch((err) => console.error(err, 'Não foi possível criar usuário'))
        }
        else {
          localStorage.setItem('userId', user.id)
          localStorage.setItem('userName', user.name)
          localStorage.setItem('userEmail', user.email)
          localStorage.setItem('userRole', user.role)
          localStorage.setItem('userPicture', user.userPicture)
          history.push('/')
        }
      })
      .catch((err) => console.error(err, 'Nenhum usuário encontrado'))
  }


  return (

    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_ID}
      render={(renderProps) => {
        return (<button className="google-button" onClick={renderProps.onClick}>
          <FontAwesomeIcon icon={faGoogle} />
          Continuar com o Google
        </button>);
      }}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GglLogin
