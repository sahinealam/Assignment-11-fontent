import React from 'react';
import { FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="mt-16">
            <div className="glass-card page-shell py-10 px-6 grid md:grid-cols-3 gap-6 text-sm">
                <div>
                    <p className="pill mb-3 inline-flex">LocalChefBazaar</p>
                    <p className="subhead">Fresh, home-cooked meals crafted by neighborhood chefs. Nourish locally, eat joyfully.</p>
                </div>
                <div className="space-y-2">
                    <p className="font-semibold">Contact</p>
                    <p className="subhead">hello@localchefbazaar.com</p>
                    <p className="subhead">+880 1300-000000</p>
                    <p className="subhead">Sat - Thu, 10am - 11pm</p>
                </div>
                <div className="space-y-2">
                    <p className="font-semibold">Follow</p>
                    <div className="flex gap-3 text-xl text-amber-200">
                        <FaInstagram />
                        <FaFacebook />
                        <FaPinterest />
                    </div>
                </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-4">© 2025 LocalChefBazaar. Crafted with flavor.</p>
        </footer>
    );
};

export default Footer;