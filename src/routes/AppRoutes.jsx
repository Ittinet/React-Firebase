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


import Login from '../Login'
import Register from '../../Register'
import Home from '../Home'
import Game from '../Page/Game'
import Shop from '../Shop'
import Navbar from '../component/Navbar'
import Layout from '../component/Layout'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: '/shop', element: <Shop /> }
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