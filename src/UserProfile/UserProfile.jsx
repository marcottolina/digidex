import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import style from './UserProfile.module.css';

/**
 * User profile component that displays authenticated user information
 * Shows user avatar, name, and email
 */
const UserProfile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    // Show loading state
    if (isLoading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666' }}>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Loading...</span>
            </div>
        );
    }

    // Don't show if not authenticated
    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            {user.name && (
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <span className={style.name}>{user.name}</span>
                </div>
            )}


        </div>
    );
};

export default UserProfile;
