import React from 'react';

const MeetExperts = () => {
    return (
        <section>
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Meet Our Green Experts</h2>

            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 text-center">
                <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                    <img src="https://i.ibb.co.com/cKTZMBcq/13.png" alt=""
                        className="w-32 h-32 mx-auto rounded-full object-cover mb-3" />
                    <h3 className="text-lg font-semibold">Evrahim Hasan</h3>
                    <p className="text-sm text-green-600">Indoor Plant Specialist</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                    <img src="https://i.ibb.co.com/1YnFGv4V/15.png" alt=""
                        className="w-32 h-32 mx-auto rounded-full object-cover mb-3" />
                    <h3 className="text-lg font-semibold">Aisha Rahman</h3>
                    <p className="text-sm text-green-600">Botanist</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                    <img src="https://i.ibb.co.com/kY55pVZ/16.png" alt=""
                        className="w-32 h-32 mx-auto rounded-full object-cover mb-3" />
                    <h3 className="text-lg font-semibold">Nadia Chowdhury</h3>
                    <p className="text-sm text-green-600">Garden Designer</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                    <img src="https://i.ibb.co.com/JWm1mW2j/14.png" alt=""
                        className="w-32 h-32 mx-auto rounded-full object-cover mb-3" />
                    <h3 className="text-lg font-semibold">Rafiul Islam</h3>
                    <p className="text-sm text-green-600">Plant Health Expert</p>
                </div>
            </div>

        </section>
    );
};

export default MeetExperts;