import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/navbar/Navbar';
import Banner from '../components/banner/Banner';
import Footer from '../components/footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <div className="flex flex-col min-h-screen ">
                <nav className='sticky top-0 z-50 bg-red-200 dark:bg-gray-50 shadow'>
                    <div className='py-4'>
                        <Navbar></Navbar>
                    </div>
                </nav>
                <main className='flex-1'>
                    <Outlet></Outlet>
                </main>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;