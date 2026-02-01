import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home";
import MealDetails from "../pages/MealDetails";
import Login from "../pages/Login";
import MyProfile from "../pages/MyProfile";
import Meals from "../pages/Meals";
import PriviteRoute from "../provider/PriviteRoute";
import Error from "../components/Error";
import Register from "../pages/Register";




export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/meals',
                element: <Meals></Meals>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Register></Register>
            },
            {
                path: '/meals/:mealId',
                element: <PriviteRoute>
                    <MealDetails></MealDetails>
                </PriviteRoute>
            },
            {
                path: '/myprofile',
                element: <PriviteRoute>
                    <MyProfile></MyProfile>
                </PriviteRoute>
            },
        ]
    },
    {
        path: '/*',
        element: <Error></Error>
    }
])

export default router;