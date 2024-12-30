import { useState, useEffect, useContext } from "react";
import { authContext } from "../components/Authprovider/AuthProvider";
import Services from "./Service";
import Service from "./Service";

const AddService = () => {
  const { user } = useContext(authContext);
  const [services, setServices] = useState([]);
  const [serviceData, setServiceData] = useState({
    serviceImage: "",
    serviceTitle: "",
    companyName: "",
    website: "",
    description: "",
    category: "",
    price: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newService = {
      ...serviceData,
      addedDate: new Date().toISOString(),
      userEmail: user?.email,
    };

    try {
      const response = await fetch("http://localhost:3000/service", {
        method: "POST",
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage("Service added successfully!");
        setServiceData({
          serviceImage: "",
          serviceTitle: "",
          companyName: "",
          website: "",
          description: "",
          category: "",
          price: "",
        });
        fetchServices();
        setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
      } else {
        const error = await response.json();
        alert(`Failed to add service: ${error.message}`);
      }
    } catch (error) {
      console.error("Error adding service:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:3000/services");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Add a New Service</h2>
      {successMessage && (
        <div className="alert alert-success mb-4">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        {/* Form Fields */}
        {/* Service Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Service Image (URL)</label>
          <input
            type="text"
            name="serviceImage"
            value={serviceData.serviceImage}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="input input-bordered w-full"
            required
          />
        </div>
        {/* Service Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Service Title</label>
          <input
            type="text"
            name="serviceTitle"
            value={serviceData.serviceTitle}
            onChange={handleChange}
            placeholder="Enter service title"
            className="input input-bordered w-full"
            required
          />
        </div>
        {/* Other Fields */}
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={serviceData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            className="input input-bordered w-full"
            required
          />
        </div>
        {/* Website */}
        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <input
            type="url"
            name="website"
            value={serviceData.website}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="input input-bordered w-full"
            required
          />
        </div>
        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={serviceData.description}
            onChange={handleChange}
            placeholder="Enter service description"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>
        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={serviceData.category}
            onChange={handleChange}
            placeholder="Enter category"
            className="input input-bordered w-full"
            required
          />
        </div>
        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={serviceData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="input input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn bg-green-700 text-white w-full">
          Add Service
        </button>
      </form>

      {/* <h2 className="text-2xl font-bold text-center mt-8 mb-4">Services List</h2>
      <ul className="space-y-2">
        {services.map((service) => (
          <Service key={service._id} service={service}></Service>
        ))}
      </ul> */}
    </div>
  );
};

export default AddService;
