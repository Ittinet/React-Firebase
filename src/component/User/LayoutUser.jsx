import { Outlet } from "react-router-dom"
import Navbar from "../Navbar"


const LayoutUser = () => {
    return (
        <div className='relative'>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default LayoutUser