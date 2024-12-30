import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MyService = () => {
    const [services, setServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [updatedService, setUpdatedService] = useState({
        serviceTitle: '',
        description: '',
        price: '',
    });

    useEffect(() => {
        fetch('http://localhost:3000/services')
            .then((res) => res.json())
            .then((data) => setServices(data));
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredServices = services.filter((service) =>
        service.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openUpdateModal = (service) => {
        setSelectedService(service);
        setUpdatedService({
            serviceTitle: service.serviceTitle,
            description: service.description,
            price: service.price,
        });
        
        document.getElementById('my_modal_5').showModal()
    };


    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedService(null);
    };

    const handleUpdate = () => {
        console.log(updatedService)
        fetch(`http://localhost:3000/updateService/${selectedService._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedService),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Service updated successfully.') {
                    setServices(
                        services.map((service) =>
                            service._id === selectedService._id ? { ...service, ...updatedService } : service
                        )
                    );
                }
                closeUpdateModal();
            });
    };

    const openDeleteModal = (service) => {
        setSelectedService(service);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedService(null);
    };

    const handleDelete = (_id) => {
        fetch(`http://localhost:3000/service/${_id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Service deleted successfully.') {
                    setServices(services.filter((service) => service._id !== _id));
                }
                closeDeleteModal();
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Services</h1>
            <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={handleSearch}
                className="mb-4 p-2 border rounded w-full"
            />
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Image</th>
                            <th className="border border-gray-300 px-4 py-2">Company Name</th>
                            <th className="border border-gray-300 px-4 py-2">Service Title</th>
                            <th className="border border-gray-300 px-4 py-2">Description</th>
                            <th className="border border-gray-300 px-4 py-2">Price</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredServices.map((service) => (
                            <tr key={service._id}>
                                <td className="border border-gray-300 px-4 py-2">
                                    <img src={service.serviceImage} alt={service.serviceTitle} className="h-12 w-12 object-cover" />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{service.companyName}</td>
                                <td className="border border-gray-300 px-4 py-2">{service.serviceTitle}</td>
                                <td className="border border-gray-300 px-4 py-2">{service.description}</td>
                                <td className="border border-gray-300 px-4 py-2">${service.price}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="btn btn-info mr-2"
                                        onClick={() => openUpdateModal(service)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(service._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>

                        ))}
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Hello!</h3>
                                <p className="py-4">Press ESC key or click the button below to close</p>
                                <div className="modal-action">
                                    <div >
                                        <h2>Update Service</h2>
                                        <input
                                            type="text"
                                            value={updatedService.serviceTitle}
                                            onChange={(e) => setUpdatedService({ ...updatedService, serviceTitle: e.target.value })}
                                            placeholder="Service Title"
                                        />
                                        <input
                                            type="number"
                                            value={updatedService.price}
                                            onChange={(e) => setUpdatedService({ ...updatedService, price: e.target.value })}
                                            placeholder="Service Title"
                                        />
                                        <textarea
                                            value={updatedService.description}
                                            onChange={(e) => setUpdatedService({ ...updatedService, description: e.target.value })}
                                            placeholder="Description"
                                        />
                                        <button onClick={handleUpdate}>Update</button>
                                        {/* <button onClick={closeUpdateModal}>Cancel</button> */}
                                    </div>
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            {isUpdateModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Update Service</h2>
                        <input
                            type="text"
                            value={updatedService.serviceTitle}
                            onChange={(e) =>
                                setUpdatedService({ ...updatedService, serviceTitle: e.target.value })
                            }
                            placeholder="Service Title"
                        />
                        <textarea
                            value={updatedService.description}
                            onChange={(e) =>
                                setUpdatedService({ ...updatedService, description: e.target.value })
                            }
                            placeholder="Description"
                        />
                        <input
                            type="text"
                            value={updatedService.price}
                            onChange={(e) =>
                                setUpdatedService({ ...updatedService, price: e.target.value })
                            }
                            placeholder="Price"
                        />
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={closeUpdateModal}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Are you sure you want to delete this service?</h2>
                        <button onClick={handleDelete}>Yes</button>
                        <button onClick={closeDeleteModal}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyService;

