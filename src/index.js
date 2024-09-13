import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import { TransactionTokenProvider } from './context/token';
import { AdminAuthProvider } from './context/adminAuth';
import { ChakraProvider } from '@chakra-ui/react'
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react'
import { CurrencyAuthProvider } from './context/currency';

const { Button } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraBaseProvider theme={theme}>
    <CurrencyAuthProvider>
    <AdminAuthProvider>
      <AuthProvider>
        <TransactionTokenProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TransactionTokenProvider>
      </AuthProvider>
    </AdminAuthProvider>
    </CurrencyAuthProvider>
  </ChakraBaseProvider>
);

