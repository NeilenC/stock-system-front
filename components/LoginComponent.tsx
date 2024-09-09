import { useMsal } from '@azure/msal-react';
import { useState } from 'react';
import { sendTokenToBackend } from '../functions/user/sendTokenToBackend';
import AuthButton from '../commons/buttons-commons/AuthButton';
import { loginRequest } from '../msal-config';
import { useRouter } from 'next/router';

const LoginComponent = () => {
  const { instance } = useMsal();
  const [userToken, setUserToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);

      const token = response.accessToken;

      console.log("acesstoken", token)

      const isValid = await sendTokenToBackend(token);

      if (isValid) {
        setUserToken(token);
        router.push('/home'); 
      } else {
        setError("Token inválido. Por favor, inicie sesión nuevamente.");
      }
    } catch (error) {
      console.error("Error en login:", error);
      setError("Ocurrió un error al intentar iniciar sesión. Intente de nuevo.");
    }
  };

  return (
    <div>
      <AuthButton handlerFunction={handleLogin} text='LOGIN'></AuthButton>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginComponent;
