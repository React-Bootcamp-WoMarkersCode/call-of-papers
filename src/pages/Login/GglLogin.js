import React from 'react'
import { GoogleLogin } from 'react-google-login';


const GglLogin = () => {

  const responseGoogle = (response) => {
    console.log(response);
  }

  return (

    <GoogleLogin
      clientId="838499203923-03pulm3dqm3u3695g98co9qomj3kd835.apps.googleusercontent.com"
      render={renderProps => (
        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
      )}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GglLogin
