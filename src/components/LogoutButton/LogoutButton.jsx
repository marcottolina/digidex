import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'reactstrap';
import style from './LogoutButton.module.css';

/**
 * Logout button component that triggers Auth0 logout
 * Automatically hides when user is not authenticated
 */
const LogoutButton = () => {
    const { logout, isAuthenticated, isLoading } = useAuth0();

    // Don't show if not logged in
    if (!isAuthenticated) {
        return null;
    }

    // Show loading state
    if (isLoading) {
        return (
            <Button disabled>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Loading...
            </Button>
        );
    }

    const handleLogout = () => {
        // Redirect back to the current page after logout
        logout({
            logoutParams: {
                returnTo: window.location.origin + window.location.pathname
            }
        });
    };

    return (
        <Button
            onClick={handleLogout}
            className={`${style.button} ms-3`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
        </Button>
    );
};

export default LogoutButton;
