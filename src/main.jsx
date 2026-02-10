import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Auth0ProviderWithNavigate } from './auth/Auth0ProviderWithNavigate'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './views/App/App.jsx'

createRoot(document.getElementById('root')).render(
    //Wrap the entire project with HashRouter and Auth0 providers
  <StrictMode>
      <HashRouter>
          <Auth0ProviderWithNavigate>
              <App />
          </Auth0ProviderWithNavigate>
      </HashRouter>
  </StrictMode>
)
