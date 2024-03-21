import { createBrowserRouter } from "react-router-dom";
import Register from "./User/Register";
import Login from "./User/Login";
import Home from "./Medicine/Home";
import CreateMedicine from "./Medicine/AddMedicine";
import ViewMedicine from "./Medicine/ViewMedicine";
import EditMedicine from "./Medicine/EditMedicine";
import Aboutus from "./Medicine/Aboutus";

const router = createBrowserRouter([

    { path: 'Register', element: <Register/> },
    { path: 'Login', element: <Login/> },
    { path: 'Aboutus', element: <Aboutus/> },
    { path: '', element: <Home/> },
    { path: 'Add', element: <CreateMedicine/> },
    { path: ':MedId', element: <ViewMedicine/> },
    { path: ':MedId/Edit', element: <EditMedicine/> },

]);

export default router;