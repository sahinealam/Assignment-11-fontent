import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loading from '../pages/Loading';

const PriviteRoute = ({ children }) => {

    const { user, loading } = use(AuthContext)
    const location = useLocation()
    // console.log(location);
    // console.log(user);


    if (loading) {
        return <Loading></Loading>
    }

    if (user && user?.email) {
        return children;
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>

};

export default PriviteRoute;