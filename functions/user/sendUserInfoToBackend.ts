export const sendUserInfoToBackend = async (userInfo: { name: string; email: string; microsoftId: string }) => {
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo}`,
        },
        body: JSON.stringify({ userInfo }),
      });

      if (response.ok) {
        const result = await response.json();
        return result.isValid;
      } else {
        switch (response.status) {
          case 400:
            throw new Error("Solicitud inválida. Verifique el formato del token.");
          case 401:
            throw new Error("Token no válido o expirado. Por favor, inicie sesión nuevamente.");
          case 403:
            throw new Error("No tiene permisos para realizar esta acción.");
          case 500:
            throw new Error("Error interno del servidor. Intente de nuevo más tarde.");
          default:
            throw new Error("Error al verificar el token.");
        }
      }
    } catch (error) {
      console.error("Error al enviar token al backend", error);
      return false;
    }
  };
