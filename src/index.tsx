import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RedirectToLogin, RequiredAuthProvider } from "@propelauth/react";
import AuthWrapper from './Components/AuthWrapper';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RequiredAuthProvider authUrl="https://372270922.propelauthtest.com" displayIfLoggedOut={<RedirectToLogin postLoginRedirectUrl={"https://readyplayercredit.netlify.app"}/>}>
      <AuthWrapper />
    </RequiredAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
