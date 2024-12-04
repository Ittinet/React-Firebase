import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from './Admin/SidebarAdmin'


const LayoutAdmin = () => {
    return (
        <div className='flex h-screen bg-gray-100'>
            <SidebarAdmin />

            <div className='flex flex-1 flex-col'>
                <div className='bg-white p-3'>
                    Header
                </div>
                <main className='flex-1 p-6 overflow-y-auto bg-gray-200'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default LayoutAdmin