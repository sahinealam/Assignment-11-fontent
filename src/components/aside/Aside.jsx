import React, { use, useEffect, useState } from 'react';
import { FiHome, FiLogOut, FiSettings, FiUsers } from 'react-icons/fi';
import { NavLink } from 'react-router';
import { AuthContext } from '../../provider/AuthProvider';
import { toast } from 'react-toastify';
import { AiFillDashboard, AiFillHome, AiOutlineClose, AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai';
import { MdDarkMode, MdLightMode, MdOutlinePublishedWithChanges } from 'react-icons/md';
import { BiDonateBlood } from 'react-icons/bi';



const Aside = () => {
    const { role, logOut } = use(AuthContext)
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")



    useEffect(() => {
        const html = document.querySelector('html')
        html.setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light")
    }


    const handleLogout = () => {
        // console.log('user try to logout');
        logOut()
            .then(() => {
                toast.success('Logged out successfully')
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <div className="flex min-h-screen bg-gray-100">

            <button
                onClick={() => setOpen(!open)}
                className="lg:hidden p-4 text-2xl fixed top-4 left-4 z-50 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition"
            >
                {open ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>

            {/* ASIDE AREA */}
            <aside
                className={`fixed lg:static top-0 z-30 left-0 h-full w-64 bg-red-600 text-white p-6 flex flex-col justify-between transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div>
                    {/* LOGO / TITLE */}
                    <h2 className="text-3xl font-bold mb-8 text-white drop-shadow-md">
                        Drop Life Dashboard
                    </h2>

                    {/* NAVIGATION */}
                    <nav className="flex-1 flex flex-col gap-3">

                        <NavLink
                            to="/"
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-700 ${isActive ? "bg-indigo-600" : ""
                                }`
                            }
                        >
                            <AiFillHome size={20} />
                            <span>Home</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard"
                            end
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                                    ? "bg-white text-red-600 font-semibold shadow-md"
                                    : "hover:bg-red-500 hover:bg-opacity-80"
                                }`
                            }
                        >
                            <AiFillDashboard className="h-5 w-5" /> Dashboard
                        </NavLink>

                        {role === "donor" && (
                            <NavLink
                                to="/dashboard/add-request"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                                        ? "bg-white text-red-600 font-semibold shadow-md"
                                        : "hover:bg-red-500 hover:bg-opacity-80"
                                    }`
                                }
                            >
                                <MdOutlinePublishedWithChanges className="h-5 w-5" /> Add Request
                            </NavLink>
                        )}

                        {role === "admin" && (
                            <NavLink
                                to="/dashboard/all-users"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                                        ? "bg-white text-red-600 font-semibold shadow-md"
                                        : "hover:bg-red-500 hover:bg-opacity-80"
                                    }`
                                }
                            >
                                <FiUsers className="h-5 w-5" /> All Users
                            </NavLink>
                        )}

                        {role === 'donor' && (
                            <NavLink
                                to="/dashboard/my-donation-requests"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                                        ? "bg-white text-red-600 font-semibold shadow-md"
                                        : "hover:bg-red-500 hover:bg-opacity-80"
                                    }`
                                }
                            >
                                <BiDonateBlood className="h-5 w-5" /> My Request
                            </NavLink>
                        )}

                        {role === "admin" && (
                            <NavLink
                                to="/dashboard/all-requests"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                                        ? "bg-white text-red-600 font-semibold shadow-md"
                                        : "hover:bg-red-500 hover:bg-opacity-80"
                                    }`
                                }
                            >
                                <BiDonateBlood className="h-5 w-5" /> All Requests
                            </NavLink>
                        )}

                        {role === "volunteer" && (
                            <NavLink
                                to="/dashboard/all-requests"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                                        ? "bg-white text-red-600 font-semibold shadow-md"
                                        : "hover:bg-red-500 hover:bg-opacity-80"
                                    }`
                                }
                            >
                                <BiDonateBlood className="h-5 w-5" /> All Requests
                            </NavLink>
                        )}
                        <NavLink
                            to="/dashboard/myprofile"
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                                    ? "bg-white text-red-600 font-semibold shadow-md"
                                    : "hover:bg-red-500 hover:bg-opacity-80"
                                }`
                            }
                        >
                            <BiDonateBlood className="h-5 w-5" /> My Profile
                        </NavLink>
                        {/* Theme Toggle */}
                        <div className="flex items-center gap-2">
                            <MdLightMode className='text-yellow-500' />
                            <input
                                type="checkbox"
                                checked={theme === "dark"}
                                onChange={(e) => handleTheme(e.target.checked)}
                                className="toggle"
                            />
                            <MdDarkMode className='text-gray-500' />
                        </div>
                    </nav>
                </div>

                {/* LOGOUT BUTTON */}
                <div className="p-4 border-t border-red-400">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 bg-white hover:bg-red-50 transition shadow-sm"
                    >
                        <FiLogOut className="h-5 w-5" /> Logout
                    </button>
                </div>
            </aside>
        </div>

    );
};

export default Aside;