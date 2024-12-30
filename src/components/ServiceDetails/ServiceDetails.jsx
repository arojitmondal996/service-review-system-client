import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Rating from "react-rating";
import { authContext } from "../Authprovider/AuthProvider";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(authContext);

  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ text: "", rating: 0 });

  useEffect(() => {
    fetch(`http://localhost:3000/service/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data));

    fetch(`http://localhost:3000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in to leave a review.");
      return;
    }

    const review = {
      serviceId: id,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      ...newReview,
    };

    try {
      const response = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });

      if (response.ok) {
        setNewReview({ text: "", rating: 0 });
        const addedReview = await response.json();
        setReviews([...reviews, { ...review, _id: addedReview.insertedId }]);
      } else {
        alert("Failed to add review.");
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {service && (
        <div>
          <img src={service.serviceImage} alt={service.serviceTitle} className="w-full h-64 object-cover" />
          <h1 className="text-3xl font-bold mt-4">{service.serviceTitle}</h1>
          <p className="text-gray-700">{service.description}</p>
          <p className="text-lg font-semibold">Category: {service.category}</p>
          <p className="text-lg font-semibold">Price: ${service.price}</p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Reviews ({reviews.length})</h2>
        <ul className="space-y-4 mt-4">
          {reviews.map((review) => (
            <li key={review._id} className="p-4 border rounded-md">
              <div className="flex items-center">
                <img src={review.userPhoto} alt={review.userName} className="w-10 h-10 rounded-full mr-2" />
                <h3 className="font-bold">{review.userName}</h3>
              </div>
              <Rating readonly initialRating={review.rating} />
              <p>{review.text}</p>
              <p className="text-sm text-gray-500">{new Date(review.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>

      {user && (
        <form onSubmit={handleReviewSubmit} className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold">Add a Review</h2>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Write your review..."
            value={newReview.text}
            onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
            required
          ></textarea>
          <Rating
            initialRating={newReview.rating}
            onChange={(value) => setNewReview({ ...newReview, rating: value })}
          />
          <button type="submit" className="btn btn-primary w-full">Submit Review</button>
        </form>
      )}
    </div>
  );
};

export default ServiceDetails;
