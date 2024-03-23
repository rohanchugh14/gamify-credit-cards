import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import { RequiredAuthProvider } from "@propelauth/react";


import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RequiredAuthProvider authUrl="https://372270922.propelauthtest.com/">
    <ChakraProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
      </BrowserRouter>
    </ChakraProvider>
    </RequiredAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
