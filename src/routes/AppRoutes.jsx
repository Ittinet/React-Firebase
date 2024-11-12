import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Shop from '../Shop'
import Login from '../Login'
import Register from '../../Register'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Shop />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/Register',
        element: <Register />
    }
])


const AppRoutes = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default AppRoutes