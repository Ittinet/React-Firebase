// import { HashRouter as Router, Route, Routes } from 'react-router-dom'

// import Shop from '../Shop'
// import Login from '../Login'
// import Register from '../../Register'
// import Home from '../Home'



// const AppRoutes = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/" element={<Shop />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//             </Routes>
//         </Router>
//     )
// }

// export default AppRoutes


import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import Home from '../Home'
import Shop from '../Shop'
import Layout from '../component/Layout'
import ProtectAdmin from './ProtectAdmin'
import LayoutAdmin from '../component/LayoutAdmin'
import Dashboard from '../Page/Admin/Dashboard'
import Manage from '../Page/Admin/Manage'
import Category from '../Page/Admin/Category'
import Product from '../Page/Admin/Product'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'shop', element: <Shop /> }
        ]
    },
    {
        path: '/admin',
        element: <ProtectAdmin element={<LayoutAdmin />} />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'manage', element: <Manage /> },
            { path: 'category', element: <Category /> },
            { path: 'product', element: <Product /> },
        ]
    }

], { basename: "/React-Firebase/" })


const AppRoutes = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}
export default AppRoutes