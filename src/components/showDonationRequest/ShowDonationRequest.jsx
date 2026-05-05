import React from 'react';
import { Link } from 'react-router';

const ShowDonationRequest = ({ data }) => {
    const { bloodGroup, recipientName, address, donationDate, createdAt, _id } = data;
    return (
        <div>
            <div className="h-full min-w-[420px] transition-all duration-300 ease-out 
          hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.03] rounded-2xl shadow-md p-6 border border-gray-100 flex flex-col justify-between "
            >
                <div>
                    <h2 className="text-xl font-bold mb-3 border-b border-gray-100 pb-3">
                        Blood Needs For:{" "}
                        <span className="">{bloodGroup}</span>
                    </h2>

                    <div className="space-y-3 text-[15px]">
                        <p>
                            <span className="font-bold">Recipient:</span>{" "}
                            {recipientName}
                        </p>

                        <p className="leading-relaxed">
                            <span className="font-bold">Address:</span>{" "}
                            {address}
                        </p>

                        <div className="flex justify-between items-start pt-2">
                            <p>
                                <span className="font-bold">Date:</span>{" "}
                                {donationDate || "2025-12-13"}
                            </p>
                            <p className="max-w-[120px] text-right">
                                <span className="font-bold">Time:</span>{" "}
                                {createdAt || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50">
                    <Link
                        to={`/donation-details/${_id}`}
                        className="bg-[#ff2d55] hover:bg-[#e6264a] text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-all active:scale-95 w-full"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ShowDonationRequest;