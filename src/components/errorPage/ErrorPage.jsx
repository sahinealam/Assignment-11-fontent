import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-5">

            {/* 404 Title */}
            <h1 className="text-6xl font-bold text-red-700 mb-5 drop-shadow-lg">
                404
            </h1>
            <h2 className="text-2xl font-semibold text-red-600 mb-8 text-center">
                Page Not Found
            </h2>

            {/* Image */}
            <div className="mb-10">
                <img
                    className="w-80 md:w-96 rounded-lg shadow-lg"
                    src="https://i.ibb.co/mKhmH86/404.jpg"
                    alt="404 - Not Found"
                />
            </div>

            {/* Description */}
            <p className="text-center text-red-600 mb-7 max-w-md">
                Oops! The page you are looking for doesn’t exist. Let's help save lives instead—go back to our main page and find donation opportunities!
            </p>

            {/* Button */}
            <Link
                to="/"
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;