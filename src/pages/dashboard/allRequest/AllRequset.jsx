import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../components/loadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const AllRequset = () => {
    const axiosSecure = useAxiosSecure();
    const [allrequest, setAllrequest] = useState([]);
    const [totalRequest, setTotalRequest] = useState(0);
    const [itemPerPage, setItePerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [loading, setLoading] = useState(true);

    const handleStatusChange = (e) => {
        e.preventDefault()
        const value = e.target.value;
        setSelectedStatus(value);


    }

    // console.log(selectedStatus);

    const fetchRequest = () => {
        axiosSecure
            .get(`/All-request?page=${currentPage - 1}&size=${itemPerPage}&status=${selectedStatus}`)
            .then((res) => {
                // console.log(res.data);
                setAllrequest(res.data.request);
                setTotalRequest(res.data.totalRequest);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    useEffect(() => {

        fetchRequest()
    }, [axiosSecure, currentPage, itemPerPage, selectedStatus]);

    const numberofPages = Math.ceil(totalRequest / itemPerPage);

    const pages = [...Array(numberofPages).keys()].map((e) => e + 1);

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNext = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    };


    const handleDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/Delete-request?id=${id}`)
                    .then(res => {
                        console.log(res.data);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your Request has been deleted.",
                            icon: "success",
                        });
                        fetchRequest()
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });
    };

    // cenceled
    const hendleCencel = (id, status) => {
        axiosSecure
            .patch(`/cancel-request?id=${id}&status=${status}`)
            .then((res) => {
                console.log(res.data);
                fetchRequest();
                toast.success("your request cencel successfull");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Done
    const hendleDone = (id, status) => {
        axiosSecure
            .patch(`/done-request?id=${id}&status=${status}`)
            .then((res) => {
                fetchRequest();
                toast.success("Your request done");
                console.log(res.data);
            })
            .catch((error) => {
                toast.error("your request not done");
                console.log(error);
            });
    };


    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="w-full max-w-7xl mx-auto p-3 sm:px-6 py-6 pt-16 md:pt-6 overflow-x-hidden min-h-screen">

            <h2 className="text-3xl font-semibold text-red-600 mb-4">All Donation Requests</h2>

            {/* Filter */}
            <div className="mb-4">
                <select
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block shadow rounded-lg overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-red-600">
                        <tr>
                            <th className="py-3 px-3 text-left">#</th>
                            <th className="py-3 px-3 text-left">Recipient</th>
                            <th className="py-3 px-3 text-left">Location</th>
                            <th className="py-3 px-3 text-left">Date</th>
                            <th className="py-3 px-3 text-left">Time</th>
                            <th className="py-3 px-3 text-left">Blood</th>
                            <th className="py-3 px-3 text-left">Status</th>
                            <th className="py-3 px-3 text-left">Donor Info</th>
                            <th className="py-3 px-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {allrequest.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="text-center py-10 text-gray-500">No requests found</td>
                            </tr>
                        ) : (
                            allrequest.map((request, index) => (
                                <tr
                                    key={request._id}
                                    className="hover:bg-gray-100 hover:text-gray-900 transition duration-200"
                                >
                                    <td className="py-2 px-3">{(currentPage - 1) * itemPerPage + index + 1}</td>
                                    <td className="py-2 px-3">{request.recipientName}</td>
                                    <td className="py-2 px-3">{request.hospital}</td>
                                    <td className="py-2 px-3">{request.donationDate}</td>
                                    <td className="py-2 px-3">{request.donationTime}</td>
                                    <td className="py-2 px-3">
                                        <span className="badge badge-error">{request.bloodGroup}</span>
                                    </td>
                                    <td className="py-2 px-3">
                                        <span className={`px-2 py-1 rounded-full text-sm font-semibold text-white
                      ${request.donationStatus === "pending" ? "bg-yellow-500" :
                                                request.donationStatus === "inprogress" ? "bg-blue-500" :
                                                    request.donationStatus === "done" ? "bg-green-500" : "bg-red-500"
                                            }`}>
                                            {request.donationStatus}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3">{request.donationStatus === "inprogress" ? request.requesterEmail : "-"}</td>
                                    <td className="py-2 px-3 text-center space-x-1 flex justify-center flex-wrap gap-1">
                                        {request.donationStatus === "inprogress" && (
                                            <>
                                                <button onClick={() => hendleDone(request._id, "done")} className="btn btn-xs btn-outline">Done</button>
                                                <button onClick={() => hendleCencel(request._id, "canceled")} className="btn btn-xs btn-outline btn-error">Cancel</button>
                                            </>
                                        )}
                                        <Link to={`/dashboard/view-request/${request._id}`}>
                                            <button className="btn btn-xs btn-outline">View</button>
                                        </Link>
                                        {request.donationStatus === "pending" && (
                                            <button onClick={() => handleDelete(request._id)} className="btn btn-xs btn-outline btn-error">Delete</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="md:hidden space-y-4">
                {allrequest.length === 0 ? (
                    <p className="text-center text-red-500 font-bold text-lg mt-6">No requests found</p>
                ) : (
                    allrequest.map(request => (
                        <div key={request._id} className="shadow rounded-lg p-4 border w-full overflow-hidden bg-white">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <div className="font-semibold text-gray-800">{request.recipientName}</div>
                                    <div className="text-xs text-gray-500">{request.hospital}</div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white
                            ${request.donationStatus === "pending" ? "bg-yellow-500" :
                                        request.donationStatus === "inprogress" ? "bg-blue-500" :
                                            request.donationStatus === "done" ? "bg-green-500" : "bg-red-500"
                                    }`}>
                                    {request.donationStatus}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between text-xs border-b border-gray-50 pb-1">
                                    <span>Date: {request.donationDate}</span>
                                    <span>Time: {request.donationTime}</span>
                                </div>
                                <div className="flex justify-between text-xs pt-1">
                                    <span>Blood: <span className="font-bold text-red-600">{request.bloodGroup}</span></span>
                                    <span className="truncate max-w-[150px]">Donor: {request.donationStatus === "inprogress" ? request.requesterEmail : "-"}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {request.donationStatus === "inprogress" && (
                                        <>
                                            <button onClick={() => hendleDone(request._id, "done")} className="btn btn-xs flex-1 btn-success text-white">Done</button>
                                            <button onClick={() => hendleCencel(request._id, "canceled")} className="btn btn-xs flex-1 btn-error text-white">Cancel</button>
                                        </>
                                    )}
                                    <Link to={`/dashboard/view-request/${request._id}`} className="flex-1">
                                        <button className="btn btn-xs btn-neutral w-full">View</button>
                                    </Link>
                                    {request.donationStatus === "pending" && (
                                        <button onClick={() => handleDelete(request._id)} className="btn btn-xs flex-1 btn-error text-white">Delete</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {numberofPages > 1 && (
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                    <button onClick={handlePrev} disabled={currentPage === 1} className="btn btn-sm">Prev</button>
                    {pages.map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`btn btn-sm ${page === currentPage ? "bg-[#435585] text-white" : ""}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button onClick={handleNext} disabled={currentPage === numberofPages} className="btn btn-sm">Next</button>
                </div>
            )}

        </div>

    );
};

export default AllRequset;