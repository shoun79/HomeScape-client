import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import UpdateServiceForm from '../Form/UpdateServiceForm';
import { getImageUrl } from '../../api/imageUpload';
import { updateHome } from '../../api/services';
import toast from 'react-hot-toast';
const EditModal = ({ isOpen, home, fetchHomes, setIsEditModalOpen, id }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [previewImg, setPreviewImg] = useState('');
    const [uploadButtonText, setUploadButtonText] = useState('Upload image');

    const [arrivalDate, setArrivalDate] = useState(new Date(home?.from));
    const [departureDate, setDepartureDate] = useState(
        new Date(new Date(home.to))
    );

    const [homeData, setHomeData] = useState({
        ...home
    })

    const handleImageUpload = image => {
        setPreviewImg(window.URL.createObjectURL(image))
        setUploadButtonText(image?.name)
        setIsLoading(true)
        getImageUrl(image)
            .then(res => {
                console.log(res);
                setHomeData({ ...homeData, image: res });
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)

            })
    }

    const handleSubmit = event => {
        event.preventDefault();
        const updatedData = Object.assign({}, {
            ...homeData, from: arrivalDate,
            to: departureDate,
        });
        delete updatedData._id;
        setIsLoading(true)
        updateHome(id, updatedData)
            .then(data => {
                console.log(data);
                setIsLoading(false)
                toast.success('Home info updated')
                setIsEditModalOpen(false)
                fetchHomes()
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }


    return (
        <div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsEditModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Update Home Info
                                    </Dialog.Title>
                                    <div className="mt-2">

                                        <UpdateServiceForm
                                            handleSubmit={handleSubmit}
                                            arrivalDate={arrivalDate}
                                            setArrivalDate={setArrivalDate}
                                            departureDate={departureDate}
                                            setDepartureDate={setDepartureDate}
                                            homeData={homeData}
                                            setHomeData={setHomeData}
                                            isLoading={isLoading}
                                            handleImageUpload={handleImageUpload}
                                            previewImg={previewImg}
                                            uploadButtonText={uploadButtonText}
                                        ></UpdateServiceForm>
                                    </div>

                                    <div className="mt-4 flex justify-evenly">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => setIsEditModalOpen(false)}
                                        >
                                            Cancel
                                        </button>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default EditModal;