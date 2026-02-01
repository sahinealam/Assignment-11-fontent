import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div>
            <div className='flex justify-center mb-10'>
                <img className='' src="https://i.ibb.co.com/7NRS03Cj/404.jpg" alt="" />

            </div>
            <div className='flex justify-center mb-7'>
                <Link className='btn bg-linear-to-r from-green-600 to-green-800 text-white' to="/">Go Back Home</Link>
            </div>

        </div>
    );
};

export default Error;