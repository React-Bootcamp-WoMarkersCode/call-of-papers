import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';

const FBLogin = () => {

    let history = useHistory()
    const [fbContent, setFbContent] = useState("");

    const responseFacebook = response => {

        // Armazena os dados do usuário no navegador. Quando houver logout eles serão apagados
        localStorage.setItem('userId', response.userID)
        localStorage.setItem('userPicture', response.picture.data.url)
        localStorage.setItem('userName', response.name)
        localStorage.setItem('userEmail', response.email)

        // Redireciona para a página inicial
        history.push("/");
    };

    useEffect(() => {
        // Lógica para o botão de login do facebook aparecer oi não na tela
        // Toda vez que o id de usuário armazenado na sessão mudar, ele vai executar isso

        if (!localStorage.getItem('userId')) {
            setFbContent(
                <FacebookLogin
                    appId="675476209915681"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook}
                />
            );
        }
        else {
            setFbContent("")
        }
    }, [localStorage.getItem('userId')])

    return (
        <div>
            {fbContent}
        </div>
    )

}

export default FBLogin;
