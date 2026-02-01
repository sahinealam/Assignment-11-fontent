import React from 'react';

const Header = () => {
    return (
        <header className="flex justify-center flex-col items-center gap-3 
        bg-linear-to-r from-green-600 via-green-800 to-green-600 text-white">
            <div className="text-center py-16 md:py-24 px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-3">
                    Green Nest
                </h2>
                <h2 className="text-2xl text-lime-100 font-semibold mb-3">
                    Your Eco-Friendly Haven
                </h2>
                <p className="text-lg md:text-xl text-lime-100">
                    Building a sustainable tomorrow, one green step at a time
                </p>
            </div>
        </header>
    );
};

export default Header;