import { PublicClientApplication } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    // clientId: 'c7485494-1018-406e-9298-abcadea99e2b', // Azure AD "",
    // authority: 'https://login.microsoftonline.com/072aeac6-76f2-4dac-8398-e409b07e8961', // Directory (tenant) ID
    // redirectUri: 'http://localhost:3000/home' // Redirect URI

    clientId: "7a57e61b-ae10-4e21-b08b-8ec064228edf", // Microsoft Entra ID,
    authority: "https://login.microsoftonline.com/0457d8f0-7265-49d0-9ebe-9da765cdb102", // Microsoft
    redirectUri: "http://localhost:3000", // Redirect URI
    
    // clientId: process.env.MSAL_CLIENT_ID,
    // authority: process.env.MSAL_AUTHORITY, // Directory (tenant) ID
    // redirectUri: process.env.MSAL_REDIRECT_URI, // Redirect URI
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  }
};

export const loginRequest = {
    scopes: ["User.Read"]
  };
  
//scopes:
// 'User.ReadWrite.All',       // Leer y escribir en todos los perfiles de usuario.
// 'Directory.ReadWrite.All',  // Leer y escribir en todos los objetos del directorio.
// 'Group.ReadWrite.All',      // Leer y escribir en todos los grupos.
// 'Mail.ReadWrite',           // Leer y escribir en todos los correos electrónicos.
// 'Calendars.ReadWrite',      // Leer y escribir en todos los calendarios.
// 'Contacts.ReadWrite',       // Leer y escribir en todos los contactos.
// 'Files.ReadWrite.All'       // Leer y escribir en todos los archivos.

export const msalInstance = new PublicClientApplication(msalConfig);
