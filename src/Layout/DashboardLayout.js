import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { getUserRole } from "../api/user";
import Spinner from "../Components/Spinner/Spinner";

const DashboardLayout = () => {
    const { user } = useAuth();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getUserRole(user?.email)
            .then(data => {
                setRole(data)
                setLoading(false);
            })
    }, [user?.email]);
    return (
        <div className="md:flex relative min-h-screen">
            {
                loading ? <Spinner></Spinner> :
                    <>
                        <Sidebar role={role}></Sidebar>

                        <div className="flex-1 md:ml-64">
                            <div className="p-4">
                                <Outlet></Outlet>
                            </div>
                        </div>
                    </>

            }
        </div>
    );
};

export default DashboardLayout;