import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router';

const DonorDashBoard = () => {
    const axiosSecure = useAxiosSecure()
    const [myrequest, setMyrequest] = useState([])

    const fetchRequest = () => {
        axiosSecure.get("/recent-request")
            .then(res => {
                // console.log(res.data);
                setMyrequest(res.data)
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchRequest()
    }, [])

    return (
        // <div>
        //     <div className="max-w-7xl mx-auto p-6">
        //         <div className="card bg-base-100 shadow">
        //             <div className="card-body">
        //                 {/* Page Title */}
        //                 <h2 className="text-2xl font-semibold mb-4">
        //                     Recent Donation Requests
        //                 </h2>

        //                 <div className="overflow-x-auto">

        //                     <table className="table table-zebra">
        //                         <thead>
        //                             <tr>
        //                                 <th>#</th>
        //                                 <th>Recipient Name</th>
        //                                 <th>Location</th>
        //                                 <th>Date</th>
        //                                 <th>Time</th>
        //                                 <th>Blood Group</th>
        //                                 <th>Status</th>
        //                                 <th>Donor Info</th>
        //                                 <th>Actions</th>
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                             {myrequest.map((request, index) => (
        //                                 <tr key={request._id}>
        //                                     <td>{index + 1}</td>
        //                                     <td>{request.recipientName}</td>
        //                                     <td>{request.address}</td>
        //                                     <td>{request.donationDate}</td>
        //                                     <td>{request.donationTime}</td>
        //                                     <td>
        //                                         <span className="badge badge-error">
        //                                             {request.bloodGroup}
        //                                         </span>
        //                                     </td>
        //                                     <td>
        //                                         <span
        //                                             className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${request.donationStatus === "panding"
        //                                                 ? "bg-yellow-500"
        //                                                 : request.donationStatus === "inprogress"
        //                                                     ? "bg-blue-500"
        //                                                     : request.donationStatus === "canceled"
        //                                                         ? "bg-red-500"
        //                                                         : request.donationStatus === "done"
        //                                                             ? "bg-green-500"
        //                                                             : "bg-green-500"
        //                                                 }`}
        //                                         >
        //                                             {request.donationStatus}
        //                                         </span>
        //                                     </td>
        //                                     <td>
        //                                         {request.donationStatus === "inprogress" ? (
        //                                             request.requesterEmail
        //                                         ) : (
        //                                             "-"
        //                                         )}
        //                                     </td>
        //                                     <td className="space-x-1">
        //                                         <Link to={`/dashboard/view-request/${request._id}`}>
        //                                             <button className="btn btn-xs btn-outline">View</button>
        //                                         </Link>
        //                                     </td>
        //                                 </tr>
        //                             ))}
        //                         </tbody>
        //                     </table>

        //                 </div>

        //                 <div className="mt-6">
        //                     <Link to={"/dashboard/my-donation-requests"}>
        //                         <button className='btn bg-lime-500 hover:bg-lime-600'>View Your Donation Request</button>
        //                     </Link>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 overflow-x-hidden">

            <h2 className="text-2xl font-semibold mb-6">
                Recent Donation Requests
            </h2>

            {/*  DESKTOP TABLE  */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Recipient</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Blood</th>
                            <th>Status</th>
                            <th>Donor</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myrequest.map((request, index) => (
                            <tr key={request._id}>
                                <td>{index + 1}</td>
                                <td>{request.recipientName}</td>
                                <td>{request.address}</td>
                                <td>{request.donationDate}</td>
                                <td>{request.donationTime}</td>
                                <td>
                                    <span className="badge badge-error">
                                        {request.bloodGroup}
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs text-white ${request.donationStatus === "panding"
                                                ? "bg-yellow-500"
                                                : request.donationStatus === "inprogress"
                                                    ? "bg-blue-500"
                                                    : request.donationStatus === "canceled"
                                                        ? "bg-red-500"
                                                        : "bg-green-500"
                                            }`}
                                    >
                                        {request.donationStatus}
                                    </span>
                                </td>
                                <td>
                                    {request.donationStatus === "inprogress"
                                        ? request.requesterEmail
                                        : "-"}
                                </td>
                                <td>
                                    <Link to={`/dashboard/view-request/${request._id}`}>
                                        <button className="btn btn-xs btn-outline">View</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="md:hidden space-y-4">
                {myrequest.map((request) => (
                    <div
                        key={request._id}
                        className="bg-base-100 shadow rounded-lg p-4 border"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg">
                                {request.recipientName}
                            </h3>
                            <span className="badge badge-error">
                                {request.bloodGroup}
                            </span>
                        </div>

                        <p className="text-sm"><b>Location:</b> {request.address}</p>
                        <p className="text-sm"><b>Date:</b> {request.donationDate}</p>
                        <p className="text-sm"><b>Time:</b> {request.donationTime}</p>

                        <p className="text-sm mt-1">
                            <b>Status:</b>{" "}
                            <span
                                className={`px-2 py-1 rounded text-white text-xs ${request.donationStatus === "panding"
                                        ? "bg-yellow-500"
                                        : request.donationStatus === "inprogress"
                                            ? "bg-blue-500"
                                            : request.donationStatus === "canceled"
                                                ? "bg-red-500"
                                                : "bg-green-500"
                                    }`}
                            >
                                {request.donationStatus}
                            </span>
                        </p>

                        {request.donationStatus === "inprogress" && (
                            <p className="text-sm mt-1">
                                <b>Donor:</b> {request.requesterEmail}
                            </p>
                        )}

                        <Link to={`/dashboard/view-request/${request._id}`}>
                            <button className="btn btn-sm btn-outline w-full mt-3">
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <Link to="/dashboard/my-donation-requests">
                    <button className="btn bg-lime-500 hover:bg-lime-600">
                        View Your Donation Request
                    </button>
                </Link>
            </div>
        </div>

    );
};

export default DonorDashBoard;