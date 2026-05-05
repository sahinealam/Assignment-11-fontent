import React from 'react';
import { FaHeartbeat } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="bg-[#1c1c1c] text-white pt-12 pb-6 mt-16">
            <div className="container mx-auto px-4 grid md:grid-cols-3 gap-10">

                {/* Logo & About */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <FaHeartbeat className="text-3xl text-red-600" />
                        <h2 className="text-2xl font-bold tracking-wide">Drop Life</h2>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                        Drop Life connects blood donors and recipients, helping save lives
                        by providing timely access to blood and promoting a healthy donor community.
                    </p>
                </div>

                {/* Useful Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li>
                            <a href="/" className="hover:text-red-600 transition">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/signUp" className="hover:text-red-600 transition">
                                Join as Donor
                            </a>
                        </li>
                        <li>
                            <a href="/search-request" className="hover:text-red-600 transition">
                                Search Donors
                            </a>
                        </li>
                        <li>
                            <a href="/about-us" className="hover:text-red-600 transition">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/terms" className="hover:text-red-600 transition">
                                Terms & Conditions
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Social Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                    <div className="flex justify-center gap-4 mb-2">
                        <span>
                            <FaInstagram className="bg-gradient-to-r from-[#f64c4c] via-[#e60000] to-[#ff4d4d] text-white h-[50px] w-[50px] p-3 rounded-full shadow-lg" />
                        </span>
                        <span>
                            <FaFacebook className="text-[#1877F2] h-[50px] w-[50px] p-3 rounded-full bg-white shadow-lg" />
                        </span>
                        <span>
                            <FaPinterest className="text-[#E60023] h-[50px] w-[50px] p-3 rounded-full bg-white shadow-lg" />
                        </span>
                    </div>
                </div>

            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-6"></div>

            {/* Copyright */}
            <p className="text-center text-gray-400 text-sm">
                © 2025 Drop Life — All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;