import React, { use } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate } from 'react-router';
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner';

const PriviteRoute = ({ children }) => {
    const { user, loading, roleLoading, userStatus } = use(AuthContext)

    if (loading || roleLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (!user || userStatus !== 'active') {
        return <Navigate to={'/login'}></Navigate>
    }

    return children
};

export default PriviteRoute;