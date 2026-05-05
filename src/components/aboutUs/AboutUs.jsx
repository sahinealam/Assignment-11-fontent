import React from 'react';
import { FaHandsHelping, FaHeartbeat } from 'react-icons/fa';
import { FaRegLightbulb, FaUsers } from 'react-icons/fa6';

const AboutUs = () => {
    const aboutPoints = [
        {
            icon: <FaHandsHelping className="w-10 h-10 text-red-600 dark:text-red-500" />,
            title: "Connecting Donors & Patients",
            description:
                "Our platform bridges the gap between blood donors and patients in need, ensuring timely donations.",
        },
        {
            icon: <FaUsers className="w-10 h-10 text-red-600 dark:text-red-500" />,
            title: "User-Friendly Experience",
            description:
                "Seamless registration and navigation makes it easy for donors to participate and manage donations.",
        },
        {
            icon: <FaHeartbeat className="w-10 h-10 text-red-600 dark:text-red-500" />,
            title: "Efficient Donation Process",
            description:
                "The application streamlines blood donation requests, scheduling, and management for maximum impact.",
        },
        {
            icon: <FaRegLightbulb className="w-10 h-10 text-red-600 dark:text-red-500" />,
            title: "Role-Based Access Control",
            description:
                "Admins, managers, and users have defined roles to ensure smooth operation and security.",
        },
    ];

    return (
        <section className="min-h-screen flex items-center justify-center dark:bg-gray-950 px-4">
            <div className="w-full max-w-7xl">
                {/* Title */}
                <h2 className="text-3xl md:text-5xl font-bold text-center text-red-600 dark:text-red-500 mb-6">
                    About Us
                </h2>

                {/* Intro */}
                <p className="text-center text-lg max-w-3xl mx-auto mb-12">
                    The Blood Donation Application is a user-friendly platform that
                    facilitates blood donation activities by connecting donors with those
                    in need through a seamless and efficient process.
                </p>

                {/* Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {aboutPoints.map((point, idx) => (
                        <div
                            key={idx}
                            className="
                 dark:bg-gray-900
                border border-gray-200 dark:border-gray-800
                rounded-2xl
                p-6
                text-center
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl
              "
                        >
                            <div className="flex justify-center mb-4">
                                {point.icon}
                            </div>

                            <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-3">
                                {point.title}
                            </h3>

                            <p className="text-sm leading-relaxed">
                                {point.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutUs;