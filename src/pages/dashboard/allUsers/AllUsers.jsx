import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { RiMenuSearchLine } from 'react-icons/ri';
import LoadingSpinner from '../../../components/loadingSpinner/LoadingSpinner';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 10;

    const fetchUser = () => {
        axiosSecure.get(`/users?page=${currentPage - 1}&size=${itemPerPage}`)
            .then(res => {
                setUsers(res.data.user);
                setTotalUsers(res.data.totaluser);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    };

    useEffect(() => {

        fetchUser()
    }, [axiosSecure, currentPage, itemPerPage]);


    const numberofPages = Math.ceil(totalUsers / itemPerPage);

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



    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
            .then(res => {
                fetchUser();
            });
    };

    const handleRoleChange = (email, role) => {
        axiosSecure.patch(`/update/role?email=${email}&role=${role}`)
            .then(res => {
                fetchUser();
            })
            .catch(error => {
                console.log(error);
            });
    };

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    return (
        <div className="w-full max-w-7xl mx-auto p-3 sm:px-6 py-6 pt-16 md:pt-6 overflow-x-hidden min-h-screen">
            <h2 className="text-3xl font-semibold text-red-600 mb-6">All Users</h2>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block shadow rounded-lg overflow-x-auto border border-gray-100">
                <table className="min-w-full table-auto">
                    <thead className="bg-red-600">
                        <tr>
                            <th className="py-3 px-4 text-left text-white font-medium">User</th>
                            <th className="py-3 px-4 text-left text-white font-medium">Role</th>
                            <th className="py-3 px-4 text-left text-white font-medium">Status</th>
                            <th className="py-3 px-4 text-center text-white font-medium">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-white">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-10 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="hover:bg-gray-50 transition duration-200"
                                >
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-red-400 flex-shrink-0">
                                                <img src={user.mainPhoto} alt={user.name} className="h-full w-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-800">{user.name}</div>
                                                <div className="text-xs text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 capitalize font-medium text-gray-700">{user.role}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white
                                            ${user.status === "active" ? "bg-green-500" : "bg-red-500"}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <div className="dropdown dropdown-left lg:dropdown-end">
                                            <label tabIndex={0} className="cursor-pointer hover:text-red-600 transition-colors">
                                                <RiMenuSearchLine size={24} className="mx-auto" />
                                            </label>
                                            <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow-xl bg-base-100 rounded-box w-48 border border-gray-100">
                                                <li className="menu-title text-gray-400 text-xs">Manage Status</li>
                                                {user.status === "active" ? (
                                                    <li><button onClick={() => handleStatusChange(user.email, "blocked")} className="text-red-500 hover:bg-red-50">Block User</button></li>
                                                ) : (
                                                    <li><button onClick={() => handleStatusChange(user.email, "active")} className="text-green-500 hover:bg-green-50">Unblock User</button></li>
                                                )}
                                                <div className="divider my-0"></div>
                                                <li className="menu-title text-gray-400 text-xs">Update Role</li>
                                                {user.role !== "volunteer" && (
                                                    <li><button onClick={() => handleRoleChange(user.email, "volunteer")}>Make Volunteer</button></li>
                                                )}
                                                {user.role !== "admin" && (
                                                    <li><button onClick={() => handleRoleChange(user.email, "admin")}>Make Admin</button></li>
                                                )}
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="md:hidden space-y-4">
                {users.length === 0 ? (
                    <p className="text-center text-red-500 font-bold text-lg mt-6">No users found</p>
                ) : (
                    users.map(user => (
                        <div key={user._id} className="shadow rounded-lg p-4 border bg-white w-full overflow-hidden">
                            {/* User Info Section */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-red-400 flex-shrink-0">
                                        <img src={user.mainPhoto} alt={user.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-bold text-gray-800 truncate">{user.name}</div>
                                        <div className="text-xs text-gray-500 truncate">{user.email}</div>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold text-white uppercase
                            ${user.status === "active" ? "bg-green-500" : "bg-red-500"}`}>
                                    {user.status}
                                </span>
                            </div>

                            {/* Action Buttons Section */}
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                    <span className="text-gray-500">Current Role:</span>
                                    <span className="font-semibold capitalize text-gray-700">{user.role}</span>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-1">
                                    {user.status === "active" ? (
                                        <button onClick={() => handleStatusChange(user.email, "blocked")} className="btn btn-xs btn-outline btn-error flex-1 min-w-[70px]">Block</button>
                                    ) : (
                                        <button onClick={() => handleStatusChange(user.email, "active")} className="btn btn-xs btn-outline btn-success flex-1 min-w-[70px]">Unblock</button>
                                    )}

                                    {user.role !== "volunteer" && (
                                        <button onClick={() => handleRoleChange(user.email, "volunteer")} className="btn btn-xs btn-outline flex-1 min-w-[70px]">Volunteer</button>
                                    )}

                                    {user.role !== "admin" && (
                                        <button onClick={() => handleRoleChange(user.email, "admin")} className="btn btn-xs btn-outline flex-1 min-w-[70px]">Admin</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
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

export default AllUsers;