import React from 'react';
import { NavLink } from 'react-router';

const MissionSnippet = () => {
    return (
        <section className="bg-gray-50">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-red-600 mb-6">Our Mission</h2>
                <p className="text-gray-700 max-w-2xl mx-auto mb-6">
                    We aim to connect donors with those in need of blood through a seamless, user-friendly platform.
                    Every donation can save lives and strengthen community health.
                </p>
                <NavLink to="/about-us">
                    <button className="px-6 py-3 bg-red-600 text-white rounded-2xl shadow-lg hover:bg-red-700 transition">
                        Learn More
                    </button>
                </NavLink>
            </div>
        </section>
    );
};

export default MissionSnippet;