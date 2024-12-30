import React from "react";

const partners = [
  {
    name: "Partner One",
    logo: "https://via.placeholder.com/150", // Replace with actual logo URL
    description: "Partner One provides excellent services for our platform.",
  },
  {
    name: "Partner Two",
    logo: "https://via.placeholder.com/150", // Replace with actual logo URL
    description: "Partner Two collaborates with us on groundbreaking projects.",
  },
  {
    name: "Partner Three",
    logo: "https://via.placeholder.com/150", // Replace with actual logo URL
    description: "Partner Three is a key player in the industry.",
  },
];

const Partners = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="w-32 h-32 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
              <p className="text-gray-600">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
