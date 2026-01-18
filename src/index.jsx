import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/tailwind.css';
import Routes from './Routes';
import { ProgressProvider } from './context/ProgressContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProgressProvider>
      <Routes />
    </ProgressProvider>
  </React.StrictMode>
);
