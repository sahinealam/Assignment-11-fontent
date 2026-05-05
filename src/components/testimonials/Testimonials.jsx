import React from 'react';

const Testimonials = () => {
    return (
        <div>
            {/* Section Title */}
            <h2 className="text-4xl sm:text-5xl font-bold text-center text-red-600 mb-16 drop-shadow-md">
                Success Stories
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform transition hover:-translate-y-3 hover:shadow-2xl">
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-red-600">
                        <img
                            src="https://i.ibb.co.com/spP4WVdq/pic8.jpg"
                            alt="Save Lives"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-red-700">Rina Akter</h3>
                    <p className="text-gray-700">
                        I donated blood for the first time and felt great knowing my donation could save lives.
                        The process was fast and smooth!
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform transition hover:-translate-y-3 hover:shadow-2xl">
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-red-600">
                        <img
                            src="https://i.ibb.co.com/NgvxKnSV/pic10.jpg"
                            alt="receiver"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-red-700">Jamal Uddin</h3>
                    <p className="text-gray-700">
                        I received blood in a critical situation. Thanks to all the donors, I was able to recover quickly.
                        Forever grateful!
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform transition hover:-translate-y-3 hover:shadow-2xl">
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-red-600">
                        <img
                            src="https://i.ibb.co.com/8D1DYt0k/pic9.jpg"
                            alt="Volunteering"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-red-700">Sara Khan</h3>
                    <p className="text-gray-700">
                        Volunteering as a blood donor has been a rewarding experience. Seeing the impact motivates me to donate regularly.
                    </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform transition hover:-translate-y-3 hover:shadow-2xl">
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-red-600">
                        <img
                            src="https://i.ibb.co.com/SXjFmBqL/pic11.jpg"
                            alt="Community Impact"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-red-700">Tanvir Ahmed</h3>
                    <p className="text-gray-700">
                        The donation center staff were professional and friendly. I feel proud to be part of a life-saving community.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;