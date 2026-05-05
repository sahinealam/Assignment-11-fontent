import React, { use } from 'react';
import AdminDashBoard from '../../adminDashBoard/AdminDashBoard';
import { AuthContext } from '../../../provider/AuthProvider';
import DonorDashBoard from '../../donorDashBoard/DonorDashBoard';
import VolunteerDashBoard from '../../volunteerDashBoard/VolunteerDashBoard';

const MainDashBoard = () => {
    const { user, role } = use(AuthContext)
    return (
        <div>
            <div className="max-w-4xl mx-auto p-6">
                {/* Welcome Section */}
                <div className="relative bg-red-50 rounded-2xl shadow-lg overflow-hidden">
                    {/* Background Shape / Illustration */}
                    <div className="absolute -top-16 -right-16 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
                    <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>

                    <div className="relative z-10 p-8 flex flex-col md:flex-row items-center gap-6">
                        {/* Icon / Illustration */}
                        <div className="flex-shrink-0">
                            <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white text-4xl shadow-xl">
                                🩸
                            </div>
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-4xl font-bold text-red-700">
                                Welcome, {user?.displayName} 👋
                            </h2>
                            <p className="mt-2 text-gray-600 text-lg md:text-xl">
                                Here are your recent <span className="font-semibold text-red-600">blood donation requests</span>.
                                Thank you for making a difference!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {
                role === "admin" && (
                    <AdminDashBoard></AdminDashBoard>
                )
            }
            {
                role === "volunteer" && (
                    <VolunteerDashBoard></VolunteerDashBoard>
                )
            }
            {
                role === "donor" && (
                    <DonorDashBoard></DonorDashBoard>
                )
            }
        </div>

    );
};

export default MainDashBoard;