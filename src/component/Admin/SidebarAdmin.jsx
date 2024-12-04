import { LayoutDashboard } from "lucide-react"
import { NavLink } from "react-router-dom"

const SidebarAdmin = () => {
  return (
    <div className="bg-gray-800 w-64 h-screen text-white sticky">

      <div className="bg-gray-900 flex h-24 items-center justify-center">
        <span className="text-2xl font-bold">Admin Panel</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">

        <NavLink to={'/admin'} end className={({ isActive }) =>
          isActive ? 'bg-gray-900 text-white flex items-center px-4 py-2' : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded-md flex items-center'
        }>
          <LayoutDashboard className="mr-2" />
          Dashboard
        </NavLink>

        <NavLink to={'manage'} end className={({ isActive }) =>
          isActive ? 'bg-gray-900 text-white flex items-center px-4 py-2' : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded-md flex items-center'
        }>
          <LayoutDashboard className="mr-2" />
          Manage
        </NavLink>

        <NavLink to={'category'} end className={({ isActive }) =>
          isActive ? 'bg-gray-900 text-white flex items-center px-4 py-2' : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded-md flex items-center'
        }>
          <LayoutDashboard className="mr-2" />
          Category
        </NavLink>
        <NavLink to={'product'} end className={({ isActive }) =>
          isActive ? 'bg-gray-900 text-white flex items-center px-4 py-2' : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded-md flex items-center'
        }>
          <LayoutDashboard className="mr-2" />
          Product
        </NavLink>


      </nav>

    </div>
  )
}

export default SidebarAdmin