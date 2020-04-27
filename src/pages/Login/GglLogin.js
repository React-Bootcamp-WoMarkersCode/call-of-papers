import React from 'react'
import { GoogleLogin } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import './style.scss'

const GglLogin = (props) => {

  const responseGoogle = (response) => {
    console.log(response);
  }

  return (

    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_ID}
      render={(renderProps) => {
        return (<button className="google-button" onClick={renderProps.onClick} disabled={props.disabled}>
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
