import React from 'react';

const Statistics = () => {
    return (
        <div>
            <div className="bg-gradient-to-r from-[#C62828] to-[#D32F2F] text-white py-16 px-6 
            rounded-xl shadow-lg">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                    <div className="transform transition hover:scale-105">
                        <h3 className="text-3xl sm:text-5xl font-bold">100,000+</h3>
                        <p className="text-lg mt-2">Registered Donors</p>
                    </div>
                    <div className="transform transition hover:scale-105">
                        <h3 className="text-4xl sm:text-5xl font-bold">50,000+</h3>
                        <p className="text-lg mt-2">Lives Saved</p>
                    </div>
                    <div className="transform transition hover:scale-105">
                        <h3 className="text-4xl sm:text-5xl font-bold">Every 2 Seconds</h3>
                        <p className="text-lg mt-2">Someone Needs Blood</p>
                    </div>
                    <div className="transform transition hover:scale-105">
                        <h3 className="text-4xl sm:text-5xl font-bold">1 Hour</h3>
                        <p className="text-lg mt-2">To Donate & Make a Difference</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;