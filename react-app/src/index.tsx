import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

import config from "./config.json";
import { ThemeProvider } from '@mui/material';
import theme from './utils/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Auth0Provider
    domain={config.OAUTH_DOMAIN}
    clientId={config.OAUTH_CLIENT_ID}
    authorizationParams={{
      redirect_uri: `${window.location.origin}`,
      scopes: "openid profile email",
      audience: "https://hop-in.com",
    }}
  >
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
  </Auth0Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
