import React, { useState } from 'react'
import { format } from 'date-fns'
import AddServiceForm from '../../Components/Form/AddServiceForm'
import { getImageUrl } from '../../api/imageUpload'
import useAuth from '../../hooks/useAuth'
import { addHome } from '../../api/services';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AddHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [previewImg, setPreviewImg] = useState('');
  const [uploadButtonText, setUploadButtonText] = useState('Upload image');

  const [arrivalDate, setArrivalDate] = useState(new Date())
  const [departureDate, setDepartureDate] = useState(
    new Date(arrivalDate.getTime() + 24 * 60 * 60 * 1000)
  )
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = event => {
    event.preventDefault()
    const location = event.target.location.value;
    const title = event.target.title.value;
    const from = arrivalDate;
    const to = departureDate;
    const price = event.target.price.value;
    const total_guest = event.target.total_guest.value;
    const bedrooms = event.target.bedrooms.value;
    const bathrooms = event.target.bathrooms.value;
    const description = event.target.description.value;
    const image = event.target.image.files[0];
    setIsLoading(true)
    getImageUrl(image)
      .then(data => {
        const homeData = {
          location,
          title,
          from,
          to,
          price,
          total_guest,
          bedrooms,
          bathrooms,
          description,
          image: data,
          host: {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
          },
        }
        addHome(homeData).then(data => {
          if (data.insertedId) {
            setIsLoading(false)
            toast.success('Home Added');
            navigate('/dashboard/manage-homes')
          }

        })
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err)
      })
  }

  const handleImageChange = image => {
    setPreviewImg(window.URL.createObjectURL(image))
    setUploadButtonText(image.name)
  }
  return (
    <>
      <h1 className='text-3xl font-bold text-gray-800 py-8 text-center'>
        Add Home
      </h1>
      <AddServiceForm
        handleSubmit={handleSubmit}
        arrivalDate={arrivalDate}
        setArrivalDate={setArrivalDate}
        departureDate={departureDate}
        setDepartureDate={setDepartureDate}
        isLoading={isLoading}
        handleImageChange={handleImageChange}
        previewImg={previewImg}
        uploadButtonText={uploadButtonText}
      />
    </>
  )
}

export default AddHome
