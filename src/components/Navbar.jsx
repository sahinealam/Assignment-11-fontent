import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { LuChefHat, LuLogOut, LuMenu } from 'react-icons/lu';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
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
        <header className="glass-card px-4 py-3 md:px-6 md:py-4">
            <div className="flex flex-wrap items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 text-amber-200">
                        <LuChefHat size={22} />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-amber-100">LocalChefBazaar</p>
                        <p className="font-bold text-lg">Fresh, Home-Cooked Daily</p>
                    </div>
                </div>

                <nav className="flex items-center gap-3 text-sm font-semibold">
                    <NavLink to="/" className={({ isActive }) => isActive ? "pill" : "btn-ghost"}>Home</NavLink>
                    <NavLink to="/meals" className={({ isActive }) => isActive ? "pill" : "btn-ghost"}>Meals</NavLink>
                    <NavLink to="/myprofile" className={({ isActive }) => isActive ? "pill" : "btn-ghost"}>Dashboard</NavLink>
                </nav>

                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="User Avatar"
                                            src={user.photoURL || 'https://img.icons8.com/?size=64&id=115318&format=png'}
                                        />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow glass-card w-52">
                                    <li>
                                        <span className="font-semibold">{user.displayName || user.email}</span>
                                    </li>
                                    <li>
                                        <button className="flex items-center gap-2" onClick={handleLogout}><LuLogOut /> Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className='flex gap-2'>
                            <Link to='/login' className="btn-ghost">Login</Link>
                            <Link to='/signup' className="btn-solid">Create account</Link>
                        </div>
                    )}
                    <button className="md:hidden btn-ghost" aria-label="menu">
                        <LuMenu />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;