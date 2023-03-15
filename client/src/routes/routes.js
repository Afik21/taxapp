import MainLayout from "../MainLayout";
import PersistLogin from "../hooks/PersistLogin";
import RequireAuth from "../hooks/RequireAuth";
// pages
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Payment from "../pages/pay/Payment";
import ResetPassword from "../pages/login/ResetPassword";
import User from "../pages/users/User";
// Layouts
import Dashboard from "../layouts/dashboard/Dashboard";
import Paiement from "../layouts/paiement/Paiement";
import QrCode from "../layouts/qrcode/QrCode";
import PropBien from "../layouts/prop-bien/PropBien";
import PropBienDetails from "../layouts/prop-bien-details/PropBienDetails";
import Agent from "../layouts/agent/Agent";
import Setting from "../layouts/setting/Setting";
//
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";

const ROLES = {
  admin: "admin",
  controller: "controller",
};

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/payment", element: <Payment /> },
      { path: "/reset_password", element: <ResetPassword /> },
      {
        element: <PersistLogin />,
        children: [
          {
            element: (
              <RequireAuth allowedRoles={[ROLES.admin, ROLES.controller]} />
            ),
            children: [
              {
                path: "/user",
                element: <User />,
                children: [
                  { path: "/user", element: <Dashboard /> },
                  { path: "paiement", element: <Paiement /> },
                  { path: "qrcodes", element: <QrCode /> },
                  { path: "prop-bien", element: <PropBien /> },
                  { path: "prop-biens/:key", element: <PropBienDetails /> },
                  { path: "agent", element: <Agent /> },
                  { path: "settings", element: <Setting /> },
                  // {
                  //   path: "settings",
                  //   element: <Setting />,
                  //   children: [
                  //     // { path: "settings", element: <General /> },
                  //     { index: true, element: <General /> },
                  //     { path: "profil", element: <Profile /> },
                  //     { path: "about", element: <AboutApp /> },
                  //   ],
                  // },
                ],
              },
            ],
          },
        ],
      },
      { path: "*", element: <NotFound /> },
      { path: "/unauthorized", element: <Unauthorized /> },
    ],
  },
];
