import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

import { Link, NavLink } from 'react-router';
import { FaDroplet } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { FaHeartbeat } from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const Navbar = () => {
    const { user, logOut } = use(AuthContext)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")
    const [isOpen, setIsOpen] = useState(false);

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

    const navClass = ({ isActive }) =>
        `block px-3 py-2 rounded-md font-medium transition ${isActive
            ? "text-red-600 underline font-semibold"
            : "text-gray-700 hover:text-red-600"
        }`;


    return (
        <div>
            {/* Top Navbar */}
            <div className="w-11/12 mx-auto flex flex-col gap-3 md:flex-row justify-between items-center">
                {/* Logo */}
                <Link to='/' className="flex items-center gap-2">
                    <FaHeartbeat className="text-3xl text-red-600" />
                    <h2 className="text-2xl font-bold tracking-wide">Drop Life</h2>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-5 items-center">
                    <NavLink to="/" className={navClass}>Home</NavLink>
                    <NavLink to="/donation-request" className={navClass}>Donation Request</NavLink>
                    <NavLink to="/about-us" className={navClass}>About Us</NavLink>
                    {user && (
                        <>
                            <NavLink to="/search" className={navClass}>Search</NavLink>
                            <NavLink to="/donation" className={navClass}>Donation</NavLink>
                        </>
                    )}
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <div className="hidden md:flex items-center gap-2">
                        <MdLightMode className='text-yellow-500' />
                        <input
                            type="checkbox"
                            checked={theme === "dark"}
                            onChange={(e) => handleTheme(e.target.checked)}
                            className="toggle"
                        />
                        <MdDarkMode className='text-gray-500' />
                    </div>

                    {/* User / Auth Buttons */}
                    {user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/dashboard"
                                className="px-6 py-3 rounded-2xl bg-red-600 text-white 
                                font-semibold shadow-lg hover:bg-red-700 transition transform 
                                hover:-translate-y-1"
                            >Dashboard</Link>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL || "https://img.icons8.com/?size=64&id=115318&format=png"} alt="User Avatar" />
                                    </div>
                                </div>
                                <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><span>{user.displayName || user.email}</span></li>
                                    <li><button onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="hidden md:flex gap-2">
                            <Link to="/login"
                                className="px-6 py-3 rounded-2xl bg-red-600 text-white 
                                font-semibold shadow-lg hover:bg-red-700 transition transform 
                                hover:-translate-y-1"
                            >Login</Link>
                            <Link to="/signup"
                                className="px-6 py-3 rounded-2xl bg-red-600 text-white 
                                font-semibold shadow-lg hover:bg-red-700 transition transform 
                                hover:-translate-y-1"
                            >Sign Up</Link>
                        </div>
                    )}

                    {/* Mobile Hamburger */}
                    <div className="md:hidden">
                        <button
                            className="text-2xl btn btn-ghost"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-base-100 shadow-lg p-4 space-y-3">
                    <NavLink to="/" onClick={() => setIsOpen(false)} className={navClass}>Home</NavLink>
                    <NavLink to="/donation-request" onClick={() => setIsOpen(false)} className={navClass}>Donation Request</NavLink>
                    <NavLink to="/about-us" onClick={() => setIsOpen(false)} className={navClass}>About Us</NavLink>
                    {user && (
                        <>
                            <NavLink to="/search" onClick={() => setIsOpen(false)} className={navClass}>Search</NavLink>
                            <NavLink to="/donation" onClick={() => setIsOpen(false)} className={navClass}>Donation</NavLink>
                        </>
                    )}

                    {/* Mobile Theme */}
                    <div className="flex items-center gap-2 mt-3">
                        <MdLightMode className='text-yellow-500' />
                        <input
                            type="checkbox"
                            checked={theme === "dark"}
                            onChange={(e) => handleTheme(e.target.checked)}
                            className="toggle"
                        />
                        <MdDarkMode className='text-gray-500' />
                    </div>

                    {/* Mobile Auth Buttons */}
                    {user ? (
                        <button onClick={handleLogout} className="btn btn-error w-full mt-3">Logout</button>
                    ) : (
                        <div className="flex flex-col gap-2 mt-3">
                            <Link to="/login" className="btn btn-primary w-full">Login</Link>
                            <Link to="/signup" className="btn btn-outline w-full">Sign Up</Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;