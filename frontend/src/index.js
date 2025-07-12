// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme'; // Import our new theme
import { ThemeProvider, CssBaseline } from '@mui/material';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* A modern reset for CSS consistency */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);