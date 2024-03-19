import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { getUserRole } from '../api/user';
import Spinner from '../Components/Spinner/Spinner';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
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

    if (user && user?.uid && role === 'admin') {
        return children;
    }

    return <Navigate to='/dashboard' />

};

export default AdminRoute;