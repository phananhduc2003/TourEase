import config from "../config";
import AdminLayout from "../layouts/adminLayout/AdminLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/register/Register";
import ContactPage from "../pages/users/contactPage/ContactPage";
import DestinationPage from "../pages/users/destinationPage/DestinationPage";

import HomePage from "../pages/users/homePage/HomePage";
import IntroductionPage from "../pages/users/introductionPage/IntroductionPage";
import OrderDetailTour from "../pages/users/orderDetailTour/OrderDetailTour";
import TourDetail from "../pages/users/tourDetail/TourDetail";
import TourPage from "../pages/users/tourPage/TourPage";
import InforUser from "../pages/users/profileUser/ProfileUser";
import InforBooking from "../pages/users/inforBooking/InforBooking";
import inforUserLayout from "../layouts/inforUserLayout/InforUserLayout";

import Dashboard from "../pages/admin/dashboard/Dashboard";
import ManageUsers from "../pages/admin/manageUsers/ManageUsers";
import ManageBookings from "../pages/admin/manageBookings/ManageBooking";
import ManageAdmin from "../pages/admin/manageAdmin/ManageAdmin";
import ManageTours from "../pages/admin/manageTours/ManageTours";

const defaultRoutes = [
  { path: config.routes.home, component: HomePage },
  { path: config.routes.tourPage, component: TourPage },
  { path: config.routes.tourDetail, component: TourDetail },
  { path: config.routes.introductionPage, component: IntroductionPage },
  { path: config.routes.destinationPage, component: DestinationPage },
  { path: config.routes.contactPage, component: ContactPage },
  {
    path: config.routes.orderDetailTour,
    component: OrderDetailTour,
    protected: true,
  },

  { path: config.routes.login, component: Login, layout: AuthLayout },
  { path: config.routes.register, component: Register, layout: AuthLayout },

  {
    path: config.routes.profile,
    component: InforUser,
    layout: inforUserLayout,
    protected: true,
  },
  {
    path: config.routes.inforBooking,
    component: InforBooking,
    layout: inforUserLayout,
    protected: true,
  },
];

const adminRoutes = [
  {
    path: config.routes.dashboard,
    component: Dashboard,
    layout: AdminLayout,
  },
  {
    path: config.routes.manageadmin,
    component: ManageAdmin,
    layout: AdminLayout,
  },

  {
    path: config.routes.managetours,
    component: ManageTours,
    layout: AdminLayout,
  },
  {
    path: config.routes.manageusers,
    component: ManageUsers,
    layout: AdminLayout,
  },
  {
    path: config.routes.managebookings,
    component: ManageBookings,
    layout: AdminLayout,
  },
];
export { defaultRoutes, adminRoutes };
