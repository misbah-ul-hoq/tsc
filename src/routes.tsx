import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import SignupForm from "./pages/SignUp";
import LoginForm from "./pages/Login";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import PrivateRoute from "./pages/PrivateRoute";
import DashboardProfile from "./pages/Dashboard/DashboardProfile";
import CreateSession from "./pages/Dashboard/CreateSession";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "", element: <DashboardProfile /> },
      { path: "create-session", element: <CreateSession /> },
    ],
  },
]);

export default router;
