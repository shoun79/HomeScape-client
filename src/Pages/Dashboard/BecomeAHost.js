import React, { useEffect, useState } from 'react'
// import { getImageUrl } from '../../api/imageUpload'
// import { getRole, hostRequest } from '../../api/user'
// import BecomeHostForm from '../../Components/Form/BecomeHostForm'
import BecomeHostForm from '../../Components/Form/BecomeHostForm';
import useAuth from '../../hooks/useAuth'
import { getImageUrl } from '../../api/imageUpload';
import { getUserRole, hostRequest } from '../../api/user';

const BecomeAHost = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserRole(user?.email)
      .then(data => {
        setRole(data)
        setLoading(false)
      })
  }, [user?.email]);




  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;
    const location = form.location.value;
    const image = form.image.files[0];

    const imageURL = await getImageUrl(image);
    if (imageURL) {
      const hostData = {
        location,
        documentImg: imageURL,
        role: 'requested',
        email: user?.email,
      }




      hostRequest(hostData)
        .then(data => {
          setRole('requested')
        }).catch(err => console.log(err))
    }



  }

  return (
    <>

      {role ? (
        <div className='h-screen text-gray-600 flex flex-col justify-center items-center pb-16 text-xl lg:text-3xl'>
          Request Sent, wait for admin approval
        </div>
      ) : (
        <>
          {
            !loading && <BecomeHostForm handleSubmit={handleSubmit} />
          }
        </>



      )}
    </>
  )
}

export default BecomeAHost
