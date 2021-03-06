import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';

import Routes from './routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>

    <GlobalStyle />
  </>
);

export default App;
