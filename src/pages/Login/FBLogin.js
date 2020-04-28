import React from 'react'
import { useHistory } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'
import { getCurrentDate } from './../../utils/currentDate'
import { getEnvironment } from './../../utils/environment'

const FBLogin = ({ event }) => {
  let history = useHistory()
  const environment = getEnvironment()

  const responseFacebook = (response) => {
    // Verifica se é um novo usuário ou não. Se for, adiciona no json de usuários
    fetch(`${environment}/profiles`)
      .then((res) => res.json())
      .then((data) => {

        const user = data.find((profile) => profile.email === response.email)

        if (!user) {
          let newProfile = {
            id: String(Math.ceil(Math.random() * Math.pow(10,5))),
            facebookId: response.userID,
            googleId: '',
            role: '',
            name: response.name,
            email: response.email? response.email : '',
            localization: '',
            registerDate: `${getCurrentDate()}`,
            apresentation: '',
            githubLink: '',
            linkedinLink: '',
            twitterLink: '',
            facebookLink: '',
            mediumLink: '',
            interests: [],
            userPicture: response.picture.data.url
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
              // Armazena os dados do usuário no navegador. Quando houver logout eles serão apagados
              localStorage.setItem('userId', response.id)
              localStorage.setItem('userPicture', response.userPicture)
              localStorage.setItem('userName', response.name)
              localStorage.setItem('userEmail', response.email)
              localStorage.setItem('userRole', '')

              // Se ele já tinha escolhido o evento anteriormente, será redirecionado para lá após login
              event? history.push(`/events/${event}`) :
              // Senão redireciona para a página inicial
              history.push('/welcome')
            })
            .catch((err) => console.error(err, 'Não foi possível criar usuário'))
        } else {
          localStorage.setItem('userId', user.id)
          localStorage.setItem('userName', user.name)
          localStorage.setItem('userEmail', user.email)
          localStorage.setItem('userRole', user.role)
          localStorage.setItem('userPicture', user.userPicture)

          // Se ele já tinha escolhido o evento anteriormente, será redirecionado para lá após login
          event? history.push(`/events/${event}`) :
          // Senão redireciona para a página inicial
          history.push('/')
        }
      })
      .catch((err) => console.error(err, 'Nenhum usuário encontrado'))
  }


	return <FacebookLogin
    appId={process.env.REACT_APP_FACEBOOK_ID}
    autoLoad={false}
    fields="name,email,picture"
    callback={responseFacebook}
    icon="fa-facebook"
    language="pt"
    textButton="Continuar com o facebook"
    size="small"
  />
}

export default FBLogin
