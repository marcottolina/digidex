import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

/**
 * Auth0Provider wrapper that works with HashRouter
 * For GitHub Pages deployment with nested base path
 */
export const Auth0ProviderWithNavigate = ({ children }) => {
    //Take domain and clientId by the environment
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

    // Create the redirect URI (also online)
    const redirectUri = window.location.hostname === 'localhost'
        ? window.location.origin
        : 'https://marcottolina.github.io/digidex/';

    // Show error if configuration is missing
    if (!domain || !clientId) {
        return (
            <div className="container p-5 text-center">
                <h2 className="text-danger">Auth0 Configuration Error</h2>
                <p>Missing VITE_AUTH0_DOMAIN or VITE_AUTH0_CLIENT_ID in .env file.</p>
            </div>
        );
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
            }}
            useRefreshTokens={true}
            cacheLocation="localstorage"
        >
            {children}
        </Auth0Provider>
    );
};
