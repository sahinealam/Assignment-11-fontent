import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { NavLink } from 'react-router';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Banner = () => {
    return (
        <div>
            <div className="carousel w-full rounded-xl overflow-hidden relative">

                <Carousel
                    autoPlay
                    interval={3000}
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={true}
                >

                    {/* SLIDE 1 */}
                    <div id="slide1" className="carousel-item relative w-full">
                        <img
                            src="https://i.ibb.co.com/gL1LHb09/pic3.jpg"
                            className="w-full h-[500px] sm:h-[600px] md:h-[650px] object-cover"
                            alt="Donate Blood"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 sm:px-6">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
                                Donate Blood, Save Lives
                            </h1>
                            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 drop-shadow-md">
                                Your blood is precious: Donate, save a life, make a difference.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <NavLink to="/signUp">
                                    <button className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold shadow-lg hover:bg-red-700 transition transform hover:-translate-y-1">
                                        Join as a Donor
                                    </button>
                                </NavLink>
                                <NavLink to="/search">
                                    <button className="px-6 py-3 rounded-xl bg-white text-red-600 font-semibold shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1">
                                        Search Donors
                                    </button>
                                </NavLink>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="absolute left-5 right-5 top-1/2 flex justify-between -translate-y-1/2">
                            <a href="#slide3" className="btn btn-circle bg-white/70 text-red-600 hover:bg-white">❮</a>
                            <a href="#slide2" className="btn btn-circle bg-white/70 text-red-600 hover:bg-white">❯</a>
                        </div>
                    </div>

                    {/* SLIDE 2 */}
                    <div id="slide2" className="carousel-item relative w-full">
                        <img
                            src="https://i.ibb.co.com/TMJwKmtk/pic2.jpg"
                            className="w-full h-[500px] sm:h-[600px] md:h-[650px] object-cover"
                            alt="Save Lives"
                        />

                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 sm:px-6">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
                                Be a Hero Today
                            </h1>
                            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 drop-shadow-md">
                                Every donation can save up to three lives. Join our community of donors.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <NavLink to="/signUp">
                                    <button className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold shadow-lg hover:bg-red-700 transition transform hover:-translate-y-1">
                                        Join as a Donor
                                    </button>
                                </NavLink>
                                <NavLink to="/search">
                                    <button className="px-6 py-3 rounded-xl bg-white text-red-600 font-semibold shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1">
                                        Search Donors
                                    </button>
                                </NavLink>
                            </div>
                        </div>

                        <div className="absolute left-5 right-5 top-1/2 flex justify-between -translate-y-1/2">
                            <a href="#slide1" className="btn btn-circle bg-white/70 text-red-600 hover:bg-white">❮</a>
                            <a href="#slide3" className="btn btn-circle bg-white/70 text-red-600 hover:bg-white">❯</a>
                        </div>
                    </div>

                    {/* SLIDE 3 */}
                    <div id="slide3" className="carousel-item relative w-full">
                        <img
                            src="https://i.ibb.co.com/9ks4zdKK/pic1.jpg"
                            className="w-full h-[500px] sm:h-[600px] md:h-[650px] object-cover"
                            alt="Blood Donation"
                        />

                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 sm:px-6">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
                                Save a Life Today
                            </h1>
                            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 drop-shadow-md">
                                Your blood can make a difference. Join the movement and become a donor.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <NavLink to="/signUp">
                                    <button className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold shadow-lg hover:bg-red-700 transition transform hover:-translate-y-1">
                                        Join as a Donor
                                    </button>
                                </NavLink>
                                <NavLink to="/search">
                                    <button className="px-6 py-3 rounded-xl bg-white text-red-600 font-semibold shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1">
                                        Search Donors
                                    </button>
                                </NavLink>
                            </div>
                        </div>

                        <div className="absolute left-5 right-5 top-1/2 flex justify-between -translate-y-1/2">
                            <a href="#slide2" className="btn btn-circle bg-white/70 text-red-600 hover:bg-white">❮</a>
                            <a href="#slide1" className="btn btn-circle bg-white/70 text-red-600 hover:bg-white">❯</a>
                        </div>
                    </div>

                </Carousel>



            </div>
        </div>
    );
};

export default Banner;