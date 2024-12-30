import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ServiceCards = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        // Fetch services with a limit of 6
        fetch('http://localhost:3000/services')
            .then((res) => res.json())
            .then((data) => setServices(data))
            .catch((error) => console.error('Error fetching services:', error));
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Our Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div
                        key={service._id}
                        className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
                    >
                        <img
                            src={service.serviceImage}
                            alt={service.serviceTitle}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-lg font-semibold">{service.serviceTitle}</h3>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                        <p className="text-xl font-bold mt-2">${service.price}</p>
                        <Link
                            to={`/service/${service._id}`}
                            className="btn btn-warning mt-4"
                        >
                            See Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceCards;
