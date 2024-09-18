import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
//import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux-rtk/store'
import { ThemeProvider } from '@mui/material';
import { theme } from "./theme"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
