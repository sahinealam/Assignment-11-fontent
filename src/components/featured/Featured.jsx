import React from 'react';
import { FaHandsHelping, FaHeartbeat, FaShieldAlt } from 'react-icons/fa';
import { FaBolt } from 'react-icons/fa6';

const Featured = () => {
    const featuresData = [
        {
            icon: <FaShieldAlt className="text-red-600 w-12 h-12 mx-auto mb-4" />,
            title: "Safe & Hygienic Donation",
            description:
                "All donations are conducted under strict hygiene protocols to ensure your safety.",
        },
        {
            icon: <FaBolt className="text-red-600 w-12 h-12 mx-auto mb-4" />,
            title: "Fast & Easy Registration",
            description:
                "Quick online signup lets you join our donor community in minutes.",
        },
        {
            icon: <FaHeartbeat className="text-red-600 w-12 h-12 mx-auto mb-4" />,
            title: "Free Health Checkup",
            description:
                "Every donor receives a complimentary health checkup before donation.",
        },
        {
            icon: <FaHandsHelping className="text-red-600 w-12 h-12 mx-auto mb-4" />,
            title: "24/7 Support",
            description:
                "Our team is always available to guide you throughout the donation process.",
        },
    ];

    return (
        <section className="">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-3xl sm:text-5xl font-bold text-center text-red-600 mb-16 drop-shadow-md">
                    Why Choose Our Blood Donation Program
                </h2>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {featuresData.map((feature, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl shadow-xl p-8 text-center transform transition hover:-translate-y-3 hover:shadow-2xl"
                        >
                            {/* Icon */}
                            {feature.icon}

                            {/* Title */}
                            <h3 className="text-2xl font-semibold mb-4 text-red-700">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-shadow-gray-700">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Featured;