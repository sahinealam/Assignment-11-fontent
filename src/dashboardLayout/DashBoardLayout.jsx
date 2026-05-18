import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../components/aside/Aside';
// DashBoardLayout
const DashBoardLayout = () => {
    // mine add file
    return (
        <div className='flex'>
            <Aside></Aside>
            <div className='flex-1 p-5'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoardLayout;