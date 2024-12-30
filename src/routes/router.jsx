import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout/MainLayout";
import Error from "../components/Error/Error";
import Home from "../pages/Home";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";
import AddService from "../pages/AddService";
import Service from "../pages/Service";
import ServiceDetails from "../components/ServiceDetails/ServiceDetails";
import MyReviews from "../pages/MyReviews";
import MyService from "../pages/MyService";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />,
            },{
                path: '/addService',
                element: <AddService/>
            },
            {
                path: '/login',
                element: <SignIn />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: "/service",
                element: <Service/>
            },
            {
                path: "/service/:id",
                element: <ServiceDetails/>
            },
            {
                path: '/myReviews',
                element: <MyReviews/>
            },
            {
                path: '/myServices',
                element: <MyService/>,
            }
        ]
    },

])

export default router;