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
import EditProduct from '../Page/Admin/EditProduct'
import ProtectUser from './ProtectUser'
import LayoutUser from '../component/User/LayoutUser'
import OrderUser from '../component/User/OrderUser'


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
            { path: 'product/:id', element: <EditProduct /> },
        ]
    },
    {
        path: '/user',
        element: <ProtectUser element={<LayoutUser />} />,
        children: [
            { index: true, element: <OrderUser /> }
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