import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import Shop from '../Shop'
import Login from '../Login'
import Register from '../../Register'



const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Shop />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes


// import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import Shop from '../Shop'
// import Login from '../Login'
// import Register from '../../Register'


// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <Shop />
//     },
//     {
//         path: '/login',
//         element: <Login />
//     },
//     {
//         path: '/Register',
//         element: <Register />
//     }
// ])


// const AppRoutes = () => {
//     return (
//         <>
//             <RouterProvider router={router} />
//         </>
//     )
// }

// export default AppRoutes