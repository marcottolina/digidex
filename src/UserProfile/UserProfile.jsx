import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import style from './UserProfile.module.css';
import {Spinner} from "reactstrap";

/**
 * User profile component that displays authenticated user information
 * Shows user avatar, name, and email
 */
const UserProfile = () => {
    //Take info by Auth0
    const { user, isAuthenticated, isLoading } = useAuth0();

    // Show loading state
    if (isLoading) {
        return (
            <Spinner color="light"></Spinner>
        );
    }

    // Don't show if not authenticated
    if (!isAuthenticated || !user) {
        return null;
    }

    //Render the first character of the user's name
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className={style.avatarCircle}
                 title={user.name}
            >
                {user.name ? (
                        user.name.charAt(0).toUpperCase()
                ) : (
                    "?"
                )}
            </div>
        </div>
    );
};

export default UserProfile;
