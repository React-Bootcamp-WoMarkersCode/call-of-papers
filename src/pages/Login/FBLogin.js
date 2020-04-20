import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'
import { getCurrentDate } from './../../utils/currentDate'
import { getEnvironment } from './../../utils/environment'

const FBLogin = ({ isDisabled }) => {
	let history = useHistory()
	const environment = getEnvironment()
  const [ fbContent, setFbContent ] = useState('')

	const responseFacebook = (response) => {
		// Armazena os dados do usuário no navegador. Quando houver logout eles serão apagados
		localStorage.setItem('userId', response.userID)
		localStorage.setItem('userPicture', response.picture.data.url)
		localStorage.setItem('userName', response.name)
		localStorage.setItem('userEmail', response.email)

		// Redireciona para a página inicial
		history.push('/')

		// Verifica se é um novo usuário ou não. Se for, adiciona no json de usuários
		fetch(`${environment}/profiles`)
			.then((res) => res.json())
			.then((data) => {
				if (!data.find((profile) => profile.id === localStorage.getItem('userId'))) {
					let newProfile = new Object({
						id: response.userID,
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
					})
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

	useEffect(
		() => {
			// Lógica para o botão de login do facebook aparecer ou não na tela
			// Toda vez que o id de usuário armazenado na sessão mudar, ele vai executar isso

			if (!localStorage.getItem('userId')) {
				setFbContent(
					<FacebookLogin
						appId="675476209915681"
						autoLoad={false}
						fields="name,email,picture"
            callback={responseFacebook}
            icon="fa-facebook"
            language="pt"
            textButton="Continuar com o facebook"
            size="small"
            isDisabled={isDisabled}
					/>
				)
			} else {
				setFbContent('')
			}
		},
		[ localStorage.getItem('userId'), isDisabled ]
	)

	return fbContent
}

export default FBLogin
