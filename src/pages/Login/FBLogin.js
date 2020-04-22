import React from 'react'
import { useHistory } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'
import { getCurrentDate } from './../../utils/currentDate'
import { getEnvironment } from './../../utils/environment'

const FBLogin = ({ isDisabled, event, role }) => {
  let history = useHistory()
  const environment = getEnvironment()

  const responseFacebook = (response) => {
    // Armazena os dados do usuário no navegador. Quando houver logout eles serão apagados
    localStorage.setItem('userId', response.userID)
    localStorage.setItem('userPicture', response.picture.data.url)
    localStorage.setItem('userName', response.name)
    localStorage.setItem('userEmail', response.email)
    localStorage.setItem('userRole', role)

    // Se ele já tinha escolhido o evento anteriormente, será redirecionado para lá após login
    event? history.push(`/events/${event}`) :
    // Senão redireciona para a página inicial
    history.push('/')

    // Verifica se é um novo usuário ou não. Se for, adiciona no json de usuários
    fetch(`${environment}/profiles`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.find((profile) => profile.email === response.email)) {
          let newProfile = {
            id: response.userID,
            role: role,
            email: response.email? response.email : '',
            localization: '',
            registerDate: `${getCurrentDate()}`,
            apresentation: '',
            githubLink: '',
            linkedinLink: '',
            twitterLink: '',
            facebookLink: '',
            mediumLink: '',
            interests: []
          }
          fetch(`${environment}/profiles`, {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProfile)
          })
            .then(function(response) {
              console.log(response)
            })
            .catch((err) => console.error(err, 'Não foi possível criar usuário'))
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
    isDisabled={isDisabled}
  />
}

export default FBLogin
