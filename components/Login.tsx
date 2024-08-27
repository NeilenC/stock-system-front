import React from 'react'
import { useMsal } from '@azure/msal-react';
import { useRouter } from 'next/router';
import { loginRequest } from '../msal-config';
import AuthButton from '../commons/AuthButton';

const Login = () => {

  const { instance } = useMsal();
  const router = useRouter()

  const handleLogin = () => {
    instance
      .loginPopup(loginRequest)
      .then((response) => {
        console.log('Login successful:', response);
        router.push('/home');
      })
      .catch((e) => {
        console.error('Error during login:', e);
      });
  };

  return (
    <div>
      <AuthButton handlerFunction={handleLogin} text={'Iniciar sesión con Microsoft'}/>
    </div>
  )
}

export default Login
