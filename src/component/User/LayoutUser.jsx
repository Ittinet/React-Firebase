import { Outlet } from "react-router-dom"
import Navbar from "../Navbar"


const LayoutUser = () => {
    return (
        <div className='relative w-full'>
            <Navbar />
            <main className="flex max-w-[1300px] mx-auto mt-10 p-2">
                <Outlet />
            </main>
        </div>
    )
}

export default LayoutUser