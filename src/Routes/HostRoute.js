import React, { useEffect, useState } from 'react';
import Spinner from '../Components/Spinner/Spinner';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../api/user';
import useAuth from '../hooks/useAuth';

const HostRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        getUserRole(user?.email)
            .then(data => {
                setRole(data)
                setRoleLoading(false)
            })
    }, [user?.email])

    if (loading || roleLoading) {
        return (
            <div className='h-screen'>
                <Spinner />
            </div>
        )
    }

    if (user && user?.uid && role === 'host') {
        return children;
    }

    return <Navigate to='/dashboard' />
};

export default HostRoute;