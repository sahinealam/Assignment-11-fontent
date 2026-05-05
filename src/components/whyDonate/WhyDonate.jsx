import React from 'react';

const WhyDonate = () => {
    return (
        <div className="container mx-auto">
            {/* Section Title */}
            <h2 className="text-3xl sm:text-5xl font-bold text-center text-red-600 mb-16 drop-shadow-md">
                Why Donate Blood?
            </h2>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Card 1 */}
                <div className="rounded-xl shadow-xl p-8 text-center transform transition hover:-translate-y-3 hover:shadow-2xl">
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-red-600">
                        <img
                            src="https://i.ibb.co.com/dwpWjYCF/pic6.jpg"
                            alt="Save Lives"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-red-700">One Donation Can Save Up to 3 Lives</h3>
                    <p className="">
                        Your single blood donation can help multiple patients in emergencies, surgeries, and treatments.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="rounded-xl shadow-xl p-8 text-center transform transition hover:-translate-y-3 hover:shadow-2xl">
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-red-600">
                        <img
                            src="https://i.ibb.co.com/BHq66Xfc/pic5.jpg"
                            alt="In Demand"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-red-700">Constant Need for All Blood Types</h3>
                    <p className="">
                        Hospitals need blood every day. Especially O- and AB types for universal donations.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="rounded-xl shadow-xl p-8 text-center transform transition hover:-translate-y-3 hover:shadow-2xl">
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-red-600">
                        <img
                            src="https://i.ibb.co.com/LXNprsWB/pic4.jpg"
                            alt="Quick Process"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-red-700">Quick & Painless Process</h3>
                    <p className="">
                        Donating takes about an hour, with minimal discomfort, and you get free health checks!
                    </p>
                </div>

                {/* Card 4 */}
                <div className="rounded-xl shadow-xl p-8 text-center transform transition hover:-translate-y-3 hover:shadow-2xl">
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-red-600">
                        <img
                            src="https://i.ibb.co.com/LdjPcxnj/pic7.jpg"
                            alt="Community Impact"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-red-700">Strengthen Community Health</h3>
                    <p className="">
                        Each donation helps maintain a stable blood supply, ensuring that everyone in the community can access life-saving care when needed.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WhyDonate;