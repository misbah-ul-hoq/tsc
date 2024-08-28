import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import SignupForm from "./pages/SignUp";
import LoginForm from "./pages/Login";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import PrivateRoute from "./pages/PrivateRoute";
import DashboardProfile from "./pages/Dashboard/DashboardProfile";
import CreateSession from "./pages/Dashboard/CreateSession";
import TutorRoute from "./pages/Dashboard/TutorRoute";
import ViewSessions from "./pages/Dashboard/ViewSessions";
import UploadMaterials from "./pages/Dashboard/UploadMaterials";
import ViewMaterials from "./pages/Dashboard/ViewMaterials";
import UpdateMaterial from "./components/Dashboard/UpdateMaterial";
import api from "./axios/api";
import AdminRoute from "./pages/Dashboard/AdminRoute";
import ViewUsers from "./pages/Dashboard/Admin/ViewUser";
import ViewSessionsAdmin from "./pages/Dashboard/Admin/ViewSessionsAdmin";
import ViewAllMaterialsAdmin from "./pages/Dashboard/Admin/ViewAllMaterialsAdmin";
import Study from "./pages/StudySessions";
import SessionDetails from "./pages/SessionDetails";
import ViewBookedSessions from "./pages/Dashboard/Student/ViewBookedSessions";
import StudentRoute from "./pages/Dashboard/StudentRoute";

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
      {
        path: "/study-sessions",
        element: <Study />,
      },
      {
        path: "/study-session/:id",
        element: (
          <PrivateRoute>
            <SessionDetails />
          </PrivateRoute>
        ),
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
      // student routes
      {
        path: "view-booked-session",
        element: (
          <StudentRoute>
            <ViewBookedSessions />
          </StudentRoute>
        ),
      },
      // tutor routes
      {
        path: "create-session",
        element: (
          <TutorRoute>
            <CreateSession />
          </TutorRoute>
        ),
      },
      {
        path: "view-sessions",
        element: (
          <TutorRoute>
            <ViewSessions />
          </TutorRoute>
        ),
      },
      {
        path: "upload-materials",
        element: (
          <TutorRoute>
            <UploadMaterials />
          </TutorRoute>
        ),
      },
      {
        path: "view-materials",
        element: (
          <TutorRoute>
            <ViewMaterials />
          </TutorRoute>
        ),
      },
      {
        path: "update-materials/:id",
        loader: async ({ params }) => {
          return api.get(`/session-materials/${params.id}`);
        },
        element: (
          <TutorRoute>
            <UpdateMaterial />
          </TutorRoute>
        ),
      },

      // admin routes
      {
        path: "view-users",
        element: (
          <AdminRoute>
            <ViewUsers />
          </AdminRoute>
        ),
      },
      {
        path: "view-all-sessions",
        element: (
          <AdminRoute>
            <ViewSessionsAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "view-all-materials",
        element: (
          <AdminRoute>
            <ViewAllMaterialsAdmin />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
