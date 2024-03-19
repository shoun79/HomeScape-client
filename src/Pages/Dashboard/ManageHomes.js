import { useEffect, useState } from "react"
import { getHomes } from "../../api/services"
import useAuth from "../../hooks/useAuth"
import HomeDataRow from "../../Components/HomeDataRow";
import Spinner from "../../Components/Spinner/Spinner";
import { Link } from "react-router-dom";
import PrimaryButton from "../../Components/Button/PrimaryButton";

const ManageHomes = () => {
    const { user } = useAuth();
    const [homes, setHomes] = useState([]);
    const [loading, setLoading] = useState(true)
    const fetchHomes = () => {
        getHomes(user?.email)
            .then(data => {
                setHomes(data)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchHomes()

    }, [user?.email])

    console.log(homes);
    return (
        <>

            {loading ? (
                <Spinner />
            ) :
                homes.length < 1 ? <>
                    <div className='h-screen text-gray-600 gap-5 flex flex-col justify-center items-center pb-16 text-xl lg:text-3xl'>
                        You haven't post any home yet.
                        <Link to='/dashboard/add-home'>
                            <PrimaryButton classes='px-6 py-2 text-medium font-semibold rounded-full'>
                                Add Home
                            </PrimaryButton>
                        </Link>
                    </div>
                </> :
                    <div className='container mx-auto px-4 sm:px-8'>
                        <div className='py-8'>
                            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                                <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                    <table className='min-w-full leading-normal'>
                                        <thead>
                                            <tr>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                >
                                                    Title
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                >
                                                    Location
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                >
                                                    Price
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                >
                                                    From
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                >
                                                    To
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                >
                                                    Delete
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                >
                                                    Update
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                homes.map(home => <HomeDataRow home={home} key={home._id}
                                                    fetchHomes={fetchHomes} ></HomeDataRow>)
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>


    )
}

export default ManageHomes