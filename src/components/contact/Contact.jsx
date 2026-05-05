import React from 'react';

const Contact = () => {
    return (
        <section className="">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-3xl sm:text-5xl font-bold text-center text-red-600 mb-16 drop-shadow-md">
                    Contact Us
                </h2>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Form */}
                    <div className="p-8 rounded-xl shadow-xl transform transition hover:shadow-2xl">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-lg font-semibold mb-2 text-red-700">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-semibold mb-2 text-red-700">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                                    placeholder="example@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-semibold mb-2 text-red-700">Message</label>
                                <textarea
                                    rows="5"
                                    required
                                    className="w-full px-4 py-3 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition transform hover:-translate-y-1"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col justify-center p-8 rounded-xl shadow-xl transform transition hover:shadow-2xl">
                        <h3 className="text-2xl font-bold mb-4 text-red-700">Get in Touch</h3>
                        <p className="mb-6">
                            If you have any questions about donating blood, searching for donors, or need urgent assistance, we're here to help.
                        </p>
                        <ul className="space-y-4 text-lg">
                            <li><strong className="text-red-600">Emergency Hotline:</strong> 1-800-BLOOD-HELP (1-800-256-6343)</li>
                            <li><strong className="text-red-600">Email:</strong> support@lifedrop.org</li>
                            <li><strong className="text-red-600">Office Hours:</strong> Mon-Fri 9AM - 6PM</li>
                        </ul>
                        <p className="mt-8">
                            For urgent blood requests, please use the Search Donors feature or call the hotline immediately.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;