import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from 'react-icons/ri';

const MyRequest = () => {
    const axiosSecure = useAxiosSecure();

    const [requests, setRequests] = useState([]);
    const [totalRequest, setTotalRequest] = useState(0);
    const [status, setStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const requestPerPage = 10;

    // fetch data
    const fetchRequest = () => {
        axiosSecure
            .get(`/my-request?page=${currentPage - 1}&size=${requestPerPage}&status=${status}`)
            .then(res => {
                setRequests(res.data.request);
                setTotalRequest(res.data.totalRequest);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchRequest();
    }, [axiosSecure, currentPage, status]);

    const numberOfPages = Math.ceil(totalRequest / requestPerPage);
    const pages = [...Array(numberOfPages).keys()].map(i => i + 1);

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // delete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-request?id=${id}`)
                    .then(() => {
                        Swal.fire("Deleted!", "Your request has been deleted.", "success");
                        fetchRequest();
                    });
            }
        });
    };

    const handleCancel = (id, status) => {
        axiosSecure.patch(`/cancel-request?id=${id}&status=${status}`)
            .then(() => {
                fetchRequest();
                toast.success("Request canceled successfully");
            });
    };

    const handleDone = (id, status) => {
        axiosSecure.patch(`/done-request?id=${id}&status=${status}`)
            .then(() => {
                fetchRequest();
                toast.success("Request marked as done");
            });
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 overflow-x-hidden">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h2 className="text-3xl text-red-600 font-semibold">My Donation Requests</h2>

                <select
                    className="select select-bordered w-full sm:w-52"
                    value={status}
                    onChange={e => {
                        setStatus(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto rounded-lg shadow">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Recipient</th>
                            <th>Hospital</th>
                            <th>Blood</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-10">
                                    No donation requests found
                                </td>
                            </tr>
                        ) : (
                            requests.map((request, index) => (
                                <tr key={request._id}>
                                    <td>{(currentPage - 1) * requestPerPage + index + 1}</td>
                                    <td>{request.recipientName}</td>
                                    <td>{request.hospital}</td>
                                    <td>{request.bloodGroup}</td>
                                    <td>{request.donationDate}</td>
                                    <td>{request.donationTime}</td>
                                    <td>
                                        <span className={`badge capitalize
                      ${request.donationStatus === 'pending' && 'badge-warning'}
                      ${request.donationStatus === 'inprogress' && 'badge-info'}
                      ${request.donationStatus === 'done' && 'badge-success'}
                      ${request.donationStatus === 'canceled' && 'badge-error'}
                    `}>
                                            {request.donationStatus}
                                        </span>
                                    </td>
                                    <td className="space-x-1">
                                        {request.donationStatus === "inprogress" && (
                                            <>
                                                <button onClick={() => handleDone(request._id)} className="btn btn-xs">Done</button>
                                                <button onClick={() => handleCancel(request._id)} className="btn btn-xs btn-error">Cancel</button>
                                            </>
                                        )}
                                        <Link to={`/dashboard/view-request/${request._id}`}>
                                            <button className="btn btn-xs btn-outline">View</button>
                                        </Link>
                                        {request.donationStatus === "pending" && (
                                            <button onClick={() => handleDelete(request._id)} className="btn btn-xs btn-outline">
                                                <RiDeleteBin6Line />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="md:hidden space-y-4">
                {requests.map((request) => (
                    <div key={request._id} className="rounded-lg shadow p-4 border">
                        <div className="flex justify-between mb-2">
                            <h3 className="font-semibold">{request.recipientName}</h3>
                            <span className="badge badge-error">{request.bloodGroup}</span>
                        </div>

                        <p className="text-sm"><b>Hospital:</b> {request.hospital}</p>
                        <p className="text-sm"><b>Date:</b> {request.donationDate}</p>
                        <p className="text-sm"><b>Time:</b> {request.donationTime}</p>

                        <p className="text-sm mt-1">
                            <b>Status:</b>{" "}
                            <span className="badge capitalize">{request.donationStatus}</span>
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">
                            {request.donationStatus === "inprogress" && (
                                <>
                                    <button onClick={() => handleDone(request._id)} className="btn btn-sm flex-1">Done</button>
                                    <button onClick={() => handleCancel(request._id)} className="btn btn-sm btn-error flex-1">Cancel</button>
                                </>
                            )}

                            <Link to={`/dashboard/view-request/${request._id}`} className="w-full">
                                <button className="btn btn-sm btn-outline w-full">View</button>
                            </Link>

                            {request.donationStatus === "pending" && (
                                <button onClick={() => handleDelete(request._id)} className="btn btn-sm btn-outline w-full">
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* PAGINATION */}
            {numberOfPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    <button
                        className="btn btn-sm"
                        disabled={currentPage === 1}
                        onClick={handlePrev}
                    >
                        Prev
                    </button>

                    {pages.map(page => (
                        <button
                            key={page}
                            className={`btn btn-sm ${page === currentPage
                                ? 'bg-[#435585]'
                                : ''
                                }`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        className="btn btn-sm"
                        disabled={currentPage === numberOfPages}
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyRequest;